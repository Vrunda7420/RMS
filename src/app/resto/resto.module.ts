import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestoRoutingModule } from './resto-routing.module';
import { HomeComponent } from './home/home.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
 
  ],
  imports: [
    CommonModule,
    RestoRoutingModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RestoModule { }
