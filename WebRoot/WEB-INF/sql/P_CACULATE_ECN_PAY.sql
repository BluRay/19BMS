drop procedure if exists P_CACULATE_ECN_SALLARY;
create procedure P_CACULATE_ECN_SALLARY(in q_factory varchar(100),in q_workshop varchar(100),in q_workgroup varchar(100),in q_team varchar(100),in q_month varchar(10)) 		
BEGIN		
	declare query_condition varchar(500);
	declare query_condition_2 varchar(500);
	declare v_sql varchar(200000);
	declare query_staff_numbers varchar(50000);
	declare limit_cond varchar(50);
	declare query_ecn_task_ids varchar(10000);
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

	set v_sql=concat(' select group_concat(t.staff_number) into @query_staff_numbers from ( select distinct tmp.staff_number from (
	select s.staff_number,s.workshop_org,s.workgroup_org,s.team_org,s.job from BMS_HR_STAFF s where 1=1 and s.salary_type=''计件''', query_condition,' 
	union all 
	select distinct s1.staff_number,s1.workshop_org,s1.workgroup_org,s1.team_org,s1.job from BMS_HR_STAFF_HOURS h 
	left join BMS_HR_STAFF s1 on h.staff_id =s1.id where h.status in (''1'',''3'') and  h.work_date like concat(''',q_month,''',''%'')',
	query_condition_2 ,' order by workshop_org,workgroup_org,team_org,job',') tmp ',limit_cond,' )t');
	
	set @vsql=v_sql;
	prepare  stmt from @vsql;
     	EXECUTE stmt; 	
    	deallocate prepare stmt;
	#select @vsql;

	set query_staff_numbers=@query_staff_numbers ;
	
	select group_concat(distinct h1.ecn_task_id separator ''',''') into query_ecn_task_ids
	from BMS_HR_STAFF_HOURS h1 left join BMS_HR_STAFF s on h1.staff_id=s.id 
	where find_in_set(s.staff_number,query_staff_numbers)>0 and h1.hour_type='3' and substr(h1.work_date,1,7)=q_month;

	DROP TEMPORARY TABLE IF EXISTS staff_hours_count;
	if query_ecn_task_ids is  null then
		set query_ecn_task_ids='''''';		
	end if;

	#select query_bus_numbers;
	#select query_org_ids;

    set v_sql=concat('create TEMPORARY  TABLE staff_hours_count select h1.* from BMS_HR_STAFF_HOURS h1 left join BMS_HR_STAFF s on h1.staff_id=s.id 
		where h1.ecn_task_id in (''',query_ecn_task_ids,''')  and h1.factory=''',q_factory,''' and h1.workshop=''',q_workshop,'''  and h1.hour_type=''3'' and substr(h1.work_date,1,7)=''',q_month,''' and h1.status in (''1'',''3'') ');
	set @vsql=v_sql;
	#select @vsql;
	prepare  stmt from @vsql;
    EXECUTE stmt; 	
   	deallocate prepare stmt;
	#select * from staff_hours_count;

	drop TEMPORARY TABLE IF EXISTS ECN_HOUR_TOTAL;
	create TEMPORARY TABLE ECN_HOUR_TOTAL as
	select t.id,t.task_number,t.task_content,sum(ifnull(h.work_hour,0)) total_real_hour,substr(h.work_date,1,7) work_month
	from staff_hours_count h
	#left join BMS_HR_STAFF_UPDATE_RECORD r on h.staff_id=r.staff_id  and r.type='skill_parameter' and substr(r.edit_date,1,7)<=substr(h.work_date,1,7)
	#and r.edit_date=(select max(r1.edit_date) from BMS_HR_STAFF_UPDATE_RECORD r1 where h.staff_id=r1.staff_id  and r1.type='skill_parameter' and substr(r1.edit_date,1,7)<=substr(h.work_date,1,7))
	join BMS_ECN_TASK t on h.ecn_task_id=t.id
	where h.hour_type='3' and h.status in('1','3') and h.work_hour>0
	group by t.id,h.workshop,substr(h.work_date,1,7);

	drop TEMPORARY TABLE IF EXISTS ECN_BUS_TOTAL;
	create TEMPORARY TABLE  ECN_BUS_TOTAL as
	select count(distinct td.bus_number) ecn_bus_total ,t.id,t.task_number,t.task_content,substr(td.confirmor_date,1,7) work_month,td.workshop
	from BMS_ECN_TASK_DETAIL td
	left join BMS_BASE_FACTORY f on td.factory_id=f.id 
	join BMS_ECN_TASK t on td.ecn_task_id=t.id
	where td.status='1' and f.factory_name=q_factory
	group by t.id,td.workshop,substr(td.confirmor_date,1,7);

	
	#删除计件工资计算表中对应工厂车间月份下的记录
	delete from BMS_ECN_PAY_CAL  where factory=q_factory and workshop=q_workshop and work_date like concat(q_month,'%');	
	#向计件工资计算表中插入工资记录	
	insert into BMS_ECN_PAY_CAL 
	select NULL,s.staff_number,s.name staff_name,s.job,s.plant_org,s.workshop_org,s.workgroup_org,s.team_org,r.new_value skill_parameter,p.price,
		case when tmp.total_real_hour<(tmp2.ecn_bus_total*t1.unit_time)*0.8 then  round((h.work_hour/(tmp.total_real_hour))*(tmp.total_real_hour*1.2),4) 
		else  round((h.work_hour/tmp.total_real_hour)*tmp2.ecn_bus_total*t1.unit_time,4) end as work_hour,
		h.work_hour real_work_hour,
		h.work_date,t.task_number,t.id task_id,t1.unit_time*tmp2.ecn_bus_total total_hours,t.task_content,d.id document_id,d.ecn_document_number,t.ecn_number,h.factory,h.dept,h.workshop,h.workgroup,h.team
	from staff_hours_count h
	left join BMS_HR_STAFF s on s.id=h.staff_id 
	left join BMS_HR_STAFF_UPDATE_RECORD r on h.staff_id=r.staff_id and r.type='skill_parameter' and substr(r.edit_date,1,7)<=substr(h.work_date,1,7)
		and r.edit_date=(select max(r1.edit_date) from BMS_HR_STAFF_UPDATE_RECORD r1 where h.staff_id=r1.staff_id and r1.type='skill_parameter' and substr(r1.edit_date,1,7)<=substr(h.work_date,1,7))
	left join BMS_ECN_TASK t on h.ecn_task_id=t.id
	left join BMS_ECN_TIME t1 on t.id=t1.ecn_task_id 
	and t1.workshop_id=(select k.id from BMS_BASE_KEY k 
		WHERE k.key_name=q_workshop and k.key_type='车间')
	left join BMS_ECN_DOCUMENT d on t.ecn_id=d.id
	left join BMS_HR_BASE_PRICE p on  p.factory=h.factory and p.type='3' and h.work_date>=p.start_date and h.work_date<=p.end_date
		and p.edit_date=(select max(p1.edit_date) from BMS_HR_BASE_PRICE p1 where p1.factory=p.factory and p1.type=p.type and h.work_date>=p1.start_date and h.work_date<=p1.end_date)
	left join ECN_HOUR_TOTAL tmp on tmp.id=t.id and substr(h.work_date,1,7)=tmp.work_month
	left join ECN_BUS_TOTAL tmp2 on t.id=tmp2.id and substr(h.work_date,1,7)=tmp2.work_month and tmp2.workshop=h.workshop
	where h.hour_type='3' and h.status in('1','3') and h.work_hour>0 and h.factory=q_factory and h.workshop=q_workshop;
	
	set cal_status=1;
	select cal_status;
END;