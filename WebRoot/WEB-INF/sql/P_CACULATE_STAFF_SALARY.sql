drop procedure if exists P_CACULATE_SALLARY;
create procedure P_CACULATE_SALLARY(in factory varchar(100),in workshop varchar(100),in workgroup varchar(100),in team varchar(100),in q_month varchar(10),in staff_number varchar(20),in offset varchar(6),in page_size varchar(3) ) 		
BEGIN		
	declare query_condition varchar(200);
	declare query_condition_2 varchar(200);
	declare v_sql varchar(10000);
	declare query_staff_numbers varchar(10000);
	declare limit_cond varchar(50);
	declare query_bus_numbers varchar(20000);
	declare query_org_ids varchar(1000);
	declare workshop_piece_count varchar(5);

	SET SESSION  group_concat_max_len = 20000; 
	SET SESSION max_heap_table_size=128*1024*1024;

	set query_condition=concat('and ((s.status=''离职'' and s.leave_date>=''',q_month,''') or s.status=''在职'')');
	set query_condition_2=concat('and ((s1.status=''离职'' and s1.leave_date>=''',q_month,''') or s1.status=''在职'')');
	set limit_cond='';

	if factory !='' and factory is not null then
	set query_condition=concat(query_condition,' and s.plant_org=''',factory,'''');
	set query_condition_2=concat(query_condition_2,' and h.factory=''',factory,'''');
	end if;
	if workshop !='' and workshop is not null  then
	set query_condition=concat(query_condition,' and find_in_set(s.workshop_org,''',workshop,''')>0');
	set query_condition_2=concat(query_condition_2,' and find_in_set(h.workshop,''',workshop,''')>0');
	end if;
	if workgroup !='' and workgroup is not null then
	set query_condition=concat(query_condition,' and s.workgroup_org=''',workgroup,'''');
	set query_condition_2=concat(query_condition_2,' and h.workgroup=''',workgroup,'''');
	end if;
	if team !='' and team is not null then
	set query_condition=concat(query_condition,' and s.team_org=''',team,'''');
	set query_condition_2=concat(query_condition_2,' and h.team=''',team,'''');
	end if;
	if staff_number !='' and staff_number is not null then
	set query_condition=concat(query_condition,' and (s.staff_number=''',staff_number,''' or s.name=''',staff_number,''')');
	set query_condition_2=concat(query_condition_2,' and (s1.staff_number=''',staff_number,''' or s1.name=''',staff_number,''')');
	end if;
	if offset !='' and offset is not null then
	set limit_cond=concat(' limit ',offset,',',page_size);
	end if;

	set v_sql=concat(' select group_concat(t.staff_number separator ''',''''',''''',''') into @query_staff_numbers from ( select distinct tmp.staff_number from (
	select s.staff_number,s.workshop_org,s.workgroup_org,s.team_org,s.job from BMS_HR_STAFF s where 1=1 and s.salary_type=''计件''', query_condition,' 
	union all 
	select distinct s1.staff_number,s1.workshop_org,s1.workgroup_org,s1.team_org,s1.job from BMS_HR_STAFF_HOURS h 
	left join BMS_HR_STAFF s1 on h.staff_id =s1.id where h.status in (''1'',''3'') and  h.work_date like concat(''',q_month,''',''%'')',
	query_condition_2 ,' order by workshop_org,workgroup_org,team_org,job',') tmp ',limit_cond,' )t');
	
	set @vsql=v_sql;
	#select @vsql;
	prepare  stmt from @vsql;
     	EXECUTE stmt; 	
    	deallocate prepare stmt;
	
	if @query_staff_numbers is null 
	then set query_staff_numbers='';
	else
	set query_staff_numbers=@query_staff_numbers ;
	end if;
	#select query_staff_numbers;

	drop TEMPORARY TABLE IF EXISTS tmp_staff_cal;
	set v_sql=concat(' create TEMPORARY TABLE tmp_staff_cal ENGINE = MEMORY as
		select s.id staff_id,s.staff_number,s.name staff_name,r.new_value skill_parameter,s.job,s.plant_org,s.dept_org,s.workshop_org,s.workgroup_org,s.team_org,s.status
		from BMS_HR_STAFF s 
		left join BMS_HR_STAFF_UPDATE_RECORD r on s.id=r.staff_id and substring(r.edit_date,1,7)<=''',q_month,''' and r.type=''skill_parameter''
		and r.edit_date=(select max(r1.edit_date) from BMS_HR_STAFF_UPDATE_RECORD r1 where s.id=r1.staff_id and
		substring(r1.edit_date,1,7)<=''',q_month,''' and r1.type=''skill_parameter'') where s.staff_number in (''',query_staff_numbers,''')');
	set @vsql=v_sql;
	#select @vsql;
	prepare  stmt from @vsql;
     	EXECUTE stmt; 	
    	deallocate prepare stmt;

	drop TEMPORARY TABLE IF EXISTS tmp_piece_total;
	set v_sql=concat('create TEMPORARY TABLE tmp_piece_total ENGINE = MEMORY as
		select vp.staff_number,sum(vp.bonus) bonus_total,sum(vp.bus_count) piece_total,round(ifnull(sum(vp.ppay_total),0),2) piece_pay_total 
		from (select vp1.staff_number,vp1.bus_count,vp1.bonus,sum(vp1.ppay) ppay_total  from BMS_PIECE_PAY_CAL vp1
		where 1=1 and vp1.staff_number in (''',query_staff_numbers,''') and vp1.factory=''',factory,''' and find_in_set(vp1.workshop,''',workshop,''')>0
		and substr(vp1.work_date,1,7)=''',q_month,'''
		group by vp1.staff_number,vp1.bus_number) vp 
		group by vp.staff_number') ;
	set @vsql=v_sql;
	prepare  stmt from @vsql;
     	EXECUTE stmt; 	
    	deallocate prepare stmt;

	drop TEMPORARY TABLE IF EXISTS tmp_ecn_total;
	set v_sql=concat('create TEMPORARY TABLE tmp_ecn_total ENGINE = MEMORY as
		select ve.staff_number,substr(ve.work_date,1,7) month,sum(ve.work_hour) ecnwh_total,sum(ve.work_hour*ve.price) ecn_pay_total
		from BMS_ECN_PAY_CAL ve
		where 1=1 and substr(ve.work_date,1,7)=''',q_month,''' and ve.staff_number in (''',query_staff_numbers,''')
		and ve.factory=''',factory,''' and find_in_set(ve.workshop,''',workshop,''')>0 group by ve.staff_number,substr(ve.work_date,1,7)');
	set @vsql=v_sql;
	prepare  stmt from @vsql;
     	EXECUTE stmt; 	
    	deallocate prepare stmt;

	drop TEMPORARY TABLE IF EXISTS tmp_wait_total;
	set v_sql=concat('create TEMPORARY TABLE tmp_wait_total ENGINE = MEMORY as 
		select vw.staff_number,substr(vw.work_date,1,7) month,sum(vw.work_hour) wwh_total,round(ifnull(sum(vw.wpay),0),2) wait_pay_total
		from BMS_WAIT_PAY_CAL vw
		where 1=1 and substr(vw.work_date,1,7)=''',q_month,''' and vw.staff_number in (''',query_staff_numbers,''')
		and vw.factory=''',factory,''' and find_in_set(vw.workshop,''',workshop,''')>0
		group by vw.staff_number,substr(vw.work_date,1,7)');
	set @vsql=v_sql;
	prepare  stmt from @vsql;
     	EXECUTE stmt; 	
    	deallocate prepare stmt;

	drop TEMPORARY TABLE IF EXISTS tmp_tmp_total;
	set v_sql=concat('create TEMPORARY TABLE tmp_tmp_total ENGINE = MEMORY as 
		select vt.staff_number,substr(vt.work_date,1,7) month,sum(vt.work_hour) tmpwh_total,sum(vt.work_hour*vt.price) tmp_pay_total
		from BMS_TMP_PAY_CAL vt
		where 1=1 and substr(vt.work_date,1,7)=''',q_month,''' and vt.staff_number in(''',query_staff_numbers,''')
		and vt.factory=''',factory,''' and find_in_set(vt.workshop,''',workshop,''')>0
		group by vt.staff_number,substr(vt.work_date,1,7)') ;
	set @vsql=v_sql;
	prepare  stmt from @vsql;
     	EXECUTE stmt; 	
    	deallocate prepare stmt;

	drop TEMPORARY TABLE IF EXISTS tmp_deduct_total;
	set v_sql=concat('create TEMPORARY TABLE tmp_deduct_total ENGINE = MEMORY as 
		select s.staff_number,substr(r.rewards_date,1,7) month,
		(sum(ifnull(r.add,0))-sum(ifnull(r.deduct,0))) dscore_total,(sum(ifnull(r.add,0))-sum(ifnull(r.deduct,0)))*p.price deduct_pay_total
		from BMS_HR_REWARDS r 
		left join BMS_HR_STAFF s on s.staff_number=r.staff_number
		left join BMS_HR_BASE_PRICE p on  p.type=''1'' and r.rewards_date>=p.start_date and r.rewards_date<=p.end_date
		and p.edit_date=(select max(p1.edit_date) from BMS_HR_BASE_PRICE p1 where  p1.type=p.type ) 
		where 1=1 and substr(r.rewards_date,1,7)=''',q_month,''' and s.staff_number in(''',query_staff_numbers,''')
		and r.rewards_factory=''',factory,''' and find_in_set(r.rewards_workshop,''',workshop,''')>0
		group by s.staff_number,substr(r.rewards_date,1,7)');
	set @vsql=v_sql;
	prepare  stmt from @vsql;
     	EXECUTE stmt; 	
    	deallocate prepare stmt;
    	
    	#查询车间产量
    	if workshop='自制件' then
    		select sum(s.quantity) into workshop_piece_count 
    		from BMS_PD_WORKSHOP_SUPPLY s 
    		left join BMS_BASE_FACTORY fa on s.factory_id=fa.id
    		where s.supply_workshop='自制件' and s.receive_workshop='部件' 
    		and fa.factory_name=factory and s.supply_date like concat(q_month,'%');
    	end if;
    	if workshop='部件' then
    		select sum(f.offline_real_qty) into workshop_piece_count
			from BMS_PD_PARTS_PLAN_FINISH f
			left join BMS_BASE_PARTS p1 on p1.id=f.parts_id 
			left join BMS_BASE_FACTORY fa on f.factory_id=fa.id
			where fa.factory_name=factory and f.date like concat(replace(q_month,'-',''),'%') 
			and p1.parts_name='喷砂' and p1.workshop_name='部件';
    	end if;
    	if workshop='焊装' then
    		select count(b.id) into workshop_piece_count
			from BMS_PLAN_BUS b
			left join BMS_BASE_FACTORY fa on b.factory_id=fa.id
			where fa.factory_name=factory and b.welding_offline_date like concat(q_month,'%');
    	end if;
    	if workshop='玻璃钢' then
    		select count(b.id) into workshop_piece_count
			from BMS_PLAN_BUS b
			left join BMS_BASE_FACTORY fa on b.factory_id=fa.id
			where fa.factory_name=factory and b.fiberglass_offline_date like concat(q_month,'%');
    	end if;
    	if workshop='涂装' then
    		select count(b.id) into workshop_piece_count
			from BMS_PLAN_BUS b
			left join BMS_BASE_FACTORY fa on b.factory_id=fa.id
			where fa.factory_name=factory and b.painting_offline_date like concat(q_month,'%');
    	end if;
    	if workshop='底盘' then
    		select count(b.id) into workshop_piece_count
			from BMS_PLAN_BUS b
			left join BMS_BASE_FACTORY fa on b.factory_id=fa.id
			where fa.factory_name=factory and b.chassis_offline_date like concat(q_month,'%');
    	end if;
    	if workshop='总装' then
    		select count(b.id) into workshop_piece_count
			from BMS_PLAN_BUS b
			left join BMS_BASE_FACTORY fa on b.factory_id=fa.id
			where fa.factory_name=factory and b.assembly_offline_date like concat(q_month,'%');
    	end if;
    	

	select tmp.staff_id,tmp.staff_number,tmp.staff_name,tmp.skill_parameter,tmp.job,tmp.plant_org,tmp.dept_org,tmp.workshop_org,tmp.workgroup_org,tmp.team_org,tmp.status,q_month month,a.attendance_days,a.attendance_hours,
		ifnull(tmp1.piece_total,0) piece_total,ifnull(tmp1.bonus_total,0) bonus_total,round(ifnull(tmp1.piece_pay_total,0),2) piece_pay_total,round(ifnull(tmp2.ecnwh_total,0),2) ecnwh_total,
		round(ifnull(tmp2.ecn_pay_total,0),2) ecn_pay_total,round(ifnull(tmp3.wwh_total,0),2) wwh_total,round(ifnull(tmp3.wait_pay_total,0),2) wait_pay_total,
		ifnull(tmp4.dscore_total,0) dscore_total,round(ifnull(tmp4.deduct_pay_total,0),2) deduct_pay_total,round(ifnull(tmp5.tmpwh_total,0),2) tmpwh_total,round(ifnull(tmp5.tmp_pay_total,0),2) tmp_pay_total, workshop_piece_count as production_qty
		from tmp_staff_cal tmp
		left join BMS_HR_STAFF_ATTENDANCE a on a.staff_number=tmp.staff_number and a.month=q_month
		left join tmp_piece_total tmp1 on tmp1.staff_number=tmp.staff_number
		left join tmp_ecn_total tmp2 on tmp.staff_number=tmp2.staff_number
		left join tmp_wait_total tmp3 on tmp.staff_number=tmp3.staff_number
		left join tmp_deduct_total tmp4 on tmp.staff_number=tmp4.staff_number
		left join tmp_tmp_total tmp5 on tmp.staff_number=tmp5.staff_number
		order by tmp.workshop_org,tmp.workgroup_org,tmp.team_org,tmp.job;

END;
