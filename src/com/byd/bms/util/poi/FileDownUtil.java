/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.byd.bms.util.poi;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.RandomAccessFile;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.byd.bms.util.IoUtils;

/**
 * 主要用于文件下载
 */
public class FileDownUtil {
	private static final Log log = LogFactory.getLog(FileDownUtil.class);
	private static Map<String,String> fileContextMap;
	private static final String defaultContextString = "application/octet-stream";
	public static final String IN_LINE = "inline";
	public static final String ATTACHMENT = "attachment";

	/**
	 * The alert message for the specific bulletin file not found.
	 * 
	 * @param request
	 *          HttpServletRequest
	 * @param response
	 *          HttpServletResponse
	 * @param errorMsg
	 *          String
	 * @throws IOException
	 * @throws ServletException
	 */

	public static void fileNotFound(HttpServletRequest request,
			HttpServletResponse response, String errorMsg) throws IOException,
			ServletException {
		request.getRequestDispatcher("/noCache.jsp").include(request, response);
		StringBuffer buffer = new StringBuffer(
				"<html>\n<head>\n<title>ERROR</title></head><body>");
		buffer.append(errorMsg);
		buffer.append("\n</body>\n</html>");
		response.getWriter().println(buffer.toString());
	}
	/**
	 * 根据地址参数下载文件（会开启IE界面）
	 * @param request
	 * @param response
	 * @param location 文件在服务器中的地址
	 * @param fileName 保存默认的文件名
	 * @param fileNameEncoding 名称采用的编码，请使用常量类中参数
	 * @throws IOException
	 * @throws ServletException
	 */
	public static void inline(HttpServletRequest request,
			HttpServletResponse response, String location, String fileName,
			String fileNameEncoding) throws IOException, ServletException {
		openFile(request, response, location, fileName, fileNameEncoding, IN_LINE);
	}
	/**
	 * 附档形式下载（不会开始IE界面）
	 * @param request
	 * @param response
	 * @param location 使用filepath，文件在服务器上的绝对位置
	 * @param fileName
	 * @param fileNameEncoding
	 * @throws IOException
	 * @throws ServletException
	 */
	public static void attachment(HttpServletRequest request,
			HttpServletResponse response, String location, String fileName,
			String fileNameEncoding) throws IOException, ServletException {
		openFile(request, response, location, fileName, fileNameEncoding,
				ATTACHMENT);
	}
	/**
	 * 文件下载的具体实现方法
	 * @param request
	 * @param response
	 * @param location
	 * @param fileName
	 * @param fileNameEncoding
	 * @param openType
	 * @throws IOException
	 * @throws ServletException
	 */
	private static void openFile(HttpServletRequest request,
			HttpServletResponse response, String location, String fileName,
			String fileNameEncoding, String openType) throws IOException,
			ServletException { 
		String errorMsg = null;
		File file = new File(location);
		if (file.exists()) {
			setDownloadHeader(request, response, fileName, openType,
					fileNameEncoding, errorMsg);
			if (StringUtils.isEmpty(errorMsg)) {
				IOUtils.copy(new FileInputStream(file), response.getOutputStream());
				response.getOutputStream().flush();
				return;
			}
		} else {
			errorMsg = "The specific file (" + fileName + "),  not existed!";
			log.error(errorMsg);
		}
		fileNotFound(request, response, errorMsg);
	}
	/**
	 * 下载文件的主方法（此方法文件将显示在IE内部，使用此方法IE会开启一个会话界面）
	 * @param request
	 * @param response
	 * @param bytes
	 * @param fileName
	 * @param fileNameEncoding
	 * @throws IOException
	 * @throws ServletException
	 */
	public static void inline(HttpServletRequest request,
			HttpServletResponse response, byte[] bytes, String fileName,
			String fileNameEncoding) throws IOException, ServletException {
		openByteArray(request, response, bytes, fileName, fileNameEncoding, IN_LINE);
	}
	/**
	 * 调用附件下载（不会开启IE界面）
	 * @param request
	 * @param response
	 * @param bytes
	 * @param fileName
	 * @param fileNameEncoding
	 * @throws IOException
	 * @throws ServletException
	 */
	public static void attachment(HttpServletRequest request,
			HttpServletResponse response, byte[] bytes, String fileName,
			String fileNameEncoding) throws IOException, ServletException {
		openByteArray(request, response, bytes, fileName, fileNameEncoding,
				ATTACHMENT);
	}

	private static void openByteArray(HttpServletRequest request,
			HttpServletResponse response, byte[] bytes, String fileName,
			String fileNameEncoding, String openType) throws IOException,
			ServletException {
		String errorMsg = null;
		setDownloadHeader(request, response, fileName, openType, fileNameEncoding,
				errorMsg);
		if (StringUtils.isEmpty(errorMsg)) {
			// log.debug("==== bytes.length ==>" + bytes.length);
			response.getOutputStream().write(bytes);
			response.getOutputStream().flush();
		} else {
			fileNotFound(request, response, errorMsg);
		}
	}

	private static void setDownloadHeader(HttpServletRequest request,
			HttpServletResponse response, String fileName, String openType,
			String fileNameEncoding, String errorMsg) {
		if (request.getProtocol().compareTo("HTTP/1.0") == 0) {
			response.setHeader("Pragma", "No-cache");
		} else if (request.getProtocol().compareTo("HTTP/1.1") == 0) {
			response.setHeader("Cache-Control", "No-cache");
		}

		response.setDateHeader("Expires", 0);
		// 使用MimetypesFileTypeMap 自行以副檔名回覆相對應的MIME_TYPE
		String contentType = getContentType(fileName);
		if ("application/octet-stream".equals(contentType)) {
			//log.error("file " + fileName + " mimetype mapping not found. "
			//		+ "Please add new ContentType record in /META-INF/mime.types");
		} 
		response.setContentType(contentType); 

		// 判對MSIE 使用URLEncoder.encode() Firefox 使用BCodec.encode()
		if (request.getHeader("User-Agent").indexOf("MSIE") != -1) {
			try {
				response.setHeader("Content-Disposition", "" + openType
						+ "; filename=\"" + URLEncoder.encode(fileName, fileNameEncoding)
						+ "\"");
			} catch (UnsupportedEncodingException ex) {
				errorMsg = "Encode file name (" + fileName + ") occur errors!";
				log.error(errorMsg, ex);
			}
		} else {
			try {
				response.setHeader("Content-Disposition", "" + openType
						+ "; filename=\"" + URLEncoder.encode(fileName, fileNameEncoding)
						+ "\"");
			} catch (UnsupportedEncodingException ex) {
				errorMsg = "Encode file name (" + fileName + ") occur errors!";
				log.error(errorMsg, ex);
			}
		}
	}
	
	/**
	 * ie context 设置
	 * @param fileName
	 * @return
	 */
	public static String getContentType(String fileName){
		if(fileContextMap==null){
			fileContextMap = new HashMap<String,String>();
			fileContextMap.put("pdf", "application/pdf");
			fileContextMap.put("xls", "application/vnd.ms-excel");
			fileContextMap.put("doc", "application/msword");
			fileContextMap.put("ppt", "application/vnd.ms-powerpoint");
			fileContextMap.put("odt", "application/vnd.oasis.opendocument.text");
			fileContextMap.put("ott", "application/vnd.oasis.opendocument.text-template");
			fileContextMap.put("oth", "application/vnd.oasis.opendocument.text-web");
			fileContextMap.put("odm", "application/vnd.oasis.opendocument.text-master");
			fileContextMap.put("odg", "application/vnd.oasis.opendocument.graphics");
			fileContextMap.put("otg", "application/vnd.oasis.opendocument.graphics-template");
			fileContextMap.put("odp", "application/vnd.oasis.opendocument.presentation");
			fileContextMap.put("otp", "application/vnd.oasis.opendocument.presentation-template");
			fileContextMap.put("ods", "application/vnd.oasis.opendocument.spreadsheet");
			fileContextMap.put("ots", "application/vnd.oasis.opendocument.spreadsheet-template");
			fileContextMap.put("odc", "application/vnd.oasis.opendocument.chart");
			fileContextMap.put("odf", "application/vnd.oasis.opendocument.formula");
			fileContextMap.put("odb", "application/vnd.oasis.opendocument.database");
			fileContextMap.put("odi", "application/vnd.oasis.opendocument.image");
			fileContextMap.put("oxt", "application/vnd.openofficeorg.extension");
			fileContextMap.put("igs", "application/x-igs");
			fileContextMap.put("prt", "application/x-prt");
			fileContextMap.put("zip", "application/zip");
			fileContextMap.put("rar", "application/rar");
			fileContextMap.put("image/tif", "tif");
			fileContextMap.put("image/tif", "tiff");
		}
		String contextString = fileContextMap.get(IoUtils.getFileType(fileName).toLowerCase());
		if (contextString==null) {
			return defaultContextString;
		}
		return contextString;
	}
	
    //网络共享方法
    public String getAttachName(String file_name) {
        if(file_name==null) return "";
        file_name = file_name.trim();
        int iPos = 0;
        iPos = file_name.lastIndexOf("\\");
        if(iPos>-1){
            file_name = file_name.substring(iPos+1);
        }
        iPos = file_name.lastIndexOf("/");
        if(iPos>-1){
            file_name = file_name.substring(iPos+1);
        }
        return file_name;
    }
 
    //网络共享方法
    public  String toUtf8String(String s) {
        StringBuffer sb = new StringBuffer();
        for (int i=0;i<s.length();i++) {
            char c = s.charAt(i);
            if(c >= 0 && c <= 255){
                sb.append(c);
            }else{
                byte[] b;
                try {
                    b = Character.toString(c).getBytes("utf-8");
                } catch (Exception ex) {
                    System.out.println(ex);
                    b = new byte[0];
                }
                for (int j = 0; j < b.length; j++) {
                    int k = b[j];
                    if (k < 0) k += 256;
                    sb.append("%" + Integer.toHexString(k).toUpperCase());
                }
            }
        }
        String s_utf8 = sb.toString();
        sb.delete(0,sb.length());
        sb.setLength(0);
        sb = null;
        return s_utf8;
    }
    
    
    /**
     * 用于显示图片文件
     * @param request
     * @param response
     * @param fileName
     * @param filePath
     * @throws Exception
     */
    public void showImageFile(HttpServletRequest request,HttpServletResponse response,String fileName,String filePath) throws Exception{
        response.setContentType("application/octet-stream");
        response.setHeader("Accept-Ranges", "bytes");
        response.setHeader("Content-Disposition", "attachment; filename=\""+new String(fileName.getBytes(),"ISO-8859-1")+"\"");
        OutputStream os=null;
        FileChannel in=null;
        RandomAccessFile raf=null;
        try {
            os=response.getOutputStream();
            raf=new RandomAccessFile(filePath, "r");
            in=raf.getChannel();
            long position=0;
            Long fileLength=raf.length();
            //从客户端获取请求下载字节的开始位置
            if(request.getHeader("Range")!=null){
                response.setStatus(response.SC_PARTIAL_CONTENT);
                position=Long.parseLong(request.getHeader("Range").replaceAll("bytes=", "").replaceAll("-", ""));
            }
            response.setHeader("Content-Length", Long.toString(fileLength-position));
            if(position!=0){
                StringBuffer buf=new StringBuffer();
                buf.append("bytes ");
                buf.append(position);
                buf.append("-");
                buf.append(fileLength-1);
                buf.append("/");
                buf.append(fileLength);
                response.setHeader("Content-Range", buf.toString());
            }
            in.position(position);
            ByteBuffer buffer=ByteBuffer.allocate(1024);
            while(in.read(buffer) !=-1){
                buffer.flip();
                os.write(buffer.array());
                os.flush();
                buffer.clear();
            }
        } catch (RuntimeException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            throw e;
        }finally{
            if(os!=null)
            os.close();
            if(in!=null)
            in.close();
            if(raf!=null)
            raf.close();
        }
    }
    

}
