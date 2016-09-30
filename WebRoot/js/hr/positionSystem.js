$(document).ready(function () {

initPage();

// $selectGrade.on('change', function (e) {
// fillHighLevelSelect();
// });

$('#btnAdd').on('click', function(e) {
	//alert('1');
	initEditModal();
	//$titleSuffix.html('新增');
	
	fillPositionGradeSelect();
	$('#job_grade_id').val($('#positionPyramid').find('.active').attr('key'));
	fillParentPositionSelect(null,$('#job_grade_id').val());
	//alert($('#positionPyramid').find('.active').attr('key'));
	$('#job_level').val($('#positionLevel').find('.active').text());
	//alert($('#positionLevel').find('.active').text());
	$('#editModal').find('h3').eq(0).html('新增');
	$('#editModal').modal('show');
});

$("#btnEditConfirm").click(function(){ 
	//alert("aa");
	if($('#editModal').find('h3').eq(0).html()=='新增'){add();}
		
	if($('#editModal').find('h3').eq(0).html()=='修改'){edit();}
		
});

$("#job_grade_id").change(function() {
	if($('#editModal').find('h3').eq(0).html()=='新增'){fillParentPositionSelect(null,$('#job_grade_id').val());}
	
	if($('#editModal').find('h3').eq(0).html()=='修改'){fillParentPositionSelect($('#editModal').data('id'),$('#job_grade_id').val());}
	
});

//modify by wuxiao
function add() {
    $.ajax({
        url: 'orgData!addPositionData.action',
        dataType: 'json',
        data: {
        	'parent_job_id' : $('#parent_job_id').val(),
        	'job_no' : $('#job_no').val(),
        	'job_name' : $('#job_name').val(),
        	'job_level' : $('#job_level').val(),
        	'job_grade_id' : $('#job_grade_id').val(),
        	'age' : $('#age').val(),
        	'level_limit_min' : $('#level_limit_min').val(),
        	'level_limit_max' : $('#level_limit_max').val(),
        	'sax' : $('#sax').val(),
        	'minimum_education' : $('#minimum_education').val(),
        	'specialty' : $('#specialty').val(),
        	'foreign_language' : $('#foreign_language').val(),
        	'work_experience' : $('#work_experience').val(),
        	'basic_besponsibilit' : $('#basic_besponsibilit').val(),
        	'requirements' : $('#requirements').val(),
        	'skill_and_capability' : $('#skill_and_capability').val(),
        	'required_train' : $('#required_train').val(),
        	'other_requirements' : $('#other_requirements').val(),
        },
        error: function () {
            //common.alertError();
        },
        success: function (response) {
            if(response.success) {
            	//ajaxQuery();
            	if($('#positionPyramid').find('.active').attr('key')==undefined){
            		//do nothing!
            	}else{
            		getPositionList($('#positionPyramid').find('.active').attr('key'));
            	}
                $('#editModal').modal('hide');
                alert('岗位添加成功');
            } else {
                alert(response.message);
            }
        }
    });
}

//modify by wuxiao
function edit() {
    $.ajax({
        url: 'orgData!editPositionData.action',
        dataType: 'json',
        data: {
        	'parent_job_id' : $('#parent_job_id').val(),
        	'job_no' : $('#job_no').val(),
        	'job_name' : $('#job_name').val(),
        	'job_level' : $('#job_level').val(),
        	'job_grade_id' : $('#job_grade_id').val(),
        	'age' : $('#age').val(),
        	'level_limit_min' : $('#level_limit_min').val(),
        	'level_limit_max' : $('#level_limit_max').val(),
        	'sax' : $('#sax').val(),
        	'minimum_education' : $('#minimum_education').val(),
        	'specialty' : $('#specialty').val(),
        	'foreign_language' : $('#foreign_language').val(),
        	'work_experience' : $('#work_experience').val(),
        	'basic_besponsibilit' : $('#basic_besponsibilit').val(),
        	'requirements' : $('#requirements').val(),
        	'skill_and_capability' : $('#skill_and_capability').val(),
        	'required_train' : $('#required_train').val(),
        	'other_requirements' : $('#other_requirements').val(),
        	
        	'id':$('#editModal').data('id')
        },
        error: function () {
            //common.alertError();
        },
        success: function (response) {
            if(response.success) {
            	//ajaxQuery();
            	getPositionList($('#positionPyramid').find('.active').attr('key'));
                $('#editModal').modal('hide');
                alert('岗位修改成功');
            } else {
                alert(response.message);
            }
        }
    });
}

function remove (id) {
    $.ajax({
        url: 'orgData!deletePositionData.action',
        dataType: 'json',
        data: {
            'id' : id
        },
        error: function () {
            //common.alertError();
        },
        success: function (response) {
            if(response.success) {
            	//ajaxQuery();
            	getPositionList($('#positionPyramid').find('.active').attr('key'));
            } else {
                alert(response.message);
            }
        }
    });
}

$('#positionPyramid').on('click', function(e) {
	//alert(1);
	var $target = $(e.target);
	$target = $target.hasClass('pyramid-grade') ? $target : $target
			.parent('.pyramid-grade');
	clearPyramid();
	$target.addClass('active');
	$('#positionLevel').find('[level=' + $target.attr('level') + ']').addClass(
			'active');
	if($target.attr('key')!=null){
		getPositionList($target.attr('key'));
	}else{
		getPositionList(-1);
	}
});

$('#positionList').on('click', function(e) {
	var $target = $(e.target);
	var positionId = $target.closest('li').attr('data-position-id');
	$('#editModal').data('id',positionId);
	if ($target.hasClass('btn') || $target.parent('.btn').length > 0) {
		var $btn = $target.hasClass('btn') ? $target : $target.parent('.btn');
		var btnName = $btn.attr('btn-name');
		if (btnName === 'edit') {
			//alert(positionId);
			//getPositionDetail(positionId);
			initEditModal();
			$('#editModal').find('h3').eq(0).html('修改');
			
			fillPositionGradeSelect();
        	$.ajax({
                url: 'orgData!getPositionData.action',
                dataType: 'json',
                data: {
                    'id' : positionId,
                },
                error: function () {
                    //common.alertError();
                },
                success: function (response) {
                    if(response.success) {
                    	//$('#parent_job_id').val(response.data[0].parent_job_id);
                    	$('#job_no').val(response.data[0].job_no);
                    	$('#job_name').val(response.data[0].job_name);
                    	$('#job_level').val(response.data[0].job_level);
                    	$('#job_grade_id').val(response.data[0].job_grade_id);
                    	fillParentPositionSelect(positionId,$('#job_grade_id').val());
                    	if(response.data[0].parent_job_id==null){
                    		$('#parent_job_id').html('');
                    		//$('#parent_job_id').attr('disabled', 'disabled');
                    	}else{
                    		$('#parent_job_id').val(response.data[0].parent_job_id);
                    	}
                    	
                    	$('#age').val(response.data[0].age);
                    	$('#level_limit_min').val(response.data[0].level_limit_min);
                    	$('#level_limit_max').val(response.data[0].level_limit_max);
                    	$('#sax').val(response.data[0].sax);
                    	$('#minimum_education').val(response.data[0].minimum_education);
                    	$('#specialty').val(response.data[0].specialty);
                    	$('#foreign_language').val(response.data[0].foreign_language);
                    	$('#work_experience').val(response.data[0].work_experience);
                    	$('#basic_besponsibilit').val(response.data[0].basic_besponsibilit);
                    	$('#requirements').val(response.data[0].requirements);
                    	$('#skill_and_capability').val(response.data[0].skill_and_capability);
                    	$('#required_train').val(response.data[0].required_train);
                    	$('#other_requirements').val(response.data[0].other_requirements);
                    } else {
                        alert(response.message);
                    }
                }
            });
        	$('#editModal').data('id',positionId);
        	$('#editModal').modal('show');
		} else if (btnName === 'remove') {
			//fillParentPositionSelect();
			var msg = '是否移除岗位[' + $btn.attr('data-display-name')
					+ ']？';
			if(confirm(msg)) {
				//alert(positionId);
                remove(positionId);
                //ajaxQuery();
            }
		}
	}/* else {
		href = '/bms/humanResources/positionDescription?positionId='
				+ positionId;
		window.open(href, '_blank');
	}*/
});

function initPage() {
	//common.initGolbal();
	//$("#headManpowerLi").addClass("active");
	//fillGradeSelect();
	//if (maintainPrivilage) {
	//	$btnAdd.show();
	//}
	$('.left-sidebar li ul').eq(0).addClass("in");
	$('.treemenu').eq(0).removeClass("collapsed");
}

function initEditModal() {
	/*$editModal.find('.form-control').val('');
	$editModal.data('position_id', 0);
	$paneDescription.removeClass('active in');
	$liDescription.removeClass('active');
	$paneDefinition.addClass('active in');
	$liDefinition.addClass('active');*/
	$('#parent_job_id').removeAttr('disabled');
	$('#editModal').find('.carType').val('');
}

function clearPyramid() {
	$('.position-level').removeClass('active');
	$('.pyramid-grade').removeClass('active');
}

/*function fillGradeSelect() {
	$.ajax({
		url : service.GET_HR_GRADE_LIST,
		dataType : 'json',
		data : {},
		async : false,
		error : function() {
			common.alertError();
		},
		success : function(response) {
			if (response.success) {
				$allOpts = $('<div />');
				$.each(response.data, function(channel, grades) {
					$options = $('<option />').attr('disabled', 'disabled')
							.val('').html('-----' + channel + '-----')
							.appendTo($allOpts);
					$.each(grades, function(index, grade) {
						$opt = $('<option />').val(grade.id).html(
								grade.grade_name).appendTo($allOpts);
					});
				});
				$('#selectGrade').html('').html($allOpts.html());
			} else {
				bootbox.alert(response.message);
			}
		}
	});
}*/

// function fillHighLevelSelect () {
// $.ajax({
// url: service.GET_HR_HIGH_LEVEL,
// dataType: 'json',
// data: {
// positionId: $selectGrade.val()
// },
// async: false,
// error: function (e) {
// common.alertError();
// },
// success: function (response) {
// if (response.success) {
// var positions = response.data;
// $allOpts = $('<select />');
// if (positions.length) {
// $.each(positions, function (index, position) {
// $options = $('<option
// />').val(position.id).html(position.display_name).appendTo($allOpts);
// });
// } else {
// $('<option />').val('').html('无').appendTo($allOpts);
// }
// $('#selectParent').html('').html($allOpts.html());
// console.log(response.data);
// } else {
// bootbox.alert(response.message);
// }
// }
// });
// }

//modify by wuxiao
function getPositionList(key) {
	$.ajax({
		url : 'orgData!getPositionData.action',
		dataType : 'json',
		data : {
			'job_grade_id' : key,
			//'level' : level
		},
		error : function() {
			//common.alertError();
		},
		success : function(response) {
			if (response.success) {
				$('#positionList').html('').hide();
				$('#positionList').append(
						$.templates("#tmplPositionList").render(response.data))
						.show();
				//if (!maintainPrivilage) {
				//$('#positionList').find('.btn-group').hide();
				//}
			} else {
				alert(response.message);
			}
		}
	});
}

function getPositionDetail(positionId) {
	$.ajax({
		url : service.GET_POSITION_DETAIL,
		dataType : 'json',
		data : {
			'positionId' : positionId
		},
		error : function() {
			common.alertError();
		},
		success : function(response) {
			if (response.success) {
				initEditModal();
				$inputPositionNumber.val(response.data.position_number);
				$selectGrade.val(response.data.grade_id);
				$inputDisplayName.val(response.data.display_name);
				$inputName.val(response.data.name);
				$inputShortName.val(response.data.short_name);
				$textEducation.val(response.data.education);
				$textExperiences.val(response.data.experiences);
				$textDescription.val(response.data.description);
				$editModal.data('position_id', response.data.id).modal('show');
			} else {
				bootbox.alert(response.message);
			}
		}
	});
}

function savePosition() {
	$.ajax({
		url : '',
		type : 'post',
		dataType : 'json',
		data : {
			//'positionId' : $editModal.data('position_id'),
			//'positionDetail' : packEditData()
		},
		error : function() {
			common.alertError();
		},
		success : function(response) {
			if (response.success) {
				$editModal.modal('hide');
				alert('岗位添加成功');
			} else {
				alert(response.message);
			}
		}
	});
}

function removePosition(positionId) {
	$
			.ajax({
				url : service.REMOVE_POSITION,
				dataType : 'json',
				data : {
					'positionId' : positionId
				},
				error : function() {
					common.alertError();
				},
				success : function(response) {
					if (response.success) {
						var channel = $pyramid.find('.active').attr('channel'), level = $pyramid
								.find('.active').attr('level');
						getPositionList(channel, level);
					} else {
						bootbox.alert(response.message);
					}
				}
			});
}

function packEditData() {
	var packData = {};
	packData.position_number = $inputPositionNumber.val();
	packData.name = $inputName.val();
	packData.display_name = $inputDisplayName.val();
	packData.short_name = $inputShortName.val();
	packData.grade_id = $selectGrade.val();
	packData.education = $textEducation.val();
	packData.experiences = $textExperiences.val();
	packData.description = $textDescription.val();

	retData = JSON.stringify(packData);

	return retData;
}

});

//modify by wuxiao
function fillParentPositionSelect (id,gid) {
    $.ajax({
        url: 'orgData!getParentPositionList.action',
        dataType: 'json',
        async: false,
        data: {
            'id': id,
            'gid': gid,
        },
        async: false,
        error: function () {
            //common.alertError();
        },
        success: function (response) {
            if(response.success) {
                $allOpts = $('<div />');
                //$.each(response.data, function (level, depts) {
                    //$options = $('<option />').attr('disabled', 'disabled').val('').html(level).appendTo($allOpts);
                    $.each(response.data/*depts*/, function (index, dept) {
                        $opt = $('<option />').val(dept.id).html(dept.job_name).appendTo($allOpts);
                    });
                //});
                $('#parent_job_id').html('').html($allOpts.html());
            } else {
                alert(response.message);
            }
        }
    });
}

//modify by wuxiao
function fillPositionGradeSelect () {
    $.ajax({
        url: 'orgData!getPositionGradeList.action',
        dataType: 'json',
        async: false,
        data: {
            //'id': deptId
        },
        async: false,
        error: function () {
            //common.alertError();
        },
        success: function (response) {
            if(response.success) {
                $allOpts = $('<div />');
                //$.each(response.data, function (level, depts) {
                    //$options = $('<option />').attr('disabled', 'disabled').val('').html(level).appendTo($allOpts);
                    $.each(response.data/*depts*/, function (index, dept) {
                        $opt = $('<option />').val(dept.id).html(dept.name).appendTo($allOpts);
                    });
                //});
                $('#job_grade_id').html('').html($allOpts.html());
            } else {
                alert(response.message);
            }
        }
    });
}

function levelToInt(input){
	switch(input){
	case 'B':
		return 0;
		break;
	case 'C':
		return 1;
		break;
	case 'D':
		return 2;
		break;
	case 'E':
		return 3;
		break;
	case 'F':
		return 4;
		break;
	case 'G':
		return 5;
		break;
	case 'H':
		return 6;
		break;
	case 'I':
		return 7;
		break;
	}
}