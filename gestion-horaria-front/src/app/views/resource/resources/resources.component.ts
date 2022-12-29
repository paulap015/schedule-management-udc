import { Component,Input,Output, EventEmitter, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Environment } from 'src/app/models/environment.model';
import { Resource } from 'src/app/models/resource.model';
import {ResourceService} from 'src/app/services/resource/resource.service'
@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit,AfterViewChecked{
  resources:Resource[]=[];
  columns:string[]=['Id','Nombre','Tipo recurso','Checked'];
  colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'];
  resourceTypes:string[]=[];
  resourceType!: string | null;
  counter:number=0;
  envResource:any
  @Output() addedResource = new EventEmitter();
  @Input('isEdit')isEdit!:boolean;
  @Input('environment')environment!:Environment;
  constructor(
    private resourceService:ResourceService,

  ){

  }

  ngOnInit(){
    console.log("los recursos de este ambiente son ",this.environment.availableResources)
    this.resources= this.resourceService.getAllResources();
    this.resourceTypes=this.resourceService.getAllResourceTypes();
    if(this.isEdit==true){
      this.counter=this.environment.availableResources.length

    }else{
      this.counter =0;
    }
  }
  ngAfterViewChecked(){
    // for (let index = 0; index < this.resources.length; index++) {
    //   this.inResourceList(this.resources[index])

    // }
  }
  inResourceList(resource:Resource){
    
    if(this.environment.availableResources.find(x=> x.id ==resource.id)!=null){
      return true
    }
    // for (let index = 0; index < this.environment.availableResources.length; index++) {

    //   if(this.environment.availableResources[index].id == resource.id){

    //     return true
    //   }
    // }

    // console.log("entra aqui x ")
     return false
  }
  updateTableResources(type:string){
    console.log("entra a ng change")
    //update de la tabla haciendo busqueda en un servicio de los recursos que sean de ese tipo seleccionado
    this.resources=this.resourceService.getResourcesByResourceType(type);
  }
  onAddEnvironment(resource:Resource, e:Event){
    console.log("llega a onAddEnvironment",resource)
    const x = e.target as HTMLInputElement
    if(x.checked){
      this.addedResource.emit(resource)
      this.counter+=1;
    }else{
      this.counter -=1;
    }

  }
}
