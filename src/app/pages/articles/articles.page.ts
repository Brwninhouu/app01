import { Component, OnInit } from '@angular/core';

//passo 1 - importa dependências - injetar lá em baixo no método construtor
import { AngularFirestore } from '@angular/fire/firestore';
import { $ } from 'protractor';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {


  // 3 atributos
  item: Observable<any[]>;


  // 2 injetar dependências
  constructor(firestore: AngularFirestore) {

    // 4 ler os dados do banco de dados
    this.item = firestore.collection('articles').valueChanges({ idField: "id" });
  }

  ngOnInit() {
  }



}
