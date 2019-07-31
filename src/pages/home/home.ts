import { Component } from '@angular/core';
import { NavController, AlertController  } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashbPage } from '../dashb/dashb';


import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public restProvider: RestProvider,  public formBuilder: FormBuilder,private alertCtrl: AlertController) {

		// this.getUsers();
    this.myForm = this.createMyForm();
  }
  users : any;
  myForm: FormGroup;



    getUsersv2() {
      let login=this.myForm.value;
      console.log(login);

    this.restProvider.getUsersv2v(login.email, login.pass)
    .then(data => {

      // console.log(data['ok']);

      if (data['ok']) {
        this.navCtrl.push(DashbPage);

      }else{
        let alert = this.alertCtrl.create({
          title: 'Error de Autenticación',
          subTitle: 'Su usuario o contraseña se encuentran incorrectas',
          buttons: ['Aceptar']
        });
        alert.present();
      }
   
    });
  }


  private createMyForm(){
  return this.formBuilder.group({
    pass: ['', Validators.required],
   
    email: ['', Validators.required]
   
   
   
  });
}



  
}
