package com.byd.bms.util;

import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipOutputStream;

import javax.imageio.ImageIO;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGImageEncoder;
 
/**
 * Author:Qingqing.cao
 * Date: Nov 10, 2009 9:04:30 AM
 * Desc:
 */
public class IoUtils {
	private static final Log log = LogFactory.getLog(IoUtils.class);
	private static int radomFileIndex=0;

    /**
     * 根據傳入的java.io.InputStream對象創建文件。
     * 
     * @param fileName
     *            新文件的名字
     * @param inStream
     *            用于創建新文件的java.io.InputStream對象
     * @param over
     *            如已有同名文件存在﹐是否覆蓋原文件(true-覆蓋﹐false-不覆蓋﹐自動在文件名后添加數字編號以未區別)
     * @throws IOException 讀寫文件時發生錯誤
     */
    public static void createFile(String fileName, InputStream inStream,
            boolean over) throws IOException {
        File file = new File(fileName);
        if (!over) {
            for (int i = 0; file.exists(); i++)
                file = new File(fileName + i);
        }

        BufferedOutputStream bos = new BufferedOutputStream(
                new FileOutputStream(file), 1024);
        BufferedInputStream bis = new BufferedInputStream(inStream, 1024);
        int c;
        try {
            while ((c = bis.read()) != -1)
                bos.write(c);
		} catch (Exception e) {
			log.info("创建文件出错 desc = "+ e.getMessage());
		}finally{
	        inStream.close();
	        bos.close();
	        bis.close();
		}
    }


    /**
     * 壓縮檔案。
     * @param zipFileName 將要產生的壓縮檔檔名
     * @param files 要被加入壓縮檔的檔案
     * @throws IOException 創建壓縮檔時發生異常
     */
    public static void zipFile(String zipFileName, String[] files)
            throws IOException {
        byte[] buf = new byte[1024];
        ZipOutputStream out = new ZipOutputStream(new FileOutputStream(
                zipFileName));
        for (int i = 0; i < files.length; i++) {
            FileInputStream in = new FileInputStream(files[i]);
            out.putNextEntry(new ZipEntry(files[i]));
            int len;
            while ((len = in.read(buf)) > 0) {
                out.write(buf, 0, len);
            }
            out.closeEntry();
            in.close();
        }
        out.close();
    }
    
    /**
     * 解壓縮檔案。
     * @param zipFileName 要被解壓縮的檔案名稱
     * @throws IOException 讀寫壓縮檔時發生異常
     */
    public static void unzipFile(String zipFileName)throws IOException {
        ZipFile zf = new ZipFile(zipFileName);
        for(Enumeration entries = zf.entries();entries.hasMoreElements();) {
            ZipEntry zipEntry = (ZipEntry)entries.nextElement();
            String zipEntryName = zipEntry.getName();
            OutputStream out = new FileOutputStream(zipEntryName);
            InputStream in = zf.getInputStream(zipEntry);
            byte[] buf = new byte[1024];
            int len;
            while((len = in.read(buf))>0) {
                out.write(buf, 0,len);
            }
            out.close();
            in.close();
        }
    }
    

    /**
     * 刪除指定的文件
     * 
     * @param fileName
     *            指定的文件名(可以是一個或用逗號隔開的多個)
     */
    public static void deleteFile(String fileName) {
        String[] names = fileName.split(",");
        IoUtils.deleteFile(names);
    }

    /**
     * 刪除指定的文件
     * @param files 指定的文件名
     */
    public static void deleteFile(String[] files){
        File file = null;
        for (int i = 0; i < files.length; i++) {
            file = new File(files[i]);
            if (file.exists())
                file.delete();
        }
    }
        
    /**
     * 刪除指定的文件
     * 
     * @param files
     *            要刪除的文件對象集合
     */
    public static void deleteFile(File[] files) {
        for (int i = 0; i < files.length; i++) {
            if (files[i].exists())
                files[i].delete();
        }
    }    
    /**
     * 取文件
     * @Author : CaoQingqing
     * @Date : Dec 25, 2009 9:55:32 PM
     * @param fileName
     * @return
     */
    public static File getFile(String fileName){
        File file  = new File(fileName);
    	if(file.exists()){
    		return file;
    	}
    	return null;
    }
    /**
     * 判断文件是否存在
     * @Author : CaoQingqing
     * @Date : Dec 24, 2009 11:01:02 AM
     * @param fileName
     * @return
     */
    public static boolean isFileExists(String fileName){
        File file  = new File(fileName);
    	return file.exists();
    }
    /**
     * 創建文件夾
     * @param folderPath
     */
    public static void createFolder(String path){
    	 File dirFile = null;   
         try {   
              dirFile = new File(path);   
             if (!(dirFile.exists()) && !(dirFile.isDirectory())) {   
                 boolean creadok = dirFile.mkdirs();   
                 if (creadok) {   
                      System.out.println(" ok:创建文件夹成功！ ");   
                  } else {   
                      System.out.println(" err:创建文件夹失败！ " + path);   
                  }   
              }   
          } catch (Exception e) {   
              log.info(e);   
          }   
    } 
    /**
     * 复制文件
     * @Author : CaoQingqing
     * @Date : Dec 25, 2009 9:34:27 PM
     * @param oldPath
     * @param newPath
     * @param oldName 要复制的文件
     * @param newName 新文件名
     */
    public static void copyFile(String oldPath, String newPath,String oldName,String newName) { 
        try { 
            int bytesum = 0; 
            int byteread = 0; 
            File oldfile = new File(oldPath+oldName); 
            if (oldfile.exists()) { //文件存在时 
            	createFolder(newPath);
                InputStream inStream=null; //读入原文件 
                FileOutputStream fs=null ; 
                try{
                	inStream = new FileInputStream(oldPath+oldName);
                	fs = new FileOutputStream(newPath+newName);
	                byte[] buffer = new byte[1444]; 
	                int length; 
	                while ( (byteread = inStream.read(buffer)) != -1) { 
	                    bytesum += byteread; //字节数 文件大小 
	                    fs.write(buffer, 0, byteread); 
	                } 
                }catch (Exception e) {
					log.info("copy file error! desc = "+ e.getMessage());
				}finally{
	                if(inStream!=null)inStream.close(); 
	                if(fs!=null)fs.close();
				}
            } else{
            	log.info("文件不存在");
            }
        } 
        catch (Exception e) { 
            System.out.println("复制单个文件操作出错"); 
            e.printStackTrace(); 

        } 

    } 
    /**
     * 取文件的後綴名
     * @param pathName
     * @return
     */   
    public static String getFileType(String pathName){
        int startIndex = pathName.lastIndexOf(".");
        if(startIndex<0) startIndex=0;
        int endIndex = pathName.length();
        return pathName.substring(startIndex+1,endIndex);
    }
	/**
	 * 取随机文件名称
	 * @Author : CaoQingqing
	 * @Date : Dec 25, 2009 9:45:58 PM
	 * @return
	 */
	public static String getRadomFileName(String fileName){
		if(radomFileIndex>999)radomFileIndex=0;
		radomFileIndex++;
		String fileTypeString = getFileType(fileName);
		java.util.Date date=new java.util.Date(); 
		java.text.DateFormat ft = new java.text.SimpleDateFormat("yyyyMMddHHmmssSSS");
		String dateStr = ft.format(date);
		return (dateStr+"_"+radomFileIndex+"."+fileTypeString);
	}
	/**
	 * 图片压缩
	 * @Author : CaoQingqing
	 * @Date : May 17, 2010 10:52:49 AM
	 * @param inPath 原文件路径	
	 * @param inf 原文件名称
	 * @param outPath 输出路径
	 * @param outf 输出名称
	 * @param maxSize 最大ＳＩＺＥ
	 */
	public static void imageSizer(String inPath,String inf,String outPath,String outf,int maxSize) {
	  	File file = new File(inPath+inf);
		String fileName = file.getName();
		BufferedImage bufferedimage = null;
		BufferedImage bufferedimage1 = null;
		FileOutputStream fileoutputstream = null;
		try {

			bufferedimage = ImageIO.read(file);
			int width = bufferedimage.getWidth(null);
			int height = bufferedimage.getHeight(null);
			int newWidth=width;
			int newHeight = height;
			if(width<maxSize && height<maxSize){
				IoUtils.copyFile(inPath,outPath,inf, outf);
			}else{
				if(width>height){
					if(width>maxSize){
						newWidth=maxSize;
						newHeight = height*newWidth/width;
					}
				}else if(height>maxSize){
					newHeight=maxSize;
					newWidth = width*newHeight/height;				
				}
				bufferedimage1 = new BufferedImage(newWidth, newHeight, 1);
				bufferedimage1.getGraphics().drawImage(bufferedimage, 0, 0, newWidth, newHeight,
						null);
				fileoutputstream = new FileOutputStream(outPath+outf);
				JPEGImageEncoder jpegimageencoder = JPEGCodec
						.createJPEGEncoder(fileoutputstream);
				jpegimageencoder.encode(bufferedimage1);
			}
		} catch (Exception exception) {
			System.out.println(exception);
		} finally {
			if (fileoutputstream != null){
				try {
					fileoutputstream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
}