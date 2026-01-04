package com.backend.SmartSwasthya.Services;

import com.backend.SmartSwasthya.Models.Department;
import com.backend.SmartSwasthya.Models.Hospital;
import com.backend.SmartSwasthya.Repository.DepartmentRepository;
import com.backend.SmartSwasthya.Repository.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final HospitalRepository hospitalRepository;

    @Autowired
    public DepartmentService(DepartmentRepository departmentRepository, HospitalRepository hospitalRepository) {
        this.departmentRepository = departmentRepository;
        this.hospitalRepository = hospitalRepository;
    }

    @Transactional
    public Department createDepartment(Department department, Long hospitalId) {
        Hospital hospital = hospitalRepository.findById(hospitalId)
                .orElseThrow(() -> new IllegalArgumentException("Hospital not found with ID: " + hospitalId));
        department.setHospital(hospital);
        return departmentRepository.save(department);
    }

    @Transactional(readOnly = true)
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Department> getDepartmentById(Long id) {
        return departmentRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Department> getDepartmentsByHospitalId(Long hospitalId) {
        // Optional: Validate hospital existence if you want 404 if hospital is not found
        // hospitalRepository.findById(hospitalId).orElseThrow(() -> new IllegalArgumentException("Hospital not found with ID: " + hospitalId));
        return departmentRepository.findByHospitalId(hospitalId);
    }

    @Transactional
    public Optional<Department> updateDepartment(Long id, Department departmentDetails, Long hospitalId) {
        return departmentRepository.findById(id).map(existingDepartment -> {
            existingDepartment.setName(departmentDetails.getName());
            existingDepartment.setDescription(departmentDetails.getDescription());
            if (hospitalId != null && !existingDepartment.getHospital().getId().equals(hospitalId)) {
                Hospital newHospital = hospitalRepository.findById(hospitalId)
                        .orElseThrow(() -> new IllegalArgumentException("New Hospital not found with ID: " + hospitalId));
                existingDepartment.setHospital(newHospital);
            }
            return departmentRepository.save(existingDepartment);
        });
    }

    @Transactional
    public boolean deleteDepartment(Long id) {
        if (departmentRepository.existsById(id)) {
            departmentRepository.deleteById(id);
            return true;
        }
        return false;
    }
}