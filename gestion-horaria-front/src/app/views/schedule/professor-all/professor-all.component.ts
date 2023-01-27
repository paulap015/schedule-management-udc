import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, Renderer2, SimpleChanges, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import{Professor} from 'src/app/models/professor.model'
import { ScheduleProfessorService } from 'src/app/services/schedule-professor/schedule-professor.service';

@Component({
  selector: 'app-professor-all',
  templateUrl: './professor-all.component.html',
  styleUrls: ['./professor-all.component.scss']
})
export class ProfessorAllComponent {


  professors:Professor[]=[];
  profesor!:Professor;
  isDisabled:boolean=false;
  showSelectedProfessor:boolean=false;
  //emitir el profesor al padre cuando haya checkeado en una casilla
  @Output()selectedProfessor= new EventEmitter<Professor|null>();
  @ViewChildren("checkboxes") checkboxes!: QueryList<ElementRef>;

  totalItems:number=0;
  totalNumberPage:number=1;
  pageSize:number=0;
  columns:string[]=['Id','Nombre','Seleccionar'];

  constructor(
    private professorService: ScheduleProfessorService,
    private render2:Renderer2,
    private route : ActivatedRoute
  ){}
  ngOnnInit():void{

  }
  changeSelectedProfessor(){
    this.isDisabled=false
    // this.render2.setAttribute(this.casilla.nativeElement,'checked','false')
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
    this.selectedProfessor.emit(null)
  }
  onSelectingProfessor(profesor:Professor, e:Event){

    const x = e.target as HTMLInputElement
    if(x.checked){
      this.profesor = profesor;
      this.selectedProfessor.emit(profesor)
      this.isDisabled=true
      this.showSelectedProfessor=true;
    }
  }

  loadTableProfessorsSchedule(args: number[]){
    let pageSolicitud:number = args[0];
    let pageSize: number = args[1]
      if(!pageSolicitud){
        pageSolicitud = 0;
      }
      if(!pageSize){
        pageSize=10
      }
  }


}
