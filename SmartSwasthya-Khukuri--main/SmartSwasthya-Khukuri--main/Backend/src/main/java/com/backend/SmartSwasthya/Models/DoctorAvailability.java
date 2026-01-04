package com.backend.SmartSwasthya.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "doctor_availabilities")
public class DoctorAvailability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    @JsonBackReference("doctor-availabilities")
    private Doctor doctor;

    @Column(nullable = false)
    private LocalDate availableDate;

    @Column(nullable = false)
    private LocalTime startTime;

    @Column(nullable = false)
    private LocalTime endTime;

    @Column(nullable = false)
    private boolean isBooked = false; // To mark if a slot is taken

    // An availability slot can be linked to one appointment once it's booked
    @OneToOne(mappedBy = "availableSlot", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private Appointment bookedAppointment;

    // You might also add a 'duration' or 'slotSize' if times are fixed (e.g., 30 min, 1 hr)
    // private int slotDurationMinutes;
}