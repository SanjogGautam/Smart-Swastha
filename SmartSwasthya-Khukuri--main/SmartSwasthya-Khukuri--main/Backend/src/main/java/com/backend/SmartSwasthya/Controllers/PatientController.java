package com.backend.SmartSwasthya.Controllers;

import com.backend.SmartSwasthya.Models.Patient;
import com.backend.SmartSwasthya.Services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class PatientController {

    private final PatientService patientService;

    @Autowired
    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @PostMapping
    public ResponseEntity<Patient> createPatient(@RequestBody Patient patient, @RequestParam Long hospitalId) {
        try {
            Patient createdPatient = patientService.createPatient(patient, hospitalId);
            return new ResponseEntity<>(createdPatient, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error creating patient.", e);
        }
    }

    @GetMapping
    public ResponseEntity<List<Patient>> getAllPatients(@RequestParam(required = false) Long hospitalId) {
        try {
            List<Patient> patients;
            if (hospitalId != null) {
                patients = patientService.getPatientsByHospitalId(hospitalId);
            } else {
                patients = patientService.getAllPatients();
            }
            return new ResponseEntity<>(patients, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error fetching patients.", e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        return patientService.getPatientById(id)
                .map(patient -> new ResponseEntity<>(patient, HttpStatus.OK))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Patient not found with ID: " + id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @RequestBody Patient patient, @RequestParam Long hospitalId) {
        try {
            return patientService.updatePatient(id, patient, hospitalId)
                    .map(updatedPatient -> new ResponseEntity<>(updatedPatient, HttpStatus.OK))
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Patient not found with ID: " + id));
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error updating patient.", e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        try {
            if (patientService.deletePatient(id)) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Patient not found with ID: " + id);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error deleting patient.", e);
        }
    }
}