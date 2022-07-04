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
  restaurentModelObj: RestaurentData = new RestaurentData;
  allRestaurentData: any
  showAdd!:boolean
  showbtn!:boolean
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

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
  clickAddResto(){
    this.formValue.reset();
    this.showAdd=true;
    this.showbtn=false;
  }
  //subscribing our data which is maped via Services
  addResto() {
    // assign datas
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    // set it to services
    this.api.postRestaurent(this.restaurentModelObj).subscribe(res => {
      console.log(res);
      alert("Restaurent Records Added Successfull");
      // clear fill form data 0
      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset();
      this.getAllData();//when u post any data
    },
      err => {
        alert("Something is wrong in adding Records..")
      }
    )
  }

  //get all data
  getAllData() {
    this.api.getRestaurent().subscribe(res => {
      console.log(res);

      this.allRestaurentData = res;


    })
  }

  // delete data 
  deleteResto(data: any) {
    this.api.deleteRestaurent(data.id).subscribe(res => {
      alert("Restaurent Records Deleted..");
      this.getAllData(); //quick refresh data table.....
    })
  }

  //edit button 
  onEditResto(data: any) {
    this.showAdd=false;
    this.showbtn=true;
    this.restaurentModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);

  }


  //update data
  updateResto() {

    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;



    this.api.updateRestaurent(this.restaurentModelObj, this.restaurentModelObj.id).subscribe(res => {
      alert("Restaurent data updated");
      // clear fill form data
      let ref = document.getElementById('clear');
      ref?.click()
      this.formValue.reset();
      this.getAllData();//when u post any data

    })
  }

}
