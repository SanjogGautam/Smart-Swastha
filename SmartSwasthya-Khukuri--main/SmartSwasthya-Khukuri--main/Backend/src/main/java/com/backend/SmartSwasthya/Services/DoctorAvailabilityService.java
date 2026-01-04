package com.backend.SmartSwasthya.Services;

import com.backend.SmartSwasthya.Models.Doctor;
import com.backend.SmartSwasthya.Models.DoctorAvailability;
import com.backend.SmartSwasthya.Repository.DoctorAvailabilityRepository;
import com.backend.SmartSwasthya.Repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class DoctorAvailabilityService {

    private final DoctorAvailabilityRepository availabilityRepository;
    private final DoctorRepository doctorRepository;

    @Autowired
    public DoctorAvailabilityService(DoctorAvailabilityRepository availabilityRepository, DoctorRepository doctorRepository) {
        this.availabilityRepository = availabilityRepository;
        this.doctorRepository = doctorRepository;
    }

    @Transactional
    public DoctorAvailability createAvailability(DoctorAvailability availability, Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found with ID: " + doctorId));
        availability.setDoctor(doctor);
        availability.setBooked(false); // Ensure new slots are not booked by default
        return availabilityRepository.save(availability);
    }

    @Transactional(readOnly = true)
    public List<DoctorAvailability> getAvailableSlotsForDoctorAndDate(Long doctorId, LocalDate date) {
        // Optional: Validate doctor existence
        // doctorRepository.findById(doctorId).orElseThrow(() -> new IllegalArgumentException("Doctor not found with ID: " + doctorId));
        return availabilityRepository.findByDoctorIdAndAvailableDateAndIsBookedFalse(doctorId, date);
    }

    @Transactional(readOnly = true)
    public List<DoctorAvailability> getAllSlotsForDoctorAndDate(Long doctorId, LocalDate date) {
        // For admin/management to see all slots, even booked ones
        return availabilityRepository.findByDoctorIdAndAvailableDate(doctorId, date);
    }

    @Transactional(readOnly = true)
    public Optional<DoctorAvailability> getAvailabilityById(Long id) {
        return availabilityRepository.findById(id);
    }

    @Transactional
    public Optional<DoctorAvailability> updateAvailability(Long id, DoctorAvailability availabilityDetails) {
        return availabilityRepository.findById(id).map(existingAvailability -> {
            existingAvailability.setAvailableDate(availabilityDetails.getAvailableDate());
            existingAvailability.setStartTime(availabilityDetails.getStartTime());
            existingAvailability.setEndTime(availabilityDetails.getEndTime());
            existingAvailability.setBooked(availabilityDetails.isBooked()); // Allow updating booked status (e.g., for cancellation)
            // Doctor cannot be changed for an existing slot
            return availabilityRepository.save(existingAvailability);
        });
    }

    @Transactional
    public boolean deleteAvailability(Long id) {
        if (availabilityRepository.existsById(id)) {
            // Check if slot is booked before deleting
            DoctorAvailability slot = availabilityRepository.findById(id).get();
            if (slot.isBooked()) {
                // You might throw an exception here or handle deletion of linked appointment first
                throw new IllegalStateException("Cannot delete a booked time slot. Cancel the associated appointment first.");
            }
            availabilityRepository.deleteById(id);
            return true;
        }
        return false;
    }
}