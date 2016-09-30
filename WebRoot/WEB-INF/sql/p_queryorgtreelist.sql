SET GLOBAL log_bin_trust_function_creators = 1;
drop procedure P_QueryOrgTreeList;
create procedure P_QueryOrgTreeList(in userid varchar(10),in url varchar(100),in orgtype varchar(50),in orgKind varchar(10)) 
BEGIN
	declare var_stemp varchar(50000);	#车间维度org tree id列表
	declare var_stempChd varchar(50000); #车间维度子节点org tree  id列表
	declare parentid varchar(50000);	#工厂节点id列表
	declare workshop_limit varchar(500); #权限车间
	declare level2id varchar(500);#生产部id列表
	declare var_stemp1 varchar(10000);#工厂下管理型org id 列表
	declare var_stemp1Chd varchar(10000);#工厂下管理型子节点org id 列表

#设置session级别group_concat 方法返回值的最大长度






SET SESSION  group_concat_max_len = 50000; 

#查询权限工厂id列表
SELECT GROUP_CONCAT(o.id) into parentid FROM BMS_BASE_ORG o 
WHERE FIND_IN_SET(o.name,(
select concat(group_concat(r.factory),',',ifnull(f.factory_name,'')) factory
from BMS_BASE_USER u
left join BMS_BASE_USER_ROLE r on r.user_id=u.id
left join BMS_BASE_ROLE_AUTHORITY a on r.role_id=a.role_id
left join BMS_BASE_FACTORY f on u.factory_id=f.id  
where u.id=userid and a.url =url
))>0 and o.deleted='0';

#查询权限车间列表
select group_concat(r.workshop) into workshop_limit
from BMS_BASE_USER u
left join BMS_BASE_USER_ROLE r on r.user_id=u.id
left join BMS_BASE_ROLE_AUTHORITY a on r.role_id=a.role_id
where u.id=userid and a.url =url;
if workshop_limit is null or workshop_limit ='' then 
	select group_concat(k.key_name) into workshop_limit  from BMS_BASE_KEY k where k.key_code='workshop';
end if;

	set var_stemp='';
	#查询工厂下车间的org id
	select case when group_concat(o2.id) is null then parentid else group_concat(o2.id) end into var_stempChd from BMS_BASE_ORG o1
		left join BMS_BASE_ORG o2 on o2.parent_id=o1.id
		where FIND_IN_SET(o1.parent_id,parentid)>0 
		and FIND_IN_SET(o2.name,workshop_limit)>0;

	#查询工厂下车间及其子节点的org id 
	while var_stempChd is not null do
		set var_stemp=concat(var_stempChd,',',var_stemp);
		if orgtype !='' then
			select group_concat(id) into var_stempChd from BMS_BASE_ORG where FIND_IN_SET(parent_id,var_stempChd)>0 and FIND_IN_SET(org_type,orgtype)>0 and FIND_IN_SET(org_kind,orgKind)>0 and deleted='0';
		else
			select group_concat(id) into var_stempChd from BMS_BASE_ORG where FIND_IN_SET(parent_id,var_stempChd)>0 and FIND_IN_SET(org_kind,orgKind)>0 and deleted='0';
		end if;	
	end while;

	#查询工厂下管理型及其子节点的org id 
	set var_stemp1='';
	if orgKind='0' or orgKind='0,1' then
		select group_concat(id) into var_stemp1Chd from BMS_BASE_ORG where FIND_IN_SET(parent_id,parentid)>0 and org_kind='0';
		while var_stemp1Chd is not null do
			set var_stemp1=concat(var_stemp1Chd,',',var_stemp1);
			if orgtype !='' then
				select group_concat(id) into var_stemp1Chd from BMS_BASE_ORG where FIND_IN_SET(parent_id,var_stemp1Chd)>0 and FIND_IN_SET(org_type,orgtype)>0 and FIND_IN_SET(org_kind,orgKind)>0 and deleted='0';
			else
				select group_concat(id) into var_stemp1Chd from BMS_BASE_ORG where FIND_IN_SET(parent_id,var_stemp1Chd)>0 and FIND_IN_SET(org_kind,orgKind)>0 and deleted='0';
			end if;
		end while;
		set var_stemp=concat(var_stemp1,',',var_stemp);
	end if;
	
	#查询工厂下的生产部 org id
	select group_concat(id) into level2id from BMS_BASE_ORG where FIND_IN_SET(parent_id,parentid)>0 and org_kind=1 and org_type=3;

	#获取org tree 数据
	SELECT s.*  FROM BMS_BASE_ORG s  WHERE s.deleted='0'  AND  (FIND_IN_SET(s.id,  var_stemp)>0  OR  FIND_IN_SET(s.id,parentid)>0 OR   FIND_IN_SET(s.id,level2id)>0) ORDER BY s.sort_number,s.id ASC;

END
