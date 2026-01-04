package com.backend.SmartSwasthya.Controllers;

import com.backend.SmartSwasthya.Models.Appointment;
import com.backend.SmartSwasthya.Services.AppointmentService;
// REMOVED: import com.backend.SmartSwasthya.dto.AppointmentBookingRequest; // This import is no longer needed

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class AppointmentController {

    private final AppointmentService appointmentService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping("/book")
    public ResponseEntity<Appointment> bookAppointment(
            // CHANGED: Using @RequestParam for individual fields instead of @RequestBody DTO
            @RequestParam("patientId") Long patientId,
            @RequestParam("departmentId") Long departmentId, // Corrected type to Long for consistency
            @RequestParam("doctorId") Long doctorId,
            @RequestParam("availableSlotId") Long availableSlotId,
            @RequestParam("reason") String reason) {
        try {
            Appointment bookedAppointment = appointmentService.bookAppointment(
                    patientId,         // Direct use of parameter
                    departmentId,      // Direct use of parameter
                    doctorId,          // Direct use of parameter
                    availableSlotId,   // Direct use of parameter
                    reason             // Direct use of parameter
            );
            return new ResponseEntity<>(bookedAppointment, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e); // 400 Bad Request for invalid IDs/data
        } catch (IllegalStateException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage(), e); // 409 Conflict for already booked slots
        } catch (UnsupportedOperationException e) {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED, e.getMessage(), e); // 405 for unsupported operations
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to book appointment: " + e.getMessage(), e); // 500 for general server errors
        }
    }

    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointments(
            @RequestParam(required = false) Long patientId,
            @RequestParam(required = false) Long doctorId,
            @RequestParam(required = false) Long departmentId) {
        try {
            List<Appointment> appointments;
            if (patientId != null) {
                appointments = appointmentService.getAppointmentsByPatientId(patientId);
            } else if (doctorId != null) {
                appointments = appointmentService.getAppointmentsByDoctorId(doctorId);
            } else if (departmentId != null) {
                appointments = appointmentService.getAppointmentsByDepartmentId(departmentId);
            }
            else {
                appointments = appointmentService.getAllAppointments();
            }
            if (appointments.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 if no appointments found matching criteria
            }
            return new ResponseEntity<>(appointments, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error fetching appointments.", e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) {
        return appointmentService.getAppointmentById(id)
                .map(appointment -> new ResponseEntity<>(appointment, HttpStatus.OK))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Appointment not found with ID: " + id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Appointment> updateAppointment(
            @PathVariable Long id,
            // When not using a DTO, if you want to update specific fields, they would either be
            // @RequestBody for a partial JSON, or @RequestParam if sent as form data/query params.
            // For simplicity here, assuming 'reason' might be in the request body, and IDs via params.
            // If the client sends an 'Appointment' JSON object, Spring will try to bind it.
            // The service method should be designed to handle nulls for fields not provided.
            @RequestBody Appointment appointment, // This assumes a JSON body with fields to update (e.g., {"reason": "new reason"})
            @RequestParam(required = false) Long patientId,
            @RequestParam(required = false) Long departmentId,
            @RequestParam(required = false) Long doctorId,
            @RequestParam(required = false) Long availableSlotId) {
        try {
            // The `appointment` object received here will only contain fields sent in the request body.
            // The service method will handle which fields to update based on what's available.
            return appointmentService.updateAppointment(id, appointment, patientId, departmentId, doctorId, availableSlotId)
                    .map(updatedAppointment -> new ResponseEntity<>(updatedAppointment, HttpStatus.OK))
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Appointment not found with ID: " + id));
        } catch (IllegalArgumentException | UnsupportedOperationException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error updating appointment.", e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelAppointment(@PathVariable Long id) {
        try {
            if (appointmentService.cancelAppointment(id)) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Appointment not found with ID: " + id);
        } catch (IllegalStateException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error canceling appointment.", e);
        }
    }
}