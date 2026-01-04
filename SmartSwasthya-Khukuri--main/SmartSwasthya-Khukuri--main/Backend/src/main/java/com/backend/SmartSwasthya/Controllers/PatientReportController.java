package com.backend.SmartSwasthya.Controllers;

import com.backend.SmartSwasthya.Models.PatientReport;
import com.backend.SmartSwasthya.Services.PatientReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/patient-reports")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class PatientReportController {

    private final PatientReportService patientReportService;

    @Autowired
    public PatientReportController(PatientReportService patientReportService) {
        this.patientReportService = patientReportService;
    }

    @PostMapping("/upload")
    public ResponseEntity<PatientReport> uploadPatientReport(
            @RequestParam("patientId") Long patientId,
            @RequestParam("reportType") String reportType,
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "uploadedBy", required = false) String uploadedBy) {
        try {
            PatientReport report = patientReportService.uploadReport(patientId, reportType, file, uploadedBy);
            return new ResponseEntity<>(report, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        } catch (RuntimeException e) {
            // Catch more general runtime errors, e.g., Cloudinary upload failure
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to upload report: " + e.getMessage(), e);
        }
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<PatientReport>> getReportsByPatientId(@PathVariable Long patientId) {
        try {
            List<PatientReport> reports = patientReportService.getReportsByPatientId(patientId);
            if (reports.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content if no reports found for patient
            }
            return new ResponseEntity<>(reports, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error fetching patient reports.", e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PatientReport> getReportById(@PathVariable Long id) {
        return patientReportService.getReportById(id)
                .map(report -> new ResponseEntity<>(report, HttpStatus.OK))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Patient report not found with ID: " + id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReport(@PathVariable Long id) {
        try {
            if (patientReportService.deleteReport(id)) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Patient report not found with ID: " + id);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error deleting patient report.", e);
        }
    }
}