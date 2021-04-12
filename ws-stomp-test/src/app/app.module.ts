import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StompConfig, StompService } from '@stomp/ng2-stompjs';

import { AppComponent } from './app.component';

const stompConfig: StompConfig = {
  // Which server?  
  //url: 'ws://localhost:18094/exchange/websocket',
  //url: 'ws://app.wtransnet.local/exchange/websocket',
  //url: 'ws://appint01.wtransnet.local:18094/exchange/websocket',
  url: 'ws://apppre43.cpd.wtransnet.net:18094/exchange/websocket',
    
  // Why do we must introduce suffix /websocket on original URL ??
  // http://procbits.com/connecting-to-a-sockjs-server-from-native-html5-websocket

  // Headers
  // Typical keys: login, passcode, host
  // Debe estar securizada tanto la conexion inicial al WS como los mensajes enviados de front a back
  headers: {
    Authorization: 'ZHVtbXk6NTE5OTExYmUtYzUzYS00M2ZjLTk0YTktNjA3YTc3MDgwNjll'
  },

  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeat_in: 0, // Typical value 0 - disabled
  heartbeat_out: 20000, // Typical value 20000 - every 20 seconds
  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 5000 (5 seconds)
  reconnect_delay: 5000,

  // Will log diagnostics on console
  debug: true
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    StompService,
    {
      provide: StompConfig,
      useValue: stompConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
