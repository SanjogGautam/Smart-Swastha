package com.backend.SmartSwasthya.Services;

import com.backend.SmartSwasthya.Models.Hospital;
import com.backend.SmartSwasthya.Repository.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class HospitalService {

    private final HospitalRepository hospitalRepository;

    @Autowired
    public HospitalService(HospitalRepository hospitalRepository) {
        this.hospitalRepository = hospitalRepository;
    }

    @Transactional
    public Hospital createHospital(Hospital hospital) {
        return hospitalRepository.save(hospital);
    }

    @Transactional(readOnly = true)
    public List<Hospital> getAllHospitals() {
        return hospitalRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Hospital> getHospitalById(Long id) {
        return hospitalRepository.findById(id);
    }

    @Transactional
    public Optional<Hospital> updateHospital(Long id, Hospital hospitalDetails) {
        return hospitalRepository.findById(id).map(existingHospital -> {
            existingHospital.setName(hospitalDetails.getName());
            existingHospital.setAddress(hospitalDetails.getAddress());
            existingHospital.setEmail(hospitalDetails.getEmail());
            // Update relationships if necessary, though direct update is uncommon here.
            return hospitalRepository.save(existingHospital);
        });
    }

    @Transactional
    public boolean deleteHospital(Long id) {
        if (hospitalRepository.existsById(id)) {
            hospitalRepository.deleteById(id);
            return true;
        }
        return false;
    }
}