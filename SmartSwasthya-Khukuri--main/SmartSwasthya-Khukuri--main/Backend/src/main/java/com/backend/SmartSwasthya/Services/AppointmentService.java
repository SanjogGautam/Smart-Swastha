package com.backend.SmartSwasthya.Services;

import com.backend.SmartSwasthya.Models.*;
import com.backend.SmartSwasthya.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DepartmentRepository departmentRepository;
    private final DoctorRepository doctorRepository;
    private final DoctorAvailabilityRepository doctorAvailabilityRepository;

    @Autowired
    public AppointmentService(
            AppointmentRepository appointmentRepository,
            PatientRepository patientRepository,
            DepartmentRepository departmentRepository,
            DoctorRepository doctorRepository,
            DoctorAvailabilityRepository doctorAvailabilityRepository) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.departmentRepository = departmentRepository;
        this.doctorRepository = doctorRepository;
        this.doctorAvailabilityRepository = doctorAvailabilityRepository;
    }

    @Transactional
    public Appointment bookAppointment(
            Long patientId,
            Long departmentId,
            Long doctorId,
            Long availableSlotId,
            String reason) {

        // 1. Validate entities exist
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new IllegalArgumentException("Patient not found with ID: " + patientId));
        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new IllegalArgumentException("Department not found with ID: " + departmentId));
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found with ID: " + doctorId));
        DoctorAvailability availableSlot = doctorAvailabilityRepository.findById(availableSlotId)
                .orElseThrow(() -> new IllegalArgumentException("Available time slot not found with ID: " + availableSlotId));

        // 2. Perform business validations
        if (availableSlot.isBooked()) {
            throw new IllegalStateException("This time slot is already booked. Please choose another one.");
        }
        if (!availableSlot.getDoctor().getId().equals(doctorId)) {
            throw new IllegalArgumentException("Selected time slot does not belong to the chosen doctor.");
        }
        if (!doctor.getDepartment().getId().equals(departmentId)) {
            throw new IllegalArgumentException("Chosen doctor does not belong to the selected department.");
        }
        if (!department.getHospital().getId().equals(patient.getHospital().getId())) { // Assuming patient has a preferred hospital
            // This check might be more complex depending on your exact requirements
            // For example, if a patient can book an appointment at a hospital different from their primary one.
            // For simplicity, we'll assume the patient is booking within their registered hospital for now.
            // Or remove this check if the hospital isn't explicitly linked to Patient in a way that restricts this.
        }


        // 3. Mark the slot as booked
        availableSlot.setBooked(true);
        availableSlot.setBookedAppointment(null); // Will be set after appointment is saved, to prevent circular reference during save if mappedBy="bookedAppointment"
        doctorAvailabilityRepository.save(availableSlot); // Save the updated availability

        // 4. Create and save the appointment
        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setDepartment(department);
        appointment.setDoctor(doctor);
        // Derive the actual appointment time from the slot's date and start time
        appointment.setAppointmentTime(LocalDateTime.of(availableSlot.getAvailableDate(), availableSlot.getStartTime()));
        appointment.setReason(reason);
        appointment.setAvailableSlot(availableSlot); // Link appointment to the slot

        Appointment savedAppointment = appointmentRepository.save(appointment);

        // 5. Update the DoctorAvailability with the booked appointment (needed for @OneToOne mappedBy)
        availableSlot.setBookedAppointment(savedAppointment);
        doctorAvailabilityRepository.save(availableSlot); // Save again to link

        return savedAppointment;
    }

    @Transactional(readOnly = true)
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Appointment> getAppointmentById(Long id) {
        return appointmentRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Appointment> getAppointmentsByPatientId(Long patientId) {
        // Optional: Validate patient existence
        // patientRepository.findById(patientId).orElseThrow(() -> new IllegalArgumentException("Patient not found with ID: " + patientId));
        return appointmentRepository.findByPatientId(patientId);
    }

    @Transactional(readOnly = true)
    public List<Appointment> getAppointmentsByDoctorId(Long doctorId) {
        // Optional: Validate doctor existence
        // doctorRepository.findById(doctorId).orElseThrow(() -> new IllegalArgumentException("Doctor not found with ID: " + doctorId));
        return appointmentRepository.findByDoctorId(doctorId);
    }

    @Transactional(readOnly = true)
    public List<Appointment> getAppointmentsByDepartmentId(Long departmentId) {
        // Optional: Validate department existence
        // departmentRepository.findById(departmentId).orElseThrow(() -> new IllegalArgumentException("Department not found with ID: " + departmentId));
        return appointmentRepository.findByDepartmentId(departmentId);
    }

    @Transactional
    public Optional<Appointment> updateAppointment(Long id, Appointment appointmentDetails,
                                                   Long patientId, Long departmentId, Long doctorId, Long availableSlotId) {
        return appointmentRepository.findById(id).map(existingAppointment -> {
            // Update basic fields
            existingAppointment.setReason(appointmentDetails.getReason());
            // It's generally complex to change the actual time slot or doctor for an existing appointment directly via update.
            // A cancellation + new booking is often preferred for time-slot changes.
            // For this example, we'll allow updating the reason.
            // If you truly need to change patient/doctor/slot, you'd need more complex logic
            // including unbooking the old slot and booking the new one.

            // Only update relationships if IDs are provided and changed
            if (patientId != null && !existingAppointment.getPatient().getId().equals(patientId)) {
                Patient newPatient = patientRepository.findById(patientId)
                        .orElseThrow(() -> new IllegalArgumentException("New Patient not found with ID: " + patientId));
                existingAppointment.setPatient(newPatient);
            }
            if (departmentId != null && !existingAppointment.getDepartment().getId().equals(departmentId)) {
                Department newDepartment = departmentRepository.findById(departmentId)
                        .orElseThrow(() -> new IllegalArgumentException("New Department not found with ID: " + departmentId));
                existingAppointment.setDepartment(newDepartment);
            }
            if (doctorId != null && !existingAppointment.getDoctor().getId().equals(doctorId)) {
                Doctor newDoctor = doctorRepository.findById(doctorId)
                        .orElseThrow(() -> new IllegalArgumentException("New Doctor not found with ID: " + doctorId));
                existingAppointment.setDoctor(newDoctor);
            }
            if (availableSlotId != null && !existingAppointment.getAvailableSlot().getId().equals(availableSlotId)) {
                // If changing slot, you'd need to unbook old slot and book new.
                // For simplicity, this update method won't handle slot changes, it should be done via re-booking.
                throw new UnsupportedOperationException("Changing appointment slot via update is not supported. Please cancel and re-book.");
            }
            // appointmentTime is derived from availableSlot, so it's not directly updated.

            return appointmentRepository.save(existingAppointment);
        });
    }

    @Transactional
    public boolean cancelAppointment(Long id) {
        return appointmentRepository.findById(id).map(appointment -> {
            // Mark the associated slot as unbooked
            DoctorAvailability slot = appointment.getAvailableSlot();
            if (slot != null) {
                slot.setBooked(false);
                slot.setBookedAppointment(null); // Unlink the appointment
                doctorAvailabilityRepository.save(slot);
            }
            appointmentRepository.delete(appointment);
            return true;
        }).orElse(false);
    }
}