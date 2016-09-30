<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>岗位说明书</title>
<!-- Le styles -->

<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/bootstrap-responsive.css" rel="stylesheet">
<link href="css/common.css" rel="stylesheet">

<link rel="stylesheet" href="js/jquery/ui-lightness/jquery-ui-1.10.2.custom.css" />
<link rel="stylesheet" href="css/font-awesome.min.css" />
<link href="js/primitives/primitives.latest.css" media="screen" rel="stylesheet" type="text/css" />
<style type="text/css">
.bp-item {
    position: relative;
}
.bp-corner-all {
    border-radius: 0px;
}
</style>

<script type="text/javascript" src="js/jquery-1.9.0.js"></script>
<script type="text/javascript" src="js/jquery/jquery-ui-1.10.2.custom.min.js"></script>
 
<script  type="text/javascript" src="js/primitives/primitives.min.js"></script>

<%-- <script type="text/javascript" src="js/ztree/jquery.ztree.core-3.5.min.js"></script> --%>

<!--<script type="text/javascript" src="js/datatables/jquery.dataTables.min.js"></script>-->

<script type="text/javascript" src="js/jquery.form.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/velocity.min.js"></script>
<script type="text/javascript" src="js/velocity.ui.min.js"></script>

<!-- add by wuxiao -->
<script type="text/javascript" src="js/hr/positionDescription.js"></script>

</head>
<body>
	<div class="content-wrapper">
		<div id="bodymain" class="offhead">
			<div id="bodyright" style="margin-top:10px;">
				<div id="divPrint" align="center">
					<table class="table table-bordered table-striped" style="text-align:center;table-layout:fixed;font-size:12px;width:850px">
						<tr>
							<td width="100%" align="center" colspan="4">
								<span style="font-size: 16px;">
									BYD岗位说明书<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BYD Job Description
								</span>
								<span style="float:right;"><button id="btnPrint" class="btn btn-link btn-xs" rel="tooltip" title="打印" btn-name="print"><i class="fa fa-print fa-lg"></i></button></span>
							</td>
						</tr>
						<tr>
							<td width="15%">
								<span>
									职位/Job
								</span>
							</td>
							<td width="35%">
								<span position-detail="job_name">
									成本会计
								</span>
							</td>
							<td width="15%">
								<span>
									级别/Level
								</span>
							</td>
							<td>
								<span position-detail="job_level">
									F-G
								</span>
							</td>
						</tr>
						<tr>
							<td>
								<span>
									事业部/Division
								</span>
							</td>
							<td>
								<span>
									第19事业部
								</span>
							</td>
							<td>
								<span>
									部门/Department
								</span>
							</td>
							<td>
								<span position-detail="org_name">
									财务部
								</span>
							</td>
						</tr>
						<tr>
							<td>
								<span>
									科室/Section
								</span>
							</td>
							<td>
								<span>
									
								</span>
							</td>
							<td>
								<span>
									职位编码/Job Cord
								</span>
							</td>
							<td>
								<span position-detail="job_no">
									C00001
								</span>
							</td>
						</tr>
						<tr>
							<td width="100%" align="left" colspan="4">
								<p style="font-size: 16px;">
									基本职责/ Basic Responsibility：
								</p>
								
<span position-detail="basic_besponsibilit">
1、核算事业部产品成本，编制产品计算单和相关凭证，并出具事业部成本报表；

2、做好事业部的成本测算工作，为上级领导提供管理、决策依据；

3、做好月终车间和库房的盘点工作，并出具盘点报告；

4、学习先进的成本管理核算方法和车间工艺流程，进一步完善成本核算，达到成本控制的目的；

领导交办的其它工作。

5、对各车间统计和库管进行业务上的指导和培训，并督促其及时核对帐务；

6、完成领导安排的其他工作。
</span>


							</td>
						</tr>
						<tr>
							<td width="100%" align="left" colspan="4">
								<p style="font-size: 16px;">
									任职资格/Requirements：
								</p>
<span position-detail="requirements">								
(1) 有扎实的财务会计理论和应用能力；                                                                                                                    

(2)  能熟练操作财务软件及各种办公软件；                                                                                                                          

(3)  能准确地进行帐务处理、成本核算、成本分析工作。

</span>


							</td>
						</tr>
						<tr>
							<td>
								<span>
									1、年龄/ Age：
								</span>
							</td>
							<td>
								<span position-detail="age">
									18岁以上
								</span>
							</td>
							<td>
								<span>
									

2、性别/ Sex：

								</span>
							</td>
							<td>
								<span position-detail="sax">
									不限
								</span>
							</td>
						</tr>
						<tr>
							<td>
								<span>
									3、最低学历/ Minimum Education： 
								</span>
							</td>
							<td>
								<span position-detail="minimum_education">
									

高中

								</span>
							</td>
							<td>
								<span>
									

4、专业/Specialty：

								</span>
							</td>
							<td>
								<span position-detail="specialty">
									财会相关专业
								</span>
							</td>
						</tr>
						<tr>
							<td>
								<span>
									

5、外语/Foreign Language：

								</span>
							</td>
							<td>
								<span position-detail="foreign_language">
									不限
								</span>
							</td>
							<td>
								<span>
									6、工作经验/Work Experience：
								</span>
							</td>
							<td>
								<span position-detail="work_experience">
									不限
								</span>
							</td>
						</tr>
						<%-- <tr>
							<td width="100%" align="left" colspan="4">
								<span style="font-size: 16px;">
									任职资格/Requirements：
								</span>
								
（1）扎实的财务成本理论基础，良好的业务水平（成本方面）。

（2）熟练操作EXCEL、WORD等办公软件，熟练公司的ERP（SAP）系统

（3）良好的人际关系和沟通能力

（4）责任心强，细心耐心，有一定的团队意识、风险意识、全局意识。




							</td>
						</tr> --%>
						<tr>
							<td width="100%" align="left" colspan="4">
								<p style="font-size: 16px;">
									上岗所需培训/Train before Work：
								</p>
						<span position-detail="required_train">		
成本会计培训、EXCLE操作培训
</span>



							</td>
						</tr>
						<tr>
							<td width="100%" align="left" colspan="4">
								<p style="font-size: 16px;">
									其他特殊要求/Else：
								</p>
	<span position-detail="other_requirements">							
无
</span>



							</td>
						</tr>
						<tr>
							<td width="100%" align="left" colspan="4">
								<p style="font-size: 16px;">
									

工作关系图/ Work Relationship Chart：

								</p>
								<div id="orgDiagram" style="position: relative;width: 100%;height:500px;" ></div>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
</body>
</html>