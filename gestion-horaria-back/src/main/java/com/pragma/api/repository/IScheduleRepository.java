package com.pragma.api.repository;

import com.pragma.api.model.Environment;
import com.pragma.api.model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule>findAllByEnvironment(Environment environment);
}
