import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(

    public auth: AngularFireAuth,
    private router: Router,
    public alert: AlertController

  ) { }

  ngOnInit() {}

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())

    //se login der certo
    .then(
      (data: any) => {
        this.feedback(data.user.displayName);
      }
    )



    //se login falhar 
    .catch( (error) => {
      console.log(error)

    }
    );
  }

  async feedback(userName: string) {
    const alert = await this.alert.create({
      header: `Olá ${userName}!`,
      message: 'Você já pode acessar o conteúdo restrito.',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['/articles']);
        }
      }]
    });

    await alert.present();
  }


}
