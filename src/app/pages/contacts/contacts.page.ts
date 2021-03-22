import { Component, OnInit } from '@angular/core';

// 1) Importa dependências
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { AlertController } from '@ionic/angular';

// 6) Não permite somente espaços nos campos
export function removeSpaces(control: AbstractControl) {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
  }
  return null;
}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  // 3) Atributos
  public contactForm: FormGroup; // Contém o formulário de contatos
  public pipe = new DatePipe('en_US'); // Formatar as datas

  constructor(
    // 2) Injeta dependências
    public form: FormBuilder,
    public firestore: AngularFirestore,
    public alert: AlertController

  ) { }

  ngOnInit() {
    // 4) Cria o formulário de contatos
    this.contactFormCreate();
  }

  // 5) Cria o formulário de contatos
  contactFormCreate() {
    this.contactForm = this.form.group({
      date: [''], // Data de envio
      name: [
        // Nome
        '',
        Validators.compose([
          Validators.required, // Obrigatório
          Validators.minLength(3), // Nomes curtos demais
          removeSpaces
        ]),
      ],
      email: [
        // E-mail
        '',
        Validators.compose([Validators.required, Validators.email, removeSpaces]),
      ],
      subject: [
        // Assunto
        '',
        Validators.compose([Validators.required, Validators.minLength(5), removeSpaces]),
      ],
      message: [
        // Mensagem
        '',
        Validators.compose([Validators.required, Validators.minLength(5), removeSpaces]),
      ],
    });
  }



  //7) processa o envio do formulário
  contactSend() {

    //criar e formartar a data
    this.contactForm.controls.date.setValue(
      this.pipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss').trim()
    );


    // salva em um novo documento do firebase Firestore
    this.firestore.collection('contacts').add(this.contactForm.value)
      .then(
        () => {

          //reset do formulário
          this.contactForm.reset();

          // feedback

          this.presentAlert();



          alert('Contato enviado com sucesso!');
        }
      )
      .catch(
        (error) => {

          alert('Algo de errado não está certo' + error);

        }

      );

  }


  //feedback
  async presentAlert() {
    const alert = await this.alert.create({

      header: 'Oba!',
      message: 'Contato enviado com sucesso!',
      buttons: [{
        text: 'Beleza!',
        handler: () => {

          this.contactForm.reset();
        }
      }]
    });

    await alert.present();
  }
}
