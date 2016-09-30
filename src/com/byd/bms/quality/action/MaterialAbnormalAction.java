package com.byd.bms.quality.action;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;

import com.byd.bms.quality.dao.IQualityDao;
import com.byd.bms.quality.entity.MaterialAbnormalBean;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.Pager;

public class MaterialAbnormalAction extends BaseAction<Object> {

	private static final long serialVersionUID = -125708471525523998L;
	private IQualityDao qualityDao;
	private Map<String, Object> result;
	private MaterialAbnormalBean materialAbnormal;
	private String conditions;
	private Pager pager;
	private File bugPhoto;
	private String bugPhotoFileName;
	private String bugPhotoContentType;
	private File imPhoto;
	private String imPhotoFileName;
	private String imPhotoContentType;

	public IQualityDao getQualityDao() {
		return qualityDao;
	}

	public void setQualityDao(IQualityDao qualityDao) {
		this.qualityDao = qualityDao;
	}

	public Map<String, Object> getResult() {
		return result;
	}

	public void setResult(Map<String, Object> result) {
		this.result = result;
	}

	public MaterialAbnormalBean getMaterialAbnormal() {
		return materialAbnormal;
	}

	public void setMaterialAbnormal(MaterialAbnormalBean materialAbnormal) {
		this.materialAbnormal = materialAbnormal;
	}

	public String getConditions() {
		return conditions;
	}

	public void setConditions(String conditions) {
		this.conditions = conditions;
	}

	public Pager getPager() {
		return pager;
	}

	public void setPager(Pager pager) {
		this.pager = pager;
	}

	public File getBugPhoto() {
		return bugPhoto;
	}

	public void setBugPhoto(File bugPhoto) {
		this.bugPhoto = bugPhoto;
	}

	public String getBugPhotoFileName() {
		return bugPhotoFileName;
	}

	public void setBugPhotoFileName(String bugPhotoFileName) {
		this.bugPhotoFileName = bugPhotoFileName;
	}

	public String getBugPhotoContentType() {
		return bugPhotoContentType;
	}

	public void setBugPhotoContentType(String bugPhotoContentType) {
		this.bugPhotoContentType = bugPhotoContentType;
	}

	public File getImPhoto() {
		return imPhoto;
	}

	public void setImPhoto(File imPhoto) {
		this.imPhoto = imPhoto;
	}

	public String getImPhotoFileName() {
		return imPhotoFileName;
	}

	public void setImPhotoFileName(String imPhotoFileName) {
		this.imPhotoFileName = imPhotoFileName;
	}

	public String getImPhotoContentType() {
		return imPhotoContentType;
	}

	public void setImPhotoContentType(String imPhotoContentType) {
		this.imPhotoContentType = imPhotoContentType;
	}

	/**
	 * 首页
	 */
	public String index() {
		return "index";
	}

	/**
	 * 查询记录列表
	 */
	public String showRecordList() {
		result = new HashMap<String, Object>();
		JSONObject jo = JSONObject.fromObject(conditions);
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		for (Iterator it = jo.keys(); it.hasNext();) {
			String key = (String) it.next();
			System.out.println(key);
			if (key.equals("bugLevel")) {
				Object[] arr = jo.getJSONArray(key).toArray();
				conditionMap.put(key, arr);
				// System.out.println(arr.length);
			} else
				conditionMap.put(key, jo.get(key));
		}
		// Object[] bugLevel=(Object[]) conditionMap.get("bugLevel");
		// System.out.println("bugLevel 长度："+bugLevel.length);
		// Map<String,Object> conditionMap=(Map<String, Object>)
		// JSONObject.toBean(jo, Map.class);
		conditionMap.put("offset",(pager.getCurPage() - 1) * pager.getPageSize());
		conditionMap.put("pageSize", pager.getPageSize());
		result.put("dataList", qualityDao.getMaterialAbnormalList(conditionMap));
		int totalCount = qualityDao.getMaterialAbnormalCount(conditionMap);
		pager.setTotalCount(totalCount);
		result.put("pager", pager);
		return SUCCESS;
	}

	/**
	 * 记录保存
	 */
	public String saveRecord() {
		String createTime = Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		int user_id = getUser().getId();
		String bpath = "images/upload/materialException/";
		// 把上传的文件放到指定的路径下
		String path = ServletActionContext.getServletContext().getRealPath(
				bpath);
		// 写到指定的路径中
		File file = new File(path);
		// 如果指定的路径没有就创建
		if (!file.exists()) {
			file.mkdirs();
		}
		if (bugPhoto != null) {
			try {
				FileUtils.copyFile(
						bugPhoto,
						new File(file, "bugPhoto_"
								+ createTime.replace("-", "").replace(":", "")
										.replace(" ", "")
								+ bugPhotoFileName.substring(
										bugPhotoFileName.indexOf("."),
										bugPhotoFileName.length())));
				materialAbnormal.setBugPhotoPath(bpath
						+ "bugPhoto_"
						+ createTime.replace("-", "").replace(":", "")
								.replace(" ", "")
						+ bugPhotoFileName.substring(
								bugPhotoFileName.indexOf("."),
								bugPhotoFileName.length()));
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		if (imPhoto != null) {
			try {
				FileUtils.copyFile(
						imPhoto,
						new File(file, "imPhoto_"
								+ createTime.replace("-", "").replace(":", "")
										.replace(" ", "")
								+ imPhotoFileName.substring(
										imPhotoFileName.indexOf("."),
										imPhotoFileName.length())));
				materialAbnormal.setImPhotoPath(bpath
						+ "imPhoto_"
						+ createTime.replace("-", "").replace(":", "")
								.replace(" ", "")  + imPhotoFileName.substring(
										imPhotoFileName.indexOf("."),
										imPhotoFileName.length()));
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		materialAbnormal.setEditorId(user_id);
		materialAbnormal.setEditDate(createTime);

		if (materialAbnormal.getId() != 0) {
			qualityDao.updateMaterialAbnormal(materialAbnormal);
		} else {
			qualityDao.insertMaterialAbnormal(materialAbnormal);
		}
		materialAbnormal = new MaterialAbnormalBean();
		result = new HashMap<String, Object>();
		result.put("success", true);
		result.put("message", "保存成功");
		return SUCCESS;
	}
}
