drop procedure if exists P_CACULATE_WAIT_SALLARY;
create procedure P_CACULATE_WAIT_SALLARY(in q_factory varchar(100),in q_workshop varchar(100),in q_workgroup varchar(100),in q_team varchar(100),in q_month varchar(10)) 		
BEGIN		
	declare query_condition varchar(500);
	declare query_condition_2 varchar(500);
	declare v_sql varchar(200000);
	declare query_staff_numbers varchar(50000);
	declare limit_cond varchar(50);
	declare query_bus_numbers varchar(50000);
	declare query_org_ids varchar(10000);
	declare cal_status varchar(1);

	SET SESSION  group_concat_max_len = 200000; 
	SET SESSION max_heap_table_size=128*1024*1024;

	set query_condition=concat('and ((s.status=''离职'' and date(s.leave_date)>=date(''',q_month,'-01'')) or s.status=''在职'')');
	set query_condition_2=concat('and ((s1.status=''离职'' and date(s1.leave_date)>=date(''',q_month,'-01'')) or s1.status=''在职'')');
	set limit_cond='';

	if q_factory !='' and q_factory is not null then
	set query_condition=concat(query_condition,' and s.plant_org=''',q_factory,'''');
	set query_condition_2=concat(query_condition_2,' and h.factory=''',q_factory,'''');
	end if;
	if q_workshop !='' and q_workshop is not null  then
	set query_condition=concat(query_condition,' and find_in_set(s.workshop_org,''',q_workshop,''')>0');
	set query_condition_2=concat(query_condition_2,' and find_in_set(h.workshop,''',q_workshop,''')>0');
	end if;
	if q_workgroup !='' and q_workgroup is not null then
	set query_condition=concat(query_condition,' and s.workgroup_org=''',q_workgroup,'''');
	set query_condition_2=concat(query_condition_2,' and h.workgroup=''',q_workgroup,'''');
	end if;
	if q_team !='' and q_team is not null then
	set query_condition=concat(query_condition,' and s.team_org=''',q_team,'''');
	set query_condition_2=concat(query_condition_2,' and h.team=''',q_team,'''');
	end if;

	set v_sql=concat(' select group_concat(t.staff_number separator ''',''''',''''', ''') into @query_staff_numbers from ( select distinct tmp.staff_number from (
	select s.staff_number,s.workshop_org,s.workgroup_org,s.team_org,s.job from BMS_HR_STAFF s where 1=1 and s.salary_type=''计件''', query_condition,' 
	union all 
	select distinct s1.staff_number,s1.workshop_org,s1.workgroup_org,s1.team_org,s1.job from BMS_HR_STAFF_HOURS h 
	left join BMS_HR_STAFF s1 on h.staff_id =s1.id where h.status in (''1'',''3'') and  h.work_date like concat(''',q_month,''',''%'')',
	query_condition_2 ,' order by workshop_org,workgroup_org,team_org,job',') tmp ',limit_cond,' )t');
	
	set @vsql=v_sql;
	prepare  stmt from @vsql;
     	EXECUTE stmt; 	
    	deallocate prepare stmt;
	

	set query_staff_numbers=@query_staff_numbers ;
	#select query_staff_numbers;

	DROP TEMPORARY TABLE IF EXISTS staff_hours_count;
    	set v_sql=concat('create TEMPORARY  TABLE staff_hours_count select h1.* from BMS_HR_STAFF_HOURS h1 left join BMS_HR_STAFF s on h1.staff_id=s.id 
		where s.staff_number in (''',query_staff_numbers,''') and h1.hour_type=''4'' and substr(h1.work_date,1,7)=''',q_month,''' and h1.status in (''1'',''3'') ');
	set @vsql=v_sql;
	#select @vsql;
	prepare  stmt from @vsql;
    	EXECUTE stmt; 	
   	deallocate prepare stmt;
	#select * from staff_hours_count;

	#按照work_date，org_id 分类汇总等待工时信息
	drop TEMPORARY TABLE IF EXISTS WAIT_HOUR_SUM;
	create TEMPORARY TABLE WAIT_HOUR_SUM ENGINE = MEMORY as
	select sum(ifnull(h.work_hour*h.distribution,0)) total_real_hour,h.org_id,h.work_date,sum(ifnull(h.work_hour,0)) total_work_hour
	from staff_hours_count h
	where h.hour_type='4' and h.status in('1','3') and h.distribution>0
	group by h.work_date,h.org_id ;

	#select * from WAIT_HOUR_SUM;
	#删除计件工资计算表中对应工厂车间月份下的记录
	delete from BMS_WAIT_PAY_CAL  where factory=q_factory and workshop=q_workshop and work_date like concat(q_month,'%');	
	#向计件工资计算表中插入工资记录	
	insert into BMS_WAIT_PAY_CAL 
	select NULL,s.staff_number,s.name staff_name,s.job,s.plant_org,s.workshop_org,s.workgroup_org,s.team_org,h.distribution,r.new_value skill_parameter,p.price,h.work_hour,
	ifnull(h.distribution*h.work_hour*p.price*whs.total_work_hour/whs.total_real_hour,0) wpay, h.work_date,h.wait_reason,h.detailed_reasons,h.whereabouts,h.factory,h.dept,h.workshop,h.workgroup,h.team
	from  staff_hours_count h
	left join BMS_HR_STAFF s on s.id=h.staff_id 
	left join WAIT_HOUR_SUM whs on whs.org_id=h.org_id and whs.work_date=h.work_date
	left join BMS_HR_STAFF_UPDATE_RECORD r on h.staff_id=r.staff_id  and r.type='skill_parameter' and substr(r.edit_date,1,7)<=substr(h.work_date,1,7)
		and r.edit_date=(select max(r1.edit_date) from BMS_HR_STAFF_UPDATE_RECORD r1 where h.staff_id=r1.staff_id  and r1.type='skill_parameter' and substr(r1.edit_date,1,7)<=substr(h.work_date,1,7))
	left join BMS_HR_BASE_PRICE p on  p.factory=h.factory and p.type='4' and h.work_date>=p.start_date and h.work_date<=p.end_date
		and p.edit_date=(select max(p1.edit_date) from BMS_HR_BASE_PRICE p1 where  p1.factory=p.factory and p1.type=p.type and h.work_date>=p1.start_date and h.work_date<=p1.end_date) 
	where  h.hour_type='4' and h.status in('1','3') and h.work_hour>0 and h.factory=q_factory and h.workshop=q_workshop;
	
	set cal_status=1;
	select cal_status;
END;
			
