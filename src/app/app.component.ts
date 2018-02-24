import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private title : string = 'Ndao hifidy';
  private drapeau : string = 'assets/images/drapeau2.png';

  getColor(){
    var num=Math.floor((Math.random() * 10) + 1);
    switch(num) {
      case 1:
        return "blue";
      case 2:
        return "yellow darken-3";
      case 3:
        return "grey";
      case 4:
        return "green";
      case 5:
        return "cyan"; 
      case 6:
        return "indigo";  
      case 7:
        return "purple";  
      case 8:
        return "brown"; 
      case 9:
        return "orange"; 
      case 10:
        return "red darken-4";   
    }
}

