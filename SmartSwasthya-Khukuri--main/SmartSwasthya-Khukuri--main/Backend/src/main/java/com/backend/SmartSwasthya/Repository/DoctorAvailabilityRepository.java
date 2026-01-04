package com.backend.SmartSwasthya.Repository;

import com.backend.SmartSwasthya.Models.DoctorAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DoctorAvailabilityRepository extends JpaRepository<DoctorAvailability, Long> {
    List<DoctorAvailability> findByDoctorIdAndAvailableDateAndIsBookedFalse(Long doctorId, LocalDate availableDate);
    List<DoctorAvailability> findByDoctorIdAndAvailableDate(Long doctorId, LocalDate availableDate); // For admin to see all slots
}