package com.backend.SmartSwasthya.Models;

import com.fasterxml.jackson.annotation.JsonBackReference; // Import
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

/**
 * Represents a medical report for a Patient.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "patient_reports")
public class PatientReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Link back to the Patient.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false) // Ensure patient_id is not null
    @JsonBackReference("patient-medicalReports") // Back reference to Patient
    private Patient patient;

    private String reportType; // e.g., "Blood Test", "X-Ray"
    private String reportUrl; // URL to the report file/document

    // Optional: To store the public_id from Cloudinary for later deletion
    @Column(name = "cloudinary_public_id")
    private String cloudinaryPublicId;

    private String uploadedBy; // e.g., "Lab Technician", "Doctor Name"
    private LocalDate uploadedDate; // Changed to LocalDate for proper date handling.
}