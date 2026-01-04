package com.backend.SmartSwasthya.Services;

import com.backend.SmartSwasthya.Models.Hospital;
import com.backend.SmartSwasthya.Models.Patient;
import com.backend.SmartSwasthya.Repository.HospitalRepository;
import com.backend.SmartSwasthya.Repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    private final PatientRepository patientRepository;
    private final HospitalRepository hospitalRepository;

    @Autowired
    public PatientService(PatientRepository patientRepository, HospitalRepository hospitalRepository) {
        this.patientRepository = patientRepository;
        this.hospitalRepository = hospitalRepository;
    }

    @Transactional
    public Patient createPatient(Patient patient, Long hospitalId) {
        Hospital hospital = hospitalRepository.findById(hospitalId)
                .orElseThrow(() -> new IllegalArgumentException("Hospital not found with ID: " + hospitalId));
        patient.setHospital(hospital);
        return patientRepository.save(patient);
    }

    @Transactional(readOnly = true)
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Patient> getPatientById(Long id) {
        return patientRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Patient> getPatientsByHospitalId(Long hospitalId) {
        // Optional: Validate hospital existence
        // hospitalRepository.findById(hospitalId).orElseThrow(() -> new IllegalArgumentException("Hospital not found with ID: " + hospitalId));
        return patientRepository.findByHospitalId(hospitalId);
    }

    @Transactional
    public Optional<Patient> updatePatient(Long id, Patient patientDetails, Long hospitalId) {
        return patientRepository.findById(id).map(existingPatient -> {
            existingPatient.setName(patientDetails.getName());
            existingPatient.setPhone(patientDetails.getPhone());
            existingPatient.setGender(patientDetails.getGender());
            existingPatient.setAge(patientDetails.getAge());
            if (hospitalId != null && !existingPatient.getHospital().getId().equals(hospitalId)) {
                Hospital newHospital = hospitalRepository.findById(hospitalId)
                        .orElseThrow(() -> new IllegalArgumentException("New Hospital not found with ID: " + hospitalId));
                existingPatient.setHospital(newHospital);
            }
            return patientRepository.save(existingPatient);
        });
    }

    @Transactional
    public boolean deletePatient(Long id) {
        if (patientRepository.existsById(id)) {
            patientRepository.deleteById(id);
            return true;
        }
        return false;
    }
}