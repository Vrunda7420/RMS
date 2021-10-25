import { Component, OnInit } from '@angular/core';
import { RestoService } from '../resto.service';
import { Resto } from '../resto';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  resto: Resto[]=[];
  form!: FormGroup;
  ishidebutton:boolean=false;
  id!:number;
  showAdd!: boolean;
  showbtn!: boolean;
  searchValue!: string;
  name!: any;

  constructor(public restoService:RestoService,private router: Router) { }

  ngOnInit(): void {
    
    this.form = new FormGroup({
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.email]),
      mobile: new FormControl('', [Validators.required,Validators.minLength(10)]),
      address: new FormControl('', Validators.required),
      services: new FormControl('', Validators.required),
    });

    this.getdataAll();
  }

  clickAddResto(){
    this.form.reset();
    this.showAdd=true;
    this.showbtn=false;
  }

  getdataAll()
  {
    this.restoService.getAll().subscribe((data:Resto[]) => {
      this.resto=data;
      
    });
    
  }

  get f(){
    return this.form.controls;
  }

  addresto(){
    this.restoService.create(this.form.value).subscribe(res => {
         alert('Restaurent Data created successfully!');
         this.form.reset();
         this.getdataAll();
    })
  }

  /*find(data:any){
    
    this.resto=data.id;
    if(this.resto==data.id){
    this.form.controls['name'].setValue(data.name);
    this.form.controls['email'].setValue(data.email);
    this.form.controls['mobile'].setValue(data.mobile);
    this.form.controls['address'].setValue(data.address);
    this.form.controls['services'].setValue(data.services);
  }
  }*/
  find(data:any){
    this.showAdd=false;
    this.showbtn=true;
    this.id=data.id;
    this.restoService.find(data.id).subscribe((data: Resto[])=>{
      this.resto=data;
      this.form.setValue(this.resto);
      this.getdataAll();
    });
    
    
  }

  updateresto(){
    this.restoService.update(this.id, this.form.value).subscribe(res => {
         alert('Restaurent Data updated successfully!');
         this.getdataAll();
    });
    
  }


  deleteResto(id:any){
    this.restoService.delete(id).subscribe(res => {
         this.resto = this.resto.filter(item => item.id !== id);
         alert('Restaurent Data deleted successfully!');
    })
  }


  search(){
    if(this.name==""){
      this.ngOnInit();
    }else{
      this.resto = this.resto.filter(res =>{
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      });
    }
  }
}
