package com.pragma.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private Integer id;
    @Column(name = "course_group", nullable = false, length = 20)
    private String courseGroup;
    @Column(name = "course_capacity", nullable = false)
    private Integer courseCapacity;

    @ManyToOne
    @JoinColumn()
    private Period period;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "subject_code")
    private Subject subject;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "teacher_code")
    private Teacher teacher;

    @OneToMany(mappedBy = "course")
    private Set<Schedule> schedules;
}
