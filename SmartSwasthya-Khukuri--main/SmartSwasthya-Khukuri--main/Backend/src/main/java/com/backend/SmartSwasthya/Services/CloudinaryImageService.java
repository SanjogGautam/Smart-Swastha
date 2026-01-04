package com.backend.SmartSwasthya.Services;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Map;

public interface CloudinaryImageService {
    Map<String, Object> upload(MultipartFile file) throws IOException;
    void deleteImage(String publicId) throws IOException; // Method to delete from Cloudinary
}