package com.byd.bms.hr.action;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.byd.bms.hr.action.OrgDataAction.TreeNode;
import com.byd.bms.hr.dao.IHrDao;
import com.byd.bms.util.action.BaseAction;

public class StaffDataAction extends BaseAction<Object>{

	
	private static final long serialVersionUID = 1L;
	private IHrDao hrDao;
	
	

	public IHrDao getHrDao() {
		return hrDao;
	}
	public void setHrDao(IHrDao hrDao) {
		this.hrDao = hrDao;
	}


	public String staffSearch(){
		return "staffSearch";
	}

}
