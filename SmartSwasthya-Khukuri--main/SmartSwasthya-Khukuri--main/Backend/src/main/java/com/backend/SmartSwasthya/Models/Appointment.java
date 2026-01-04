package com.backend.SmartSwasthya.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "appointment_time", nullable = false)
    private LocalDateTime appointmentTime; // The date and time of the appointment

    @Column(name = "reason", columnDefinition = "TEXT")
    private String reason; // Reason for the appointment

    // Link directly to Patient (booked by)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    @JsonBackReference("patient-appointments")
    private Patient patient;

    // Link directly to Department
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id", nullable = false)
    @JsonBackReference("department-appointments")
    private Department department;

    // Link directly to Doctor (the specific doctor chosen)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    @JsonBackReference("doctor-appointments")
    private Doctor doctor;

    // Link to the specific DoctorAvailability slot that was booked
    @OneToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "available_slot_id", unique = true, nullable = false) // Each slot can only be used once
    private DoctorAvailability availableSlot;

    // Optional: Could also directly link to Hospital if you want to query appointments per hospital easily
    // But it's already implicitly linked via Department -> Hospital
    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "hospital_id", nullable = false)
    // private Hospital hospital;
}