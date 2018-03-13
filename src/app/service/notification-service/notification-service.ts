import { Injectable } from '@angular/core';
import { PubNubAngular } from 'pubnub-angular2';
import { DashboardServiceProvider } from '../dashboard-service/dashboard-service';
import { PlaylistServiceProvider } from '../playlist-service/playlist-service';
import { UrlServiceProvider } from '../../urlService/url-service';

@Injectable()
export class NotificationService {

  //---------- pour utiliser l' api html5 Notification
  public Notification : any  = Notification;
  
  constructor(
    public pubnub: PubNubAngular,
    public dashboardService : DashboardServiceProvider,
    public playlistService : PlaylistServiceProvider,
    public urlService : UrlServiceProvider,
  ) { 
    //------ pubnub init
    pubnub.init({
      publishKey: 'pub-c-6312060c-79da-49c2-bc42-1b0cbcf75662',
      subscribeKey: 'sub-c-6a454cf8-25c4-11e8-84be-f641dd32cbde'
    });
  }

  //---------- notification web
  notificationPush(msg) {
    let options = {
      body : msg,
      icon : "/assets/images/favicon.png"
    }
    let url = this.urlService.URL_BASE;

    if (!("Notification" in window)) {
      alert("This browser does not support system notifications");
    }
    else if (this.Notification.permission === "granted") {
      var notification = new Notification("Jereo notification",options);
      notification.onclick = function(event) {
        event.preventDefault();
        window.location.href= url;
      }
    }
    else if (this.Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        if (permission === "granted") {
          var notification = new Notification("Jereo notification",options);
        }
      });
    }
  }


  //----------------- PubNub notification service
  sendPubNubMessage(myChannel, msg) {
    this.subscribePubNub(myChannel);
    this.pubnub.publish({ channel: myChannel, message: msg }, (response) => {
      console.log(response);
    });
  }

  getPubNubMessage(myChannel) {
    this.subscribePubNub(myChannel);
    this.pubnub.getMessage(myChannel, (msg) => {
      let dataToReceive = JSON.parse(msg.message);
      //----------- traitement message
      this.notificationPush(dataToReceive.notif);
    })
  }

  subscribePubNub(myChannel) {
    this.pubnub.subscribe({ channels: [myChannel], triggerEvents: ['message'] });
  }

}
