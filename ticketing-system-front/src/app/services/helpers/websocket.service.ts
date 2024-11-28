import {Injectable} from '@angular/core';
import {Client, over} from 'stompjs';
import SockJS from 'sockjs-client';
import {AuthService} from "../api/auth.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private stompClient: Client | null = null;
  private readonly topicPrefix = '/topic/user/';
  private isConnected = false;
  $newNotification = new Subject<Notification>();

  constructor(private authService: AuthService) {
  }

  connect(onConnect: () => void): void {
    if (this.isConnected) {
      return;
    }

    const token = this.authService.getToken();
    if (!token) {
      return;
    }

    const socketUrl = `http://localhost:8080/api/v1/ws?token=${token}`;
    const socket = new SockJS(socketUrl);
    this.stompClient = over(socket);
    this.stompClient.debug = function (str) {
    };

    this.stompClient.connect({}, () => {
      this.isConnected = true;
      onConnect();
    }, (error) => {
      console.error('Error connecting to WebSocket:', error);
    });
  }

  subscribeToUserNotifications(callback: (message: any) => void): void {
    const userId = this.authService.getLoggedInUserId();
    const topic = `${this.topicPrefix}${userId}/notifications`;
    if (this.stompClient) {
      this.stompClient.subscribe(topic, (message) => {
        callback(JSON.parse(message.body));
      });
    }
  }

  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        this.isConnected = false;
      });
    }
  }
}

