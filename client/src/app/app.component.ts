import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  @ViewChild('messageInput!', {static: false}) messageInput!: ElementRef;
  public message: string = '';

  constructor(private socketService: SocketService, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    // Example: Emit an event
    this.socketService.socket.emit('custom-event', { data: 'Hello, server!' });
    // Example: Listen for an event
    this.socketService.socket.on('server-response', (data: any) => {
      this.message = data.message;
    });
  }

  public sendMessage(message: string): void {
    this.socketService.socket.emit("custom-event", {data: message});
  }
}
