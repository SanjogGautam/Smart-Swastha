package com.backend.SmartSwasthya.Controllers;

import com.backend.SmartSwasthya.Models.Doctor;
import com.backend.SmartSwasthya.Services.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class DoctorController {

    private final DoctorService doctorService;

    @Autowired
    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @PostMapping
    public ResponseEntity<Doctor> createDoctor(@RequestBody Doctor doctor, @RequestParam Long hospitalId, @RequestParam Long departmentId) {
        try {
            Doctor createdDoctor = doctorService.createDoctor(doctor, hospitalId, departmentId);
            return new ResponseEntity<>(createdDoctor, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error creating doctor.", e);
        }
    }

    @GetMapping
    public ResponseEntity<List<Doctor>> getAllDoctors(
            @RequestParam(required = false) Long hospitalId,
            @RequestParam(required = false) Long departmentId) {
        try {
            List<Doctor> doctors;
            if (hospitalId != null && departmentId != null) {
                doctors = doctorService.getDoctorsByHospitalAndDepartment(hospitalId, departmentId);
            } else if (departmentId != null) {
                doctors = doctorService.getDoctorsByDepartmentId(departmentId);
            } else {
                doctors = doctorService.getAllDoctors();
            }
            return new ResponseEntity<>(doctors, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error fetching doctors.", e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long id) {
        return doctorService.getDoctorById(id)
                .map(doctor -> new ResponseEntity<>(doctor, HttpStatus.OK))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Doctor not found with ID: " + id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Doctor> updateDoctor(@PathVariable Long id, @RequestBody Doctor doctor, @RequestParam Long hospitalId, @RequestParam Long departmentId) {
        try {
            return doctorService.updateDoctor(id, doctor, hospitalId, departmentId)
                    .map(updatedDoctor -> new ResponseEntity<>(updatedDoctor, HttpStatus.OK))
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Doctor not found with ID: " + id));
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error updating doctor.", e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable Long id) {
        try {
            if (doctorService.deleteDoctor(id)) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Doctor not found with ID: " + id);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error deleting doctor.", e);
        }
    }
}