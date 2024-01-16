import { Injectable } from '@angular/core';
import {io} from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket: any

  constructor() {
    this.socket = io('ws://localhost:3000');
   }
}
