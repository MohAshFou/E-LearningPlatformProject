import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  public hubConnection!: HubConnection;

  constructor() {
    this.createConnection();
    this.startConnection();
  }

  private createConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7217/classroomhub')
      .build();


    this.hubConnection.on('SendStudentMessage', (user: string, question: string, commentId: number) => {
      console.log(`Received question from ${user}: ${question} with Comment ID: ${commentId}`);

    });


    this.hubConnection.on('SendTeacherMessage', (user: string, reply: string, commentId: number,studid:number) => {
      console.log(`Received reply from ${user}: ${reply} for Comment ID: ${commentId}  userid: ${studid}   ${reply}`);

    });
  }

  private startConnection() {
    this.hubConnection
      .start()
      .then(() => console.log('SignalR connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public sendMessage(user: string, message: string ,commentId: number ,   studid:number ) {
    this.hubConnection.invoke('SendStudentMessage', user, message)
      .catch(err => console.error(err));
  }

  public sendTeacherReply(user: string, reply: string, commentId: number , studid:number) {
    this.hubConnection.invoke('SendTeacherMessage', user, reply, commentId)
      .catch(err => console.error(err));
  }
}
