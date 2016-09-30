drop view V_PIECE_PARTICIPATION_SUM;
create view V_PIECE_PARTICIPATION_SUM as
select h.bus_number,sum(ifnull(r.new_value*h.participation,0)) total_real_hour,h.org_id
from BMS_HR_STAFF_HOURS h
left join BMS_HR_STAFF_UPDATE_RECORD r on h.staff_id=r.staff_id and r.type='skill_parameter' and substr(r.edit_date,1,7)<=substr(h.work_date,1,7)
and r.edit_date=(select max(r1.edit_date) from BMS_HR_STAFF_UPDATE_RECORD r1 where h.staff_id=r1.staff_id  and r1.type='skill_parameter' and substr(r1.edit_date,1,7)<=substr(h.work_date,1,7))
where h.hour_type='1' and h.status in('1','3') and h.participation>0
group by h.bus_number,h.org_id;

drop  view V_PIECE_PAY;
create view V_PIECE_PAY as 
select s.staff_number,s.name staff_name,s.job,s.plant_org,s.workshop_org,s.workgroup_org,s.team_org,r.new_value skill_parameter,ifnull(p.standard_price,0) standard_price,ifnull(h.participation,0) participation,h.work_date,
ifnull(r.new_value*p.standard_price*(ifnull(h.bonus,0)+ ifnull(h.bus_count,1))*h.participation/tmp.total_real_hour,0) ppay,h.bus_number,h.factory,h.dept,h.workshop,h.workgroup,h.team,ifnull(h.bus_count,1) bus_count,ifnull(h.bonus,0) bonus
from BMS_HR_STAFF_HOURS h
left join BMS_HR_STAFF s on h.staff_id=s.id 
left join BMS_HR_STAFF_UPDATE_RECORD r on h.staff_id=r.staff_id  and r.type='skill_parameter' and substr(r.edit_date,1,7)<=substr(h.work_date,1,7)
and r.edit_date=(select max(r1.edit_date) from BMS_HR_STAFF_UPDATE_RECORD r1 where h.staff_id=r1.staff_id  and r1.type='skill_parameter' and substr(r1.edit_date,1,7)<=substr(h.work_date,1,7))
left join BMS_HR_BASE_STANDARD_HOUR_PRICE p on p.factory=h.factory and p.workshop=h.workshop and p.workgroup=h.workgroup and p.small_workgroup=h.team 
and p.bus_type=substring_index(h.bus_number,'-',1) and locate(p.month,h.work_date)>0
left join V_PIECE_PARTICIPATION_SUM tmp on tmp.bus_number=h.bus_number and tmp.org_id=h.org_id 
where h.hour_type='1' and h.status in('1','3')  and h.participation>0
order by s.id;


drop view V_ECN_HOUR_TOTAL;
create view V_ECN_HOUR_TOTAL as
select t.id,t.task_number,t.task_content,sum(ifnull(r.new_value*h.work_hour,0)) total_real_hour,substr(h.work_date,1,7) work_month
from BMS_HR_STAFF_HOURS h
left join BMS_HR_STAFF_UPDATE_RECORD r on h.staff_id=r.staff_id  and r.type='skill_parameter' and substr(r.edit_date,1,7)<=substr(h.work_date,1,7)
and r.edit_date=(select max(r1.edit_date) from BMS_HR_STAFF_UPDATE_RECORD r1 where h.staff_id=r1.staff_id  and r1.type='skill_parameter' and substr(r1.edit_date,1,7)<=substr(h.work_date,1,7))
join BMS_ECN_TASK t on h.ecn_task_id=t.id
where h.hour_type='3' and h.status in('1','3') and h.work_hour>0
group by t.id,substr(h.work_date,1,7);

drop view V_ECN_BUS_TOTAL;
create view  V_ECN_BUS_TOTAL as
select count(distinct td.bus_number) ecn_bus_total ,t.id,t.task_number,t.task_content,substr(td.confirmor_date,1,7) work_month
from BMS_ECN_TASK_DETAIL td
join BMS_ECN_TASK t on td.ecn_task_id=t.id
where td.status='1'
group by t.id,substr(td.confirmor_date,1,7);

drop  view V_ECN_PAY;
create view V_ECN_PAY as
select s.staff_number,s.name staff_name,s.job,s.plant_org,s.workshop_org,s.workgroup_org,s.team_org,p.price,(h.work_hour*r.new_value/tmp.total_real_hour)*tmp2.ecn_bus_total*t.total_hours work_hour,h.work_hour real_work_hour,
h.work_date,t.id task_id,t.task_number,t.task_content,d.id document_id,d.ecn_document_number,t.ecn_number,t.total_hours,r.new_value skill_parameter,h.org_id,h.factory,h.dept,h.workshop,h.workgroup,h.team
from BMS_HR_STAFF_HOURS h
left join BMS_HR_STAFF s on s.id=h.staff_id 
left join BMS_HR_STAFF_UPDATE_RECORD r on h.staff_id=r.staff_id and r.type='skill_parameter' and substr(r.edit_date,1,7)<=substr(h.work_date,1,7)
and r.edit_date=(select max(r1.edit_date) from BMS_HR_STAFF_UPDATE_RECORD r1 where h.staff_id=r1.staff_id and r1.type='skill_parameter' and substr(r1.edit_date,1,7)<=substr(h.work_date,1,7))
left join BMS_ECN_TASK t on h.ecn_task_id=t.id
left join BMS_ECN_DOCUMENT d on t.ecn_order_id=d.id
left join BMS_HR_BASE_PRICE p on  p.factory=h.factory and p.type='3' and h.work_date>=p.start_date and h.work_date<=p.end_date
and p.edit_date=(select max(p1.edit_date) from BMS_HR_BASE_PRICE p1 where p1.factory=p.factory and p1.type=p.type )
left join V_ECN_HOUR_TOTAL tmp on tmp.id=t.id and substr(h.work_date,1,7)=tmp.work_month
left join V_ECN_BUS_TOTAL tmp2 on t.id=tmp2.id and substr(h.work_date,1,7)=tmp2.work_month
where h.hour_type='3' and h.status in('1','3') and h.work_hour>0;

drop  view V_WAIT_PAY;
create view V_WAIT_PAY as
select s.staff_number,s.name staff_name,s.job,s.plant_org,s.workshop_org,s.workgroup_org,s.team_org,r.new_value skill_parameter,p.price,h.work_hour,h.work_date,h.org_id,h.factory,h.dept,h.workshop,h.workgroup,h.team
from  BMS_HR_STAFF_HOURS h
left join BMS_HR_STAFF s on s.id=h.staff_id 
left join BMS_HR_STAFF_UPDATE_RECORD r on h.staff_id=r.staff_id  and r.type='skill_parameter' and substr(r.edit_date,1,7)<=substr(h.work_date,1,7)
and r.edit_date=(select max(r1.edit_date) from BMS_HR_STAFF_UPDATE_RECORD r1 where h.staff_id=r1.staff_id  and r1.type='skill_parameter' and substr(r1.edit_date,1,7)<=substr(h.work_date,1,7))
left join BMS_HR_BASE_PRICE p on r.new_value=p.skill_parameter and p.factory=h.factory and p.type='4' and h.work_date>=p.start_date and h.work_date<=p.end_date
and p.edit_date=(select max(p1.edit_date) from BMS_HR_BASE_PRICE p1 where p1.skill_parameter=p.skill_parameter and p1.factory=p.factory and p1.type=p.type ) 
where  h.hour_type='4' and h.status in('1','3') and h.work_hour>0 ;

drop view V_TMP_HOUR_TOTAL;
create view V_TMP_HOUR_TOTAL as
select sum(h.work_hour*r.new_value) total_real_hour,o.id order_id,o.tmp_order_num,substr(h.work_date,1,7) work_month
from BMS_HR_STAFF_HOURS h
left join BMS_HR_STAFF_UPDATE_RECORD r on h.staff_id=r.staff_id  and r.type='skill_parameter' and substr(r.edit_date,1,7)<=substr(h.work_date,1,7)
and r.edit_date=(select max(r1.edit_date) from BMS_HR_STAFF_UPDATE_RECORD r1 where h.staff_id=r1.staff_id  and r1.type='skill_parameter' and substr(r1.edit_date,1,7)<=substr(h.work_date,1,7))
left join BMS_PD_TMP_ORDER o on h.temp_order_id=o.id
where  h.hour_type='2' and h.status in('1','3') and h.work_hour>0
group by o.id,substr(h.work_date,1,7);

drop view V_TMP_SCHEDULE_TOTAL;
create view V_TMP_SCHEDULE_TOTAL as
select temp_order_id,sum(ifnull(output,0)) finished_qty,substr(record_date,1,7) work_month from BMS_PD_TMP_ORDER_SCHEDULE group by temp_order_id,substr(record_date,1,7);

drop  view V_TMP_PAY;
create view V_TMP_PAY  as
select s.staff_number,s.name staff_name,s.job,s.plant_org,s.workshop_org,s.workgroup_org,s.team_org,p.price price,(h.work_hour*r.new_value/tmp.total_real_hour)*tmp1.finished_qty*od.single_hour work_hour,h.work_hour real_work_hour,
h.work_date,od.tmp_order_num,od.id order_id,r.new_value skill_parameter,od.total_hours,od.reason_content,h.org_id,h.factory,h.dept,h.workshop,h.workgroup,h.team
from BMS_HR_STAFF_HOURS h
left join BMS_HR_STAFF s on s.id=h.staff_id 
left join BMS_HR_STAFF_UPDATE_RECORD r on h.staff_id=r.staff_id  and r.type='skill_parameter' and substr(r.edit_date,1,7)<=substr(h.work_date,1,7)
and r.edit_date=(select max(r1.edit_date) from BMS_HR_STAFF_UPDATE_RECORD r1 where h.staff_id=r1.staff_id  and r1.type='skill_parameter' and substr(r1.edit_date,1,7)<=substr(h.work_date,1,7))
left join BMS_PD_TMP_ORDER od on od.id=h.temp_order_id
left join BMS_HR_BASE_PRICE p on p.factory=s.plant_org and p.type='2' and h.work_date>=p.start_date and h.work_date<=p.end_date
and p.edit_date=(select max(p1.edit_date) from BMS_HR_BASE_PRICE p1 where p1.factory=p.factory and p1.type=p.type and substr(p1.start_date,1,7)=substr(p.start_date,1,7) and substr(p1.end_date,1,7)=substr(p.end_date,1,7))
left join V_TMP_HOUR_TOTAL tmp on tmp.order_id=od.id and substr(h.work_date,1,7)=tmp.work_month
left join V_TMP_SCHEDULE_TOTAL tmp1 on tmp1.temp_order_id=h.temp_order_id and substr(h.work_date,1,7)=tmp1.work_month
where h.hour_type='2' and h.status in('1','3') and h.work_hour>0;


drop  view V_DEDUCT_PAY;
create view V_DEDUCT_PAY  as
select s.staff_number,s.name staff_name,s.job,s.plant_org,s.workshop_org,s.workgroup_org,s.team_org,r.rewards_date,
(sum(ifnull(r.add,0))-sum(ifnull(r.deduct,0))) score,(sum(ifnull(r.add,0))-sum(ifnull(r.deduct,0)))*p.price deduct_pay,p.price,r.rewards_factory,r.rewards_workshop
from BMS_HR_REWARDS r 
left join BMS_HR_STAFF s on s.staff_number=r.staff_number
left join BMS_HR_BASE_PRICE p on  p.type='1' and r.rewards_date>=p.start_date and r.rewards_date<=p.end_date
and p.edit_date=(select max(p1.edit_date) from BMS_HR_BASE_PRICE p1 where  p1.type=p.type )
group by s.staff_number,r.rewards_date,r.rewards_factory,r.rewards_workshop;


drop view V_ORG_STAFF_INFO;
create view V_ORG_STAFF_INFO as
SELECT h.staff_id,s.staff_number,s.name staff_name,r.new_value skill_parameter,s.job,s.plant_org,s.dept_org,s.workshop_org,s.workgroup_org,s.team_org, h.org_id,h.factory,h.dept,h.workshop,h.workgroup,h.team,h.work_date 
FROM BMS_HR_STAFF_HOURS h
left join BMS_HR_STAFF s on s.id=h.staff_id
left join BMS_HR_STAFF_UPDATE_RECORD r on h.staff_id=r.staff_id  and r.type='skill_parameter' and substr(r.edit_date,1,7)<=substr(h.work_date,1,7)
and r.edit_date=(select max(r1.edit_date) from BMS_HR_STAFF_UPDATE_RECORD r1 where h.staff_id=r1.staff_id and r1.type='skill_parameter' and substr(r1.edit_date,1,7)<=substr(h.work_date,1,7))
where h.status in ('1','3') ;
