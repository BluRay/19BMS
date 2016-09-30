package com.byd.erpit.tools.email;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.one2team.highcharts.server.export.ExportType;
import org.one2team.highcharts.server.export.HighchartsExporter;
import org.one2team.highcharts.shared.ChartOptions;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.util.ResourceUtils;

import com.byd.erpit.tools.email.EmailSender.Img;
import com.byd.erpit.tools.email.EmailSender.TableTable;
import com.byd.erpit.tools.email.EmailSender.TableTable.TdTd;

import examples.SamplesFactory;

public class MailSenderServiceImp1 extends EmailSupport implements  MailSenderService {
	private static final Log log = LogFactory.getLog(MailSenderServiceImp1.class);
	private JavaMailSender mailSender;
	private String defaultFrom;
	private int autoComminute = 50;
	
	public void send(String to, String subject, String content) {
		log.info("開始發送郵件");
		 MimeMessage mime = mailSender.createMimeMessage();
		 //SimpleMailMessage message = new SimpleMailMessage();  
		 MimeMessageHelper helper;  
        try {  
             helper = new MimeMessageHelper(mime,true,"utf-8");  
             if(defaultFrom != null)helper.setFrom(defaultFrom);  
             helper.setTo(parseAddress(to));  
             helper.setSubject(subject);  
             //String templet = getTempletInner();
             helper.setText(content,true);  
         } catch (MessagingException e) {  
             throw new UnsupportedOperationException("發送郵件失敗!",e);
         }  		 
	      mailSender.send(mime);  
		  log.info("發送郵件成功");
		
	}
	
	public void send(EmailSender emailSender) {
		log.info("開始發送郵件");
		InternetAddress[] toAddress = parseAddress(emailSender.getTo());
		if(toAddress.length <= autoComminute){
			sendWithEmailSender(emailSender, toAddress);
		}else{
			InternetAddress[] newAddress;
			int count = (int)Math.ceil((float)toAddress.length / (float)autoComminute);			
			log.info("收件人總數"+toAddress.length+",分"+count+"批發送,每批 "+autoComminute+" 個");
			for(int i = 0; i < count; i++){
				newAddress = new InternetAddress[autoComminute];
				for(int j = i * autoComminute,n = 0; j <  autoComminute; j++,n++){
					if(j > toAddress.length ) break;
					newAddress[n] = toAddress[j];
				}
				log.info("第"+(i+1)+"批 ==> "+newAddress);
				sendWithEmailSender(emailSender, newAddress);
			}
		}
		log.info("發送郵件成功");
	}
	
	private void sendWithEmailSender(EmailSender emailSender,InternetAddress[] toAddress){
		MimeMessage mime = mailSender.createMimeMessage();
		 //SimpleMailMessage message = new SimpleMailMessage();  
		 MimeMessageHelper helper;  
       try {  
            helper = new MimeMessageHelper(mime,true,this.getEncode());  
            if(emailSender.getFrom()!=null){
           	 helper.setFrom(emailSender.getFrom());  
            }else{
           	 if(defaultFrom != null)helper.setFrom(defaultFrom);  
            }
            helper.setTo(toAddress);  
            helper.setCc(parseAddress(emailSender.getCc()));
            helper.setBcc(parseAddress(emailSender.getBcc()));
            helper.setSubject(emailSender.getSubject());  
            String templet = getTempletInner();
            templet = setParam(templet, emailSender.getParam());
            templet = templet.replace("${title}", emailSender.getSubject()==null?"":emailSender.getSubject());
            templet = templet.replace("${body}", emailSender.getContent()==null?"":emailSender.getContent());
            templet = templet.replace("${tables}", emailSender.getTables()==null?"":emailSender.getTables());
            templet = templet.replace("${imgs}", emailSender.getImgs1()==null?"":emailSender.getImgs1());
            log.info(">>>>>>>>>>>>>>>>>>>>>>>"+templet);
            helper.setText(/*emailSender.getParam().get("content").toString()*/EmailTemplet.mailHeader+templet+EmailTemplet.mailFooter,true);  
            
            /*MimeBodyPart image1 = new MimeBodyPart();  
            image1.setDataHandler(new DataHandler(new FileDataSource("F:\\22.jpg")));  //javamail jaf  
            image1.setContentID("yy.jpg");
            helper.getMimeMultipart().addBodyPart(image1);*/
            
            for(Img img : emailSender.getImgs()){
            	MimeBodyPart imagebodypart = new MimeBodyPart();  
            	imagebodypart.setDataHandler(new DataHandler(new FileDataSource(img.getFilepath())));  //javamail jaf  
            	imagebodypart.setContentID(img.getCid());
                helper.getMimeMultipart().addBodyPart(imagebodypart);
            }
            
            // log.info("設定附件!"+emailSender.getAttachments());          
            for(File file: emailSender.getAttachments()){
           	    helper.addAttachment(file.getName(), file);
            }
    		 
            log.info(">>>>>>>>>>>>>>>>>>>>>>>"+emailSender.getSubject());
    	    mailSender.send(mime);  
    	    log.info(">>>>>>>>>>>>>>>>>>>>>>>"+emailSender.getContent());
    	    
        } catch (Exception e) {
            throw new UnsupportedOperationException("發送郵件失敗!",e);
        } 
	}
	private String setParam(String  templetInner, Map<String, String> param){
		 Object[] o = param.keySet().toArray(); 
         for(int i = 0; i < o.length; i++){
        	 String key = o[i].toString();
        	 //log.info(key);
        	// log.info(param.get(key));
        	 templetInner = templetInner.replace("${"+key+"}", param.get(key)==null?"": param.get(key));
         }
         return templetInner;
	}
	public void setMailSender(JavaMailSender mailSender) {
		this.mailSender = mailSender;
	}

	public JavaMailSender getMailSender() {
		return mailSender;
	}

	public void setDefaultFrom(String defaultFrom) {
		this.defaultFrom = defaultFrom;
	}

	public String getDefaultFrom() {
		return defaultFrom;
	}

	public void setAutoComminute(int autoComminute) {
		this.autoComminute = autoComminute;
	}

	public int getAutoComminute() {
		return autoComminute;
	}
	
	public static void main(String[] args) throws Exception{
		MailSenderServiceImp1 mss = new MailSenderServiceImp1();
		
		JavaMailSenderImpl senderImpl = new JavaMailSenderImpl();
        // 设定 Mail Server
        senderImpl.setHost("smtp.byd.com");
        
        //SMTP验证时，需要用户名和密码
        senderImpl.setUsername("div19BMS@byd.com");
        senderImpl.setPassword("rhc3@kxrz");
        senderImpl.setPort(25);
        mss.setMailSender(senderImpl);
        mss.setDefaultFrom("div19BMS@byd.com");
        //mss.send("duan.qiling@byd.com", "测试", "54321");
		
		mss.setTemplet("classpath:com/byd/erpit/tools/email/emailTemplet.html");
		mss.setEncode("utf-8");
		
		EmailSender emailSender = new EmailSender();
		emailSender.setTo("wu.xiao1@byd.com;duan.qiling@byd.com;zeng.ni@byd.com;jiang.pei1@byd.com;liu.hongpu@byd.com;dong.ping@byd.com;huang.hua6@byd.com;zhu.yunfeng@byd.com");
		emailSender.setFrom("div19BMS@byd.com");
		//emailSender.setContent("http://10.23.1.61:8080/19bms/login.jsp");
		emailSender.getParam().put("content", "请访问 http://10.23.1.61:8080/19bms/productionReport!dailyReport.action 查看详情。");
		emailSender.getParam().put("maintitle", "生产报表");
		//Date d=new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		emailSender.getParam().put("subtitle", sdf.format(getYesterday()));
		emailSender.setSubject("测试邮件");
		
		List<File> attachments = new ArrayList<File>();
		attachments.add(ResourceUtils.getFile("file:F:/22.jpg"));
		attachments.add(ResourceUtils.getFile("file:E:/eula.3082.txt"));
		emailSender.setAttachments(attachments);
		
		// This executable expects an export directory as input
		File exportDirectory = new File ("F:\\");
				
		final SamplesFactory highchartsSamples = SamplesFactory.getSingleton ();
				
		// ====================================================================
		// ChartOptions creation
		// ----------------------
		//  The createHighchartsDemoColumnBasic method describes the creation of 
		//   a java chartOption. It is a java equivalent to javascript Highcharts sample
		//   (see http://highcharts.com/demo/column-basic)
		ChartOptions chartOptions1 = highchartsSamples.createColumnBasic ();

		// ====================================================================
		// Chart export
		// ----------------
		// Inputs :
		//    1. chartOptions : the java ChartOptions to be exported,
		//    2. exportFile  : file to export to.
		HighchartsExporter<ChartOptions> pngExporter = ExportType.png.createExporter ();
		pngExporter.export (chartOptions1, null, new File (exportDirectory, "column-basic.png"));
		
		List<Img> imgs = new ArrayList<Img>();
		Img img = emailSender.new Img();
		img.setCid("test");
		img.setFilepath("f://column-basic.png");
		imgs.add(img);
		
		ChartOptions chartOptions3 = highchartsSamples.createTimeDataWithIrregularIntervals ();
		final HighchartsExporter<ChartOptions> jpegExporter = ExportType.jpeg.createExporter ();
		jpegExporter.export (chartOptions3, null, new File (exportDirectory, "time-data-with-irregular-intervals.jpeg"));
		
		Img img1 = emailSender.new Img();
		img1.setCid("test1");
		img1.setFilepath("f://time-data-with-irregular-intervals.jpeg");
		imgs.add(img1);
		
		emailSender.setImgs(imgs);
		
		List<TableTable> tables = new ArrayList<TableTable>();
		
		TableTable tableX = emailSender.new TableTable();
		List<TdTd> theadX = new ArrayList<TdTd>();
		
		TdTd td1 = tableX.new TdTd();
		td1.setText("张三");
		theadX.add(td1);
		
		TdTd td2 = tableX.new TdTd();
		td2.setText("李四");
		td2.setColspan(2);
		theadX.add(td2);
		
		TdTd td3 = tableX.new TdTd();
		td3.setText("王五");
		theadX.add(td3);
		
		tableX.setThead(theadX);
		
		List<List<TdTd>> tbodyX = new ArrayList<List<TdTd>>();
		List<TdTd> tr1 = new ArrayList<TdTd>();
		
		TdTd td4 = tableX.new TdTd();
		td4.setText("100");
		tr1.add(td4);
		
		TdTd td5 = tableX.new TdTd();
		td5.setText("88");
		//td5.setColspan(1);
		tr1.add(td5);
		
		TdTd td6 = tableX.new TdTd();
		td6.setText("59");
		tr1.add(td6);
		
		TdTd td7 = tableX.new TdTd();
		td7.setText("59");
		tr1.add(td7);
		
		tbodyX.add(tr1);
		
		List<TdTd> tr2 = new ArrayList<TdTd>();
		
		TdTd td8 = tableX.new TdTd();
		td8.setText("8");
		td8.setRowspan(2);
		tr2.add(td8);
		
		TdTd td9 = tableX.new TdTd();
		td9.setText("9");
		//td5.setColspan(1);
		tr2.add(td9);
		
		TdTd td10 = tableX.new TdTd();
		td10.setText("10");
		tr2.add(td10);
		
		TdTd td11 = tableX.new TdTd();
		td11.setText("11");
		tr2.add(td11);
		
		tbodyX.add(tr2);
		
		List<TdTd> tr3 = new ArrayList<TdTd>();
		
		TdTd td12 = tableX.new TdTd();
		td12.setText("12");
		tr3.add(td12);
		
		TdTd td13 = tableX.new TdTd();
		td13.setText("13");
		//td5.setColspan(1);
		tr3.add(td13);
		
		TdTd td14 = tableX.new TdTd();
		td14.setText("14");
		tr3.add(td14);
		
		/*TdTd td15 = tableX.new TdTd();
		td15.setText("15");
		tr3.add(td15);*/
		
		tbodyX.add(tr3);
		
		tableX.setTbody(tbodyX);
		tables.add(tableX);

		for(int i=0;i<2;i++){
			TableTable table = emailSender.new TableTable();
			List<TdTd> thead = new ArrayList<TdTd>();
			//6列
			for(int t=0;t<6;t++){
				TdTd td = table.new TdTd();
				td.setText("表头"+t);
				thead.add(td);
			}
			table.setThead(thead);
			
			List<List<TdTd>> tbody = new ArrayList<List<TdTd>>();
			//10行
			for(int j=0;j<10;j++){
				List<TdTd> tr = new ArrayList<TdTd>();
				//6列
				for(int k=0;k<6;k++){
					TdTd td = table.new TdTd();
					td.setText("第"+j+"行数据"+k);
					tr.add(td);
				}
				tbody.add(tr);
			}
			table.setTbody(tbody);
			
			tables.add(table);
		}
		
		emailSender.setTables(tables);
		
		mss.send(emailSender);
		
		//删除临时图片
		new File("f://column-basic.png").delete();
		new File("f://time-data-with-irregular-intervals.jpeg").delete();
	}
	
	public static Date getYesterday() {
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DATE, -1); //得到前一天
		Date date = calendar.getTime();
		return date;
	}
}
