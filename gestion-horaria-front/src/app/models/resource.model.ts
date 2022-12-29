import { Environment } from "./environment.model";

export interface Resource{

  id:number;
  name:string;
  resourceType:string;
  resourceLocations:Environment[];
  
}
