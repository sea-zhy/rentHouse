package com.qf.landlord.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
public class FileUploadAndDownController {

    @RequestMapping("uploadIcon")
    public Map<String,Object> uploadIcon(MultipartFile dropzFile, HttpServletRequest request) throws IOException {
        Map<String,Object> map = new HashMap<>();
        String filePathName = request.getSession().getServletContext().getRealPath("/static/upload");
        File filePath = new File(filePathName);
        if(!filePath.exists()){
            filePath.mkdirs();
        }

        String fileName = dropzFile.getOriginalFilename();
        String fileNameSuffix = fileName.substring(fileName.lastIndexOf("."));
        String newFileName = UUID.randomUUID()+fileNameSuffix;
        File destFile = new File(filePath,newFileName);
        if(!destFile.exists()){
            destFile.createNewFile();
        }
        dropzFile.transferTo(destFile);
        newFileName = "http://localhost:8080/static/upload/"+newFileName;
        map.put("fileName",newFileName);
        return map;
    }

}
