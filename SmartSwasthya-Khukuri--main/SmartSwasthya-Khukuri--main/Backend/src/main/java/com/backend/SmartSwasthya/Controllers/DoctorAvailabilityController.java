package com.backend.SmartSwasthya.Controllers;

import com.backend.SmartSwasthya.Models.DoctorAvailability;
import com.backend.SmartSwasthya.Services.DoctorAvailabilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/doctor-availabilities")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class DoctorAvailabilityController {

    private final DoctorAvailabilityService availabilityService;

    @Autowired
    public DoctorAvailabilityController(DoctorAvailabilityService availabilityService) {
        this.availabilityService = availabilityService;
    }

    @PostMapping
    public ResponseEntity<DoctorAvailability> createAvailability(@RequestBody DoctorAvailability availability, @RequestParam Long doctorId) {
        try {
            DoctorAvailability createdAvailability = availabilityService.createAvailability(availability, doctorId);
            return new ResponseEntity<>(createdAvailability, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error creating doctor availability.", e);
        }
    }

    // Endpoint for patients to find available slots (unbooked)
    @GetMapping("/available-slots")
    public ResponseEntity<List<DoctorAvailability>> getAvailableSlots(
            @RequestParam Long doctorId,
            @RequestParam LocalDate date) {
        try {
            List<DoctorAvailability> slots = availabilityService.getAvailableSlotsForDoctorAndDate(doctorId, date);
            if (slots.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT); // No available slots for this doctor/date
            }
            return new ResponseEntity<>(slots, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error fetching available slots.", e);
        }
    }

    // Endpoint for admins/doctors to see all slots (booked and unbooked)
    @GetMapping
    public ResponseEntity<List<DoctorAvailability>> getAllSlots(
            @RequestParam Long doctorId,
            @RequestParam LocalDate date) {
        try {
            List<DoctorAvailability> slots = availabilityService.getAllSlotsForDoctorAndDate(doctorId, date);
            if (slots.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(slots, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error fetching all doctor slots.", e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorAvailability> getAvailabilityById(@PathVariable Long id) {
        return availabilityService.getAvailabilityById(id)
                .map(availability -> new ResponseEntity<>(availability, HttpStatus.OK))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Doctor availability not found with ID: " + id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DoctorAvailability> updateAvailability(@PathVariable Long id, @RequestBody DoctorAvailability availability) {
        try {
            return availabilityService.updateAvailability(id, availability)
                    .map(updatedAvailability -> new ResponseEntity<>(updatedAvailability, HttpStatus.OK))
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Doctor availability not found with ID: " + id));
        } catch (IllegalStateException | IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error updating doctor availability.", e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAvailability(@PathVariable Long id) {
        try {
            if (availabilityService.deleteAvailability(id)) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Doctor availability not found with ID: " + id);
        } catch (IllegalStateException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error deleting doctor availability.", e);
        }
    }
}