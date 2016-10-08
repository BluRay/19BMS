drop procedure if exists P_CACULATE_PIECE_SALLARY_V2;
create procedure P_CACULATE_PIECE_SALLARY_V2(in q_factory varchar(100),in q_workshop varchar(100),in q_workgroup varchar(100),in q_team varchar(100),in q_bus_number varchar(5000),in q_start_date varchar(10), in q_end_date varchar(10)) 		
BEGIN		
	declare v_sql varchar(20000);
	declare cal_status varchar(1);

	SET SESSION  group_concat_max_len = 200000; 
	SET SESSION max_heap_table_size=128*1024*1024;
	
	DROP TEMPORARY TABLE IF EXISTS staff_hours_count;

    set v_sql='create TEMPORARY  TABLE staff_hours_count select h1.* from BMS_HR_STAFF_HOURS h1 where h1.hour_type=''1'' and h1.status = ''1''';
	if q_bus_number !='' and q_bus_number is not null then
		set v_sql=concat(v_sql,' and FIND_IN_SET(h1.bus_number,''',q_bus_number,''')>0');
	end if;
	if q_factory !='' and q_factory is not null then
		set v_sql=concat(v_sql,' and h1.factory=''',q_factory,'''');
	end if;
	if q_workshop !='' and q_workshop is not null then
		set v_sql=concat(v_sql,' and h1.workshop=''',q_workshop,'''');
	end if;
	if q_workgroup !='' and q_workgroup is not null then
		set v_sql=concat(v_sql,' and h1.workgroup=''',q_workgroup,'''');
	end if;
	if q_team !='' and q_team is not null then
		set v_sql=concat(v_sql,' and h1.team=''',q_team,'''');
	end if;
	if q_start_date !='' and q_start_date is not null then
		set v_sql=concat(v_sql,' and h1.work_date>=''',q_start_date,'''');
	end if;
	if q_end_date !='' and q_end_date is not null then
		set v_sql=concat(v_sql,' and h1.work_date<=''',q_end_date,'''');
	end if;
    
    set @vsql=v_sql;
	#select @vsql;
	prepare  stmt from @vsql;
    EXECUTE stmt; 	
   	deallocate prepare stmt;
	#select * from staff_hours_count;

	set cal_status=1;
	select cal_status;

	drop TEMPORARY TABLE IF EXISTS PIECE_PARTICIPATION_SUM;
	create TEMPORARY TABLE PIECE_PARTICIPATION_SUM ENGINE = MEMORY as
	select h.bus_number,sum(ifnull(h.distribution*h.participation,0)) total_real_hour,h.org_id,sum(h.distribution*h.participation) total_bonus_hour
	from staff_hours_count h
	where h.hour_type='1' and h.status ='1' 
	group by h.bus_number,h.org_id ;

	#删除计件工资计算表中对应工厂车间月份下的记录
	set v_sql=concat('delete from BMS_PIECE_PAY_CAL  where  factory=''',q_factory,''' and workshop=''',q_workshop,'''' );	
	if q_workgroup !='' and q_workgroup is not null then
		set v_sql=concat(v_sql,' and workgroup=''',q_workgroup,'''');
	end if;
	if q_team !='' and q_team is not null then
		set v_sql=concat(v_sql,' and team=''',q_team,'''');
	end if;
	if q_start_date !='' and q_start_date is not null then
		set v_sql=concat(v_sql,' and work_date>=''',q_start_date,'''');
	end if;
	if q_end_date !='' and q_end_date is not null then
		set v_sql=concat(v_sql,' and work_date<=''',q_end_date,'''');
	end if;
	if q_bus_number !='' and q_bus_number is not null then
		set v_sql=concat(v_sql,' and FIND_IN_SET(bus_number,''',q_bus_number,''')>0');
	end if;
	set @vsql=v_sql;
	select @vsql;
	prepare  stmt from @vsql;
    EXECUTE stmt; 	
   	deallocate prepare stmt;
   	
	#向计件工资计算表中插入工资记录	
	insert into BMS_PIECE_PAY_CAL 
	select null,s.staff_number,s.name staff_name,s.job,s.plant_org,s.workshop_org,s.workgroup_org,s.team_org,h.distribution,'' skill_parameter,ifnull(h.standard_price,0) standard_price,ifnull(h.participation,0) participation,h.work_date,
	round(ifnull(h.distribution*h.standard_price*( ifnull(h.bus_count,1))*h.participation/tmp.total_real_hour,0)+ifnull(h.distribution*h.standard_price*ifnull(h.bonus,0)*h.participation/tmp.total_bonus_hour,0),2) ppay,
	h.bus_number,h.factory,h.dept,h.workshop,h.workgroup,h.team,ifnull(h.bus_count,1) bus_count,ifnull(h.bonus,0) bonus,'1',h.editor_id,h.edit_date
	from staff_hours_count h
	left join BMS_HR_STAFF s on h.staff_id=s.id 
	#left join BMS_HR_STAFF_UPDATE_RECORD r on h.staff_id=r.staff_id  and r.type='skill_parameter' and substr(r.edit_date,1,7)<=substr(h.work_date,1,7)
	#and r.edit_date=(select max(r1.edit_date) from BMS_HR_STAFF_UPDATE_RECORD r1 where h.staff_id=r1.staff_id  and r1.type='skill_parameter' and substr(r1.edit_date,1,7)<=substr(h.work_date,1,7))
	#left join BMS_HR_BASE_STANDARD_HOUR_PRICE p on p.factory=h.factory and p.workshop=h.workshop and p.workgroup=h.workgroup and p.small_workgroup=h.team 
	#and p.bus_type=substring_index(h.bus_number,'-',1) and locate(p.month,h.work_date)>0
	left join PIECE_PARTICIPATION_SUM tmp on tmp.bus_number=h.bus_number and tmp.org_id=h.org_id 
	where h.hour_type='1' and h.status in('1','3')  and h.participation>0;
	
END;
