import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from '../../../../../src/app/Models/Register';
import { AuthService } from '../../../../../src/app/_service/Auth.service';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(  private router: Router,private fb:FormBuilder,private registermodel:Register,private authservice:AuthService) { }

  ngOnInit() {
    debugger;
    if( localStorage.getItem('token')!=null){
      this.router.navigate(['/home']);
    }
    this.form = this.fb.group({
    
      avatar: [null]
    })
  }
  Registrationform:FormGroup=new FormGroup({
 
    Consumer_Name: new FormControl(""),
    Email: new FormControl(""),
    Mobile_Number: new FormControl(""),
    Password: new FormControl(""),

  
   });
   LoginForm:FormGroup=new FormGroup({
    Email: new FormControl(""),
    Password: new FormControl(""),

   });

   login() {
    // tslint:disable-next-line: no-debugger
    debugger;
    this.authservice.login(this.LoginForm.value).subscribe(next => {
     console.log("user loginin successfully")
     
      window.location.reload();
    }, error => {
   
    });
  }

   Register(){
    debugger;
    if(!this.Registrationform.invalid){
      this.Registrationform.get('Mobile_Number').patchValue('+44'+this.Registrationform.get('Mobile_Number').value);
      console.log(this.Registrationform.value)
     this.authservice.Register(this.Registrationform.value).subscribe(next => {
   this.Registrationform.reset();
  
      
     }, error => {
     
       console.log(error);
     });
    }
   
   
  }
}
