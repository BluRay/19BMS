package com.byd.erpit.tools.email;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.byd.erpit.tools.email.EmailSender.TableTable.TdTd;

public class EmailSender {
	private String from;//谁发的邮件
	private String to;//发给谁
	private String cc;
	private String bcc;
	private String content;
	private String subject;
	private Map<String, String> param = new HashMap<String,String>();//自定义参数
	private List<File> attachments = new ArrayList<File>();//附件
	
	public class TableTable{
		public class TdTd{
			public TdTd(String text) {
				super();
				this.text = text;
			}
			public TdTd() {
				super();
			}
			private String text;
			private int rowspan = 1;
			private int colspan = 1;
			public String getText() {
				return text;
			}
			public void setText(String text) {
				this.text = text;
			}
			public int getRowspan() {
				return rowspan;
			}
			public void setRowspan(int rowspan) {
				this.rowspan = rowspan;
			}
			public int getColspan() {
				return colspan;
			}
			public void setColspan(int colspan) {
				this.colspan = colspan;
			}
		}
		private List<TdTd> thead;
		private List<List<TdTd>> tbody;
		public List<TdTd> getThead() {
			return thead;
		}
		public void setThead(List<TdTd> thead) {
			this.thead = thead;
		}
		public List<List<TdTd>> getTbody() {
			return tbody;
		}
		public void setTbody(List<List<TdTd>> tbody) {
			this.tbody = tbody;
		}
	}
	//合并单元格
	private boolean merge = false;
	public boolean isMerge() {
		return merge;
	}
	public void setMerge(boolean merge) {
		this.merge = merge;
	}

	//表格
	private List<TableTable> tables = new ArrayList<TableTable>();
	//大标题
	private String maintitle;
	//小标题
	private String subtitle;
	//图片
	private List<Img> imgs = new ArrayList<Img>();

	public String getImgs1() {
		return generateImages(imgs);
	}
	public List<Img> getImgs() {
		return imgs;
	}
	public void setImgs(List<Img> imgs) {
		this.imgs = imgs;
	}

	public class Img{
		private String cid;
		private String filepath;
		public String getCid() {
			return cid;
		}
		public void setCid(String cid) {
			this.cid = cid;
		}
		public String getFilepath() {
			return filepath;
		}
		public void setFilepath(String filepath) {
			this.filepath = filepath;
		}
	}
	
	public String getMaintitle() {
		return maintitle;
	}
	public void setMaintitle(String maintitle) {
		this.maintitle = maintitle;
	}
	public String getSubtitle() {
		return subtitle;
	}
	public void setSubtitle(String subtitle) {
		this.subtitle = subtitle;
	}
	public String getTables() {
		return generateTables(tables);
	}
	public void setTables(List<TableTable> tables) {
		this.tables = tables;
	}
	public String getFrom() {
		return from;
	}
	public void setFrom(String from) {
		this.from = from;
	}
	public String getTo() {
		return to;
	}
	public void setTo(String to) {
		this.to = to;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public void setAttachments(List<File> attachments) {
		this.attachments = attachments;
	}
	public List<File> getAttachments() {
		return attachments;
	}
	public void setCc(String cc) {
		this.cc = cc;
	}
	public String getCc() {
		return cc;
	}
	public void setParam(Map<String, String> param) {
		this.param = param;
	}
	public Map<String, String> getParam() {
		return param;
	}
	public void setBcc(String bcc) {
		this.bcc = bcc;
	}
	public String getBcc() {
		return bcc;
	}
	
	public String generateTables(List<TableTable> tables){
		if(tables==null) return "";
		StringBuffer sb=new StringBuffer();
		
		for(TableTable table : tables){
			sb.append("<table width='90%' class='dataTable' cellpadding='0' cellspacing='0' border='1'>");
			//thead
			if(merge){
				mc(table,0,0,0);
			}
			List<TdTd> thead = table.getThead();
			sb.append("<thead><tr class='titleTr'>");
			for(TdTd th : thead){
				sb.append("<th colspan='"+th.getColspan()+"' rowspan='"+th.getRowspan()+"'>");
				sb.append(th.getText());
				sb.append("</th>");
			}
			sb.append("</tr></thead>");
			//tbody
			List<List<TdTd>> tbody = table.getTbody();
			sb.append("<tbody>");
			int flg=0;
			for(List<TdTd> tr : tbody){
				if(flg%2==0){
					sb.append("<tr class='lightTr'>");
				}else{
					sb.append("<tr class='darkTr'>");
				}
				flg++;
				for(TdTd td : tr){
					sb.append("<td width='200px' colspan='"+td.getColspan()+"' rowspan='"+td.getRowspan()+"'>");
					sb.append(td.getText());
					sb.append("</td>");
				}
				sb.append("</tr>");
			}
			sb.append("</tbody>");
			
			sb.append("</table><br>");
		}
		
		return sb.toString();
	}
	
	public void mc(TableTable table, int startRow, int endRow, int col){
		if (col >= table.getThead().size()) {
			return;
		}
		if (col == 0) {
			endRow = table.getTbody().size() - 1;
		}
		for (int i = startRow; i < endRow; i++) {
			if (table.getTbody().get(startRow).get(col).getText().equals(table.getTbody().get(i + 1).get(0).getText())) {
				table.getTbody().get(i + 1).remove(0);
				table.getTbody().get(startRow).get(col).setRowspan(table.getTbody().get(startRow).get(col).getRowspan() + 1);/* = (tb.rows[startRow].cells[col].rowSpan | 0) + 1;*/
				if (i == endRow - 1 && startRow != endRow) {
					mc(table, startRow, endRow, col + 1);
				}
			} else {
				mc(table, startRow, i + 0, col + 1);
				/**modify by wuxiao start**/
				
				mc(table, i + 1, endRow, 0);
				break;
				/**modify by wuxiao end**/
			}
		}
	}
	
	public String generateImages(List<Img> imgs){
		if(imgs==null) return "";
		StringBuffer sb=new StringBuffer();
		
		for(Img img : imgs){
			sb.append("<img src='cid:");
			sb.append(img.getCid());
			sb.append("' /><br>");
		}
		
		return sb.toString();
	}
}
