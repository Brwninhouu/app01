import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Caixa de entrada', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Caixa de saída', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favoritos', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Arquivado', url: '/folder/Archived', icon: 'archive' },
    { title: 'Lixo', url: '/folder/Trash', icon: 'trash' },
  ];
  public labels = ['Família', 'Amigos', 'Notas', 'Trabalho', 'Viagem'];
  constructor() {}
}
