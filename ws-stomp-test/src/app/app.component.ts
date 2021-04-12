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

  myLoadsMsg: Observable<Message>;
  myLoadSearchesMsg: Observable<Message>;  
  myTrucksMsg: Observable<Message>;  
  myTruckSearchesMsg: Observable<Message>;
  myManagementMsg: Observable<Message>;
  mySearchMsg: Observable<Message>;
  myLoadsSubs: Subscription;
  myLoadSearchesSubs: Subscription;
  myTrucksSubs: Subscription;  
  myTruckSearchesSubs: Subscription;
  myManagementSubs: Subscription;
  mySearchSubs: Subscription;
  widgets: string;
  title = 'Websocket widgets test';
  availableWidgets = "MY_LOADS,MY_LOAD_SEARCHES,MY_TRUCKS,MY_TRUCK_SEARCHES,MY_MANAGEMENT,SEARCHER";
  stompResponses: Array<String> = [];
  
  constructor(private stompService: StompService) { }

  ngOnInit() {

    // se debe suscribir solo a las colas que la configuracion inicial cargue de backend como activas
    this.myLoadsMsg = this.stompService.subscribe('/user/queue/myLoads');
    this.myLoadSearchesMsg = this.stompService.subscribe('/user/queue/myLoadSearches');
    this.myTrucksMsg = this.stompService.subscribe('/user/queue/myTrucks');    
    this.myTruckSearchesMsg = this.stompService.subscribe('/user/queue/myTruckSearches');
    this.myManagementMsg = this.stompService.subscribe('/user/queue/myManagement');
    this.mySearchMsg = this.stompService.subscribe('/user/queue/mySearch');
    

    this.myLoadsSubs = this.myLoadsMsg.subscribe((message: Message) => {      
      this.stompResponses.push("Incoming load-offer: " + JSON.parse(message.body).id);
    });

    this.myLoadSearchesSubs = this.myLoadSearchesMsg.subscribe((message: Message) => {      
      this.stompResponses.push("Incoming load-search: " + JSON.parse(message.body).searchId);
    });

    this.myTrucksSubs = this.myTrucksMsg.subscribe((message: Message) => {
      this.stompResponses.push("Incoming truck-offer: " + JSON.parse(message.body).id);
    });    

    this.myTruckSearchesSubs = this.myTruckSearchesMsg.subscribe((message: Message) => {
      this.stompResponses.push("Incoming truck-search: " + JSON.parse(message.body).searchId);
    });

    this.myManagementSubs = this.myManagementMsg.subscribe((message: Message) => {
      this.stompResponses.push("Incoming management: " + JSON.parse(message.body).id);
    });

    this.mySearchSubs = this.mySearchMsg.subscribe((message: Message) => {
      this.stompResponses.push("Incoming search: " + JSON.parse(message.body).searchId);
    });

    this.widgets = this.availableWidgets;
  }

  ngOnDestroy() {

    this.myLoadsSubs.unsubscribe();
    this.myTrucksSubs.unsubscribe();
  }

  subscribe() {

    // TODO: quizas la suscripcion deberia realizarse auto en back por eventos

    //let toSend = {"content": this.message};

    let widgets = this.widgets.split(',');
    this.stompService.send('/control-panel/subscribe', JSON.stringify(widgets));

    //this.stompService.publish('/topic/ads', JSON.stringify(toSend));
  }

  unsubscribe() {

    // TODO: quizas la desuscripcion deberia realizarse auto en back por eventos

    let widgets = this.widgets.split(',');
    this.stompService.send('/control-panel/unsubscribe', JSON.stringify(widgets));    
  }

}
