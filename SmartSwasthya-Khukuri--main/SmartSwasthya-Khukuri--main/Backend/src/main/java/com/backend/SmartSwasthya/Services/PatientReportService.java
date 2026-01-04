package com.backend.SmartSwasthya.Services;

import com.backend.SmartSwasthya.Models.Patient;
import com.backend.SmartSwasthya.Models.PatientReport;
import com.backend.SmartSwasthya.Repository.PatientReportRepository;
import com.backend.SmartSwasthya.Repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PatientReportService {

    private final PatientReportRepository patientReportRepository;
    private final PatientRepository patientRepository;
    private final CloudinaryImageService cloudinaryImageService;

    @Autowired
    public PatientReportService(
            PatientReportRepository patientReportRepository,
            PatientRepository patientRepository,
            CloudinaryImageService cloudinaryImageService) {
        this.patientReportRepository = patientReportRepository;
        this.patientRepository = patientRepository;
        this.cloudinaryImageService = cloudinaryImageService;
    }

    @Transactional // Ensure the transaction covers both upload and save
    public PatientReport uploadReport(Long patientId, String reportType, MultipartFile file, String uploadedBy) {
        // 1. Validate input parameters
        if (patientId == null) {
            throw new IllegalArgumentException("Patient ID cannot be null.");
        }
        if (reportType == null || reportType.trim().isEmpty()) {
            throw new IllegalArgumentException("Report type cannot be empty.");
        }
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Report file cannot be empty.");
        }

        // 2. Find the patient
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new IllegalArgumentException("Patient not found with ID: " + patientId));

        // 3. Upload file to Cloudinary
        Map<String, Object> uploadResult;
        try {
            uploadResult = cloudinaryImageService.upload(file);
            if (uploadResult == null || !uploadResult.containsKey("url") || !uploadResult.containsKey("public_id")) {
                throw new RuntimeException("Cloudinary upload failed: URL or public ID not returned.");
            }
        } catch (IOException e) { // Catch specific IOException for Cloudinary upload
            throw new RuntimeException("Failed to upload report file to Cloudinary: " + e.getMessage(), e);
        }

        String reportUrl = (String) uploadResult.get("url");
        String publicId = (String) uploadResult.get("public_id");

        // 4. Create a new PatientReport object
        PatientReport report = new PatientReport();
        report.setPatient(patient);
        report.setReportType(reportType);
        report.setReportUrl(reportUrl); // Set the Cloudinary URL
        report.setCloudinaryPublicId(publicId); // Store the public ID for deletion
        report.setUploadedBy(uploadedBy != null && !uploadedBy.trim().isEmpty() ? uploadedBy : "System");
        report.setUploadedDate(LocalDate.now());

        // 5. Save the report to the database
        return patientReportRepository.save(report);
    }

    @Transactional(readOnly = true)
    public List<PatientReport> getReportsByPatientId(Long patientId) {
        // Consider if you want to throw an error if patientId doesn't exist.
        // For now, findByPatientId will return empty list if no patient or no reports.
        return patientReportRepository.findByPatientId(patientId);
    }

    @Transactional(readOnly = true)
    public Optional<PatientReport> getReportById(Long id) {
        return patientReportRepository.findById(id);
    }

    @Transactional
    public boolean deleteReport(Long id) {
        return patientReportRepository.findById(id).map(report -> {
            String publicId = report.getCloudinaryPublicId();
            if (publicId != null && !publicId.isEmpty()) {
                try {
                    cloudinaryImageService.deleteImage(publicId); // Delete from Cloudinary
                } catch (IOException e) {
                    // Log the error but don't prevent database deletion if Cloudinary fails
                    System.err.println("Failed to delete report from Cloudinary (publicId: " + publicId + "): " + e.getMessage());
                    // Potentially throw a custom exception if Cloudinary deletion is critical
                }
            }
            patientReportRepository.deleteById(id); // Delete from database
            return true;
        }).orElse(false);
    }
}