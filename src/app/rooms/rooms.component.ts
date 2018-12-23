import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import 'rxjs/add/operator/take';

import { Router } from '@angular/router'; 
let roomIDs = [];
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
rooms = [];
  constructor(public db: AngularFireDatabase,public router: Router) {
      db.object('rooms').valueChanges().take(1).subscribe( s => {
              roomIDs = Object.keys(s);
              roomIDs.forEach(id => {
                  if (this.rooms.length < 100) {
                      this.rooms.push({roomid: id, value: s[id]});
                  }
              });
              console.log(this.rooms);
          }
      );
      /*for(let i =1; i<=100; i++){
          let ob = {};
          ob = {
              roomNumber: i,
              editor: 'a',
              chat: 'b'
          };
          db.list('rooms').push(ob);
      }*/
  }
  redir(id){
    console.log(id);
    localStorage.setItem('room',id);
    this.router.navigate(['../editor'])

  }

  ngOnInit() {
  }

}
