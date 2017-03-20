package com.byd.bms.quality.dao;

import java.util.List;
import java.util.Map;

import com.byd.bms.quality.entity.MaterialAbnormalBean;
import com.byd.bms.quality.entity.OrderConfigBean;
import com.byd.bms.quality.entity.OrderConfigHeaderBean;
import com.byd.bms.quality.entity.OrderConfigTplDetailBean;
import com.byd.bms.quality.entity.OrderConfigTplHeaderBean;
import com.byd.bms.quality.entity.ProdTrackBean;
import com.byd.bms.quality.entity.ProdTrackHeaderBean;
import com.byd.bms.quality.entity.QCStdRecordBean;
import com.byd.bms.quality.entity.QualityTargetBean;
import com.byd.bms.quality.entity.StdFaultLibBean;
import com.byd.bms.quality.entity.TestFlowCardDetailBean;
import com.byd.bms.quality.entity.TestFlowCardHeaderBean;
import com.byd.bms.quality.entity.TestFlowTplDetailBean;
import com.byd.bms.quality.entity.TestFlowTplHeaderBean;
import com.byd.bms.quality.entity.TestRecordDetailBean;
import com.byd.bms.quality.entity.TestRecordHeaderBean;
import com.byd.bms.quality.entity.TestTplDetailBean;
import com.byd.bms.quality.entity.TestTplHeaderBean;
import com.byd.bms.quality.entity.TrackTplDetailBean;
import com.byd.bms.quality.entity.TrackTplHeaderBean;

public interface IQualityDao {
	//检验记录模板
	public List<TestTplHeaderBean> getTestTplHeaderList(Map<String, Object> conditionMap);
	public List<TestTplHeaderBean> getTestTplHeaderListMatch(Map<String, Object> conditionMap);
	public int getTestTplHeaderTotalCount(Map<String, Object> conditionMap);
	public List<TestTplDetailBean> getTestTplDetailList(int tplHeaderId);
	public int insertTestTplDetail(List<TestTplDetailBean> tplDetailList);
	public int insertTestTplHeader(TestTplHeaderBean tplHeader);
	public int updateTestTplHeader(TestTplHeaderBean testTplHeader);
	public TestTplHeaderBean getTestTplHeader(int tplHeaderId);
	public int updateTestTplDetail(List<TestTplDetailBean> tplDetailList);
	public int deleteTestTplDetail(List<TestTplDetailBean> testTplDetailList);
	//检验流程卡模板
	public List<TestFlowTplHeaderBean> getTestFlowTplHeaderList(Map<String, Object> conditionMap);
	public int getTestFlowTplHeaderTotalCount(Map<String, Object> conditionMap);
	public List<TestFlowTplDetailBean> getTestFlowTplDetailList(int tplHeaderId);
	public TestFlowTplHeaderBean getTestFlowTplHeader(int tplHeaderId);
	public int insertTestFlowTplDetail(List<TestFlowTplDetailBean> tplDetailList);
	public int insertTestFlowTplHeader(TestFlowTplHeaderBean tplHeader);
	public int updateTestFlowTplDetail(List<TestFlowTplDetailBean> tplDetailList);
	public int deleteTestFlowTplDetail(List<TestFlowTplDetailBean> tplDetailList);
	public void updateTestFlowTplHeader(TestFlowTplHeaderBean tplHeader);
	//产品追踪卡模板
	public List<TrackTplHeaderBean> getTrackTplHeaderList(Map<String, Object> conditionMap);
	public int getTrackTplHeaderTotalCount(Map<String, Object> conditionMap);
	public TrackTplHeaderBean getTrackTplHeader(int tplHeaderId);
	public List<TrackTplDetailBean> getTrackTplDetailList(Map<String, Object> conditionMap);
	public int updateTrackTplDetail(List<TrackTplDetailBean> tplDetailList);
	public int insertTrackTplDetail(List<TrackTplDetailBean> tplDetailList);
	public int insertTrackTplHeader(TrackTplHeaderBean tplHeader);
	public int deleteTrackTplDetail(Map<String, Object> conditionMap);
	//订单配置一致性模板
	public OrderConfigTplHeaderBean getOrderConfigTplHeader(int tplHeaderId);
	public int updateOrderConfigTplDetail(List<OrderConfigTplDetailBean> tplDetailList);
	public int insertOrderConfigTplDetail(List<OrderConfigTplDetailBean> tplDetailList);
	public List<OrderConfigTplHeaderBean> getOrderConfigTplHeaderList(Map<String, Object> conditionMap);
	public int getOrderConfigTplHeaderTotalCount(Map<String, Object> conditionMap);
	public List<OrderConfigTplDetailBean> getOrderConfigTplDetailList(Map<String, Object> conditionMap);
	public int insertOrderConfigTplHeader(OrderConfigTplHeaderBean tplHeader);
	//品质标准
	public int insertStdRecord(QCStdRecordBean stdRecord);
	public QCStdRecordBean selectStdRecord(int recordId);
	public List<QCStdRecordBean> getStdRecordList(Map<String,Object> conditionMap);
	public int getStdRecordCount(Map<String,Object> conditionMap);
	//质量目标参数
	public List<QualityTargetBean> getQualityTargetList(Map<String, Object> conditionMap);
	public int getQualityTargetCount(Map<String, Object> conditionMap);
	public int insertQualityTarget(QualityTargetBean qualityTarget);
	public int updateQualityTarget(QualityTargetBean qualityTarget);
	//标准故障库
	public List<StdFaultLibBean> getFaultLibList(Map<String, Object> conditionMap);
	public int getFaultLibCount(Map<String, Object> conditionMap);
	public int insertFaultLib(StdFaultLibBean faultLib);
	public int updateFaultLib(StdFaultLibBean faultLib);
	public List<StdFaultLibBean> getFaultLibFuzzyList(Map<String, Object> conditionMap);
	//物料异常
	public List<MaterialAbnormalBean> getMaterialAbnormalList(Map<String, Object> conditionMap);
	public int getMaterialAbnormalCount(Map<String, Object> conditionMap);
	public int insertMaterialAbnormal(MaterialAbnormalBean materialAbnormal);
	public int updateMaterialAbnormal(MaterialAbnormalBean materialAbnormal);
	//检验记录录入
	public List<TestRecordHeaderBean> getTestRecordHeaderList(Map<String, Object> conditionMap);
	public int getTestRecordHeaderCount(Map<String, Object> conditionMap);
	public TestRecordHeaderBean getTestRecordHeader(int header);
	public List<TestRecordDetailBean> getTestRecordDetailList(int headerId);
	public int insertTestRecordHeader(TestRecordHeaderBean header);
	public int updateTestRecordHeader(TestRecordHeaderBean header);
	public int insertTestRecordDetail(List<TestRecordDetailBean> detailList);
	public int updateTestRecordDetail(List<TestRecordDetailBean> detailList);
	//产品追踪卡录入
	public List<ProdTrackBean> getProdTrackList(Map<String, Object> conditionMap);
	public List<ProdTrackHeaderBean> getProdTrackHeaderList(Map<String, Object> conditionMap);
	public int getProdTrackHeaderCount(Map<String, Object> conditionMap);
	public int insertProdTrack(List<ProdTrackBean> prodTrackList);
	public int updateProdTrack(List<ProdTrackBean> prodTrackList);
	public List<TrackTplHeaderBean> getTrackTplHeaderByBusNo(Map<String, Object> cMap);
	public List<TrackTplDetailBean> getTrackTplDetails(Map<String,Object> coditionMap);//tplHeaderId,workshopId
	public Map<String,Object> getFactoryByBusNo(String busNo);
	//订单配置与一致性录入
	public List<OrderConfigBean> getOrderConfigList(Map<String, Object> conditionMap);
	public List<OrderConfigHeaderBean> getOrderConfigHeaderList(Map<String, Object> conditionMap);
	public int getOrderConfigHeaderCount(Map<String, Object> conditionMap);
	public int insertOrderConfig(List<OrderConfigBean> prodTrackList);
	public int updateOrderConfig(List<OrderConfigBean> prodTrackList);
	public List<OrderConfigTplHeaderBean> getOcTplHeaderByBusNo(Map<String, Object> cMap);
	public List<OrderConfigTplDetailBean> getOcTplDetails(Map<String,Object> coditionMap);//tplHeaderId,workshopId
	//检验流程卡录入
	public List<TestFlowCardHeaderBean> getTestFlowCardHeaderList(Map<String, Object> conditionMap);
	public int getTestFlowCardHeaderCount(Map<String, Object> conditionMap);
	public List<TestFlowTplHeaderBean> getTestFlowTplHeaderByBusNo(Map<String, Object> conditionMap);
	public int insertTestFlowCardHeader(TestFlowCardHeaderBean header);
	public int insertTestFlowCardDetail(List<TestFlowCardDetailBean> detailList);
	public int updateTestFlowCardHeader(TestFlowCardHeaderBean header);
	public int updateTestFlowCardDetail(List<TestFlowCardDetailBean> detailList);
	public TestFlowCardHeaderBean getTestFlowCardHeader(int headrId);
	public List<TestFlowCardDetailBean> getTestFlowCardDetailList(int id);
	
	public Map<String,String> queryBusInfoByBusNo(String busNo);

}
