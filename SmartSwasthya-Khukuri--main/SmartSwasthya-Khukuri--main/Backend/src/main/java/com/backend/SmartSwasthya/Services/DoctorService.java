package com.backend.SmartSwasthya.Services;

import com.backend.SmartSwasthya.Models.Department;
import com.backend.SmartSwasthya.Models.Doctor;
import com.backend.SmartSwasthya.Models.Hospital;
import com.backend.SmartSwasthya.Repository.DepartmentRepository;
import com.backend.SmartSwasthya.Repository.DoctorRepository;
import com.backend.SmartSwasthya.Repository.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final HospitalRepository hospitalRepository;
    private final DepartmentRepository departmentRepository;

    @Autowired
    public DoctorService(DoctorRepository doctorRepository, HospitalRepository hospitalRepository, DepartmentRepository departmentRepository) {
        this.doctorRepository = doctorRepository;
        this.hospitalRepository = hospitalRepository;
        this.departmentRepository = departmentRepository;
    }

    @Transactional
    public Doctor createDoctor(Doctor doctor, Long hospitalId, Long departmentId) {
        Hospital hospital = hospitalRepository.findById(hospitalId)
                .orElseThrow(() -> new IllegalArgumentException("Hospital not found with ID: " + hospitalId));
        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new IllegalArgumentException("Department not found with ID: " + departmentId));

        // Optional: Validate if department belongs to hospital
        if (!department.getHospital().getId().equals(hospitalId)) {
            throw new IllegalArgumentException("Department with ID " + departmentId + " does not belong to Hospital with ID " + hospitalId);
        }

        doctor.setHospital(hospital);
        doctor.setDepartment(department);
        return doctorRepository.save(doctor);
    }

    @Transactional(readOnly = true)
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Doctor> getDoctorById(Long id) {
        return doctorRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Doctor> getDoctorsByDepartmentId(Long departmentId) {
        // Optional: Validate department existence
        // departmentRepository.findById(departmentId).orElseThrow(() -> new IllegalArgumentException("Department not found with ID: " + departmentId));
        return doctorRepository.findByDepartmentId(departmentId);
    }

    @Transactional(readOnly = true)
    public List<Doctor> getDoctorsByHospitalAndDepartment(Long hospitalId, Long departmentId) {
        // Validate existence for both for robust error handling
        hospitalRepository.findById(hospitalId)
                .orElseThrow(() -> new IllegalArgumentException("Hospital not found with ID: " + hospitalId));
        departmentRepository.findById(departmentId)
                .orElseThrow(() -> new IllegalArgumentException("Department not found with ID: " + departmentId));
        return doctorRepository.findByHospitalIdAndDepartmentId(hospitalId, departmentId);
    }

    @Transactional
    public Optional<Doctor> updateDoctor(Long id, Doctor doctorDetails, Long hospitalId, Long departmentId) {
        return doctorRepository.findById(id).map(existingDoctor -> {
            existingDoctor.setName(doctorDetails.getName());
            existingDoctor.setContact(doctorDetails.getContact());
            existingDoctor.setSpecialization(doctorDetails.getSpecialization());

            boolean hospitalChanged = hospitalId != null && !existingDoctor.getHospital().getId().equals(hospitalId);
            boolean departmentChanged = departmentId != null && !existingDoctor.getDepartment().getId().equals(departmentId);

            if (hospitalChanged || departmentChanged) {
                Hospital newHospital = existingDoctor.getHospital();
                Department newDepartment = existingDoctor.getDepartment();

                if (hospitalChanged) {
                    newHospital = hospitalRepository.findById(hospitalId)
                            .orElseThrow(() -> new IllegalArgumentException("New Hospital not found with ID: " + hospitalId));
                    existingDoctor.setHospital(newHospital);
                }
                if (departmentChanged) {
                    newDepartment = departmentRepository.findById(departmentId)
                            .orElseThrow(() -> new IllegalArgumentException("New Department not found with ID: " + departmentId));
                    existingDoctor.setDepartment(newDepartment);
                }

                // If both changed, or only department changed, ensure new department belongs to potentially new hospital
                if ( (hospitalChanged || departmentChanged) && !newDepartment.getHospital().getId().equals(newHospital.getId()) ) {
                    throw new IllegalArgumentException("Updated department with ID " + newDepartment.getId() + " does not belong to the (new) Hospital with ID " + newHospital.getId());
                }
            }
            return doctorRepository.save(existingDoctor);
        });
    }

    @Transactional
    public boolean deleteDoctor(Long id) {
        if (doctorRepository.existsById(id)) {
            doctorRepository.deleteById(id);
            return true;
        }
        return false;
    }
}