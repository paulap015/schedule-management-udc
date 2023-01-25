import { Injectable } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { Environment } from 'src/app/models/environment.model';
import { Period } from 'src/app/models/period.model';
import { Schedule } from 'src/app/models/schedule.model';
import { Program } from 'src/app/models/program.model';
import { Teacher } from 'src/app/models/teacher.model';
import { Subject } from 'src/app/models/subject.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ScheduleService {


  period:Period={'periodId':'2022.2','state':'true'}
  program:Program={'id':'PIS','name':'Ingenieria de sistemas'}
  subject:Subject={'subjectCode':'1','name':'Programacion orientada a objetos','weeklyOverload':6,'timeBlock':true,'semester':2,'program':this.program}
  teacher:Teacher={'teacherCode':'104618021314','fullName':'PPC','department':{}}
  curso:Course={'courseId':1,'courseGroup':'A','courseCapacity':20,'period':this.period,'subject':this.subject,'teacher':this.teacher}
  course!: Course;
  envi!:Environment;
  schedule:Schedule[]=[
    {id:1,day:"martes",startingTime:'07:00',endingTime:'9:00',course:this.curso,environment:this.envi} ,
    {id:2,day:"lunes",startingTime:'07:00',endingTime:'9:00',course:this.curso,environment:this.envi} ,
    {id:3,day:"martes",startingTime:'09:00',endingTime:'11:00',course:this.curso,environment:this.envi} ,
    {id:4,day:"miercoles",startingTime:'07:00',endingTime:'11:00',course:this.curso,environment:this.envi} ,
    {id:5,day:"jueves",startingTime:'11:00',endingTime:'12:00',course:this.curso,environment:this.envi} ,


  ]
  endPoint:String = 'api/schedule'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  };
  constructor(
    private http : HttpClient
  ) { }
  getAllAvailableScheduleByEnvironment(){
    // Consultar todos los horarios disponibles de este ambiente (donde course es null) p
    return this.schedule;
  }

  getAllScheduleFromEnvironment(){
    //consultar todos los horarios ya ocupados de un ambiente
    return this.schedule;
  }

  saveSchedule(){
    //guardar el schedule
  }
  getTakenProfessorSchedule(courseId: number){
    //TODO consumir servicio para obtener el horario ocupado del profesor
    return this.http.get<any>(this.endPoint+`/${courseId}`,this.httpOptions)
    .pipe(
      catchError((e) => {

        console.log('Error obteniendo  horario ocupado del profesor ', e.error.mensaje, 'error');
        return throwError(e);

      })
    )
  }
  getTakenEnvironmentSchedule(environmentId: number){
    //TODO consumir servicio para obtener el horario ocupado del profesor
    return this.http.get<any>(this.endPoint+`/${environmentId}`,this.httpOptions)
    .pipe(
      catchError((e) => {

        console.log('Error obteniendo  horario ocupado del ambiente ', e.error.mensaje, 'error');
        return throwError(e);

      })
    )
  }
}
