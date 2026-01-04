package com.backend.SmartSwasthya.Controllers;


import com.backend.SmartSwasthya.Services.CloudinaryImageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/cloudinary/upload")
public class CloudinaryUploadController {

    @Autowired
    private CloudinaryImageServiceImpl service ;

    @PostMapping
    public ResponseEntity<Map> uploadfile(@RequestParam("Image") MultipartFile file) {
        Map data = null;
        try {
            data = this.service.upload(file);
        } catch (IOException e) {
            throw new RuntimeException("This image canot be uploaded"+e);
        }
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

}
