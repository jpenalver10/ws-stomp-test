import { Component, OnDestroy, OnInit } from '@angular/core';
import { StompService } from '@stomp/ng2-stompjs';
import { StompConfig } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  myLoadsSubs: Subscription;
  myTrucksSubs: Subscription;
  myLoadsMsg: Observable<Message>;
  myTrucksMsg: Observable<Message>;
  message: string;
  title = 'Websocket widgets test';
  stompResponses: Array<String> = [];
  
  constructor(private stompService: StompService) { }

  ngOnInit() {

    // se debe suscribir solo a las colas que la configuracion inicial cargue de backend como activas
    this.myLoadsMsg = this.stompService.subscribe('/user/queue/myLoads');
    this.myTrucksMsg = this.stompService.subscribe('/user/queue/myTrucks');

    this.myLoadsSubs = this.myLoadsMsg.subscribe((message: Message) => {      
      this.stompResponses.push("Incoming load: " + JSON.parse(message.body).id);
    });

    this.myTrucksSubs = this.myTrucksMsg.subscribe((message: Message) => {
      this.stompResponses.push("Incoming truck: " + JSON.parse(message.body).id);
    });

    this.message = "MY_LOADS,MY_TRUCKS";
  }

  ngOnDestroy() {

    this.myLoadsSubs.unsubscribe();
    this.myTrucksSubs.unsubscribe();
  }

  subscribe() {

    // TODO: quizas la suscripcion deberia realizarse auto en back por eventos

    //let toSend = {"content": this.message};

    let widgets = this.message.split(',');
    this.stompService.send('/control-panel/subscribe', JSON.stringify(widgets));

    //this.stompService.publish('/topic/ads', JSON.stringify(toSend));

  }

  unsubscribe() {

    // TODO: quizas la desuscripcion deberia realizarse auto en back por eventos

    let widgets = this.message.split(',');
    this.stompService.send('/control-panel/unsubscribe', JSON.stringify(widgets));    
  }

}
