package com.backend.SmartSwasthya.Controllers;

import com.backend.SmartSwasthya.Models.Department;
import com.backend.SmartSwasthya.Services.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class DepartmentController {

    private final DepartmentService departmentService;

    @Autowired
    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @PostMapping
    public ResponseEntity<Department> createDepartment(@RequestBody Department department, @RequestParam Long hospitalId) {
        try {
            Department createdDepartment = departmentService.createDepartment(department, hospitalId);
            return new ResponseEntity<>(createdDepartment, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error creating department.", e);
        }
    }

    @GetMapping
    public ResponseEntity<List<Department>> getAllDepartments(@RequestParam(required = false) Long hospitalId) {
        try {
            List<Department> departments;
            if (hospitalId != null) {
                departments = departmentService.getDepartmentsByHospitalId(hospitalId);
            } else {
                departments = departmentService.getAllDepartments();
            }
            return new ResponseEntity<>(departments, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error fetching departments.", e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable Long id) {
        return departmentService.getDepartmentById(id)
                .map(department -> new ResponseEntity<>(department, HttpStatus.OK))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Department not found with ID: " + id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Department> updateDepartment(@PathVariable Long id, @RequestBody Department department, @RequestParam Long hospitalId) {
        try {
            return departmentService.updateDepartment(id, department, hospitalId)
                    .map(updatedDepartment -> new ResponseEntity<>(updatedDepartment, HttpStatus.OK))
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Department not found with ID: " + id));
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error updating department.", e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDepartment(@PathVariable Long id) {
        try {
            if (departmentService.deleteDepartment(id)) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Department not found with ID: " + id);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error deleting department.", e);
        }
    }
}