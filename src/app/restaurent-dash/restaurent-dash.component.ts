import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RestaurentData } from '../restaurent.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css']
})
export class RestaurentDashComponent implements OnInit {

  formValue!: FormGroup
  restaurentModelObj:RestaurentData= new RestaurentData;
  allRestaurentData:any
  constructor(private formBuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']

    })
    this.getAllData()
  }
  //subscribing our data which is maped via Services
  addResto(){
    // assign datas
    this.restaurentModelObj.name=this.formValue.value.name;
    this.restaurentModelObj.email=this.formValue.value.email;
    this.restaurentModelObj.mobile=this.formValue.value.mobile;
    this.restaurentModelObj.address=this.formValue.value.address;
    this.restaurentModelObj.services=this.formValue.value.services;

    // set it to services
    this.api.postRestaurent(this.restaurentModelObj).subscribe(res=>{
      console.log(res);
      alert("Restaurent Records Added Successfull"); 
      this.formValue.reset();
    },
    err=>{
      alert("Something is wrong in adding Records..")
    }
     )
  }

  //get all data
  getAllData(){
    this.api.getRestaurent().subscribe(res=>{
      console.log(res);
      
      this.allRestaurentData=res;
      
      
    })
  }

  // delete data 
  deleteResto(data:any){
    this.api.deleteRestaurent(data.id).subscribe(res=>{
      alert("Restaurent Records Deleted..");
      this.getAllData(); //quick refresh data table.....
    })
  }

}
