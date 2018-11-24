import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import { HomePage } from "../home/home";


@Component({
  selector: 'page-user-name',
  templateUrl: 'user-name.html',
})
export class UserNamePage {
  alertVar: any;
  startGame: any;
  user1: any;
  user2: any;
  ngUsername: string = "";
  public buttonArray1Count: any = [[{ clicked: false, x: 0, y: 0, val: "" }, { clicked: false, x: 0, y: 1, val: "" }, { clicked: false, x: 0, y: 2, val: "" }, { clicked: false, x: 0, y: 3, val: "" }, { clicked: false, x: 0, y: 4, val: "" }, { clicked: false, x: 0, y: 5, val: "" }, { clicked: false, x: 0, y: 6, val: "" }],
  [{ clicked: false, x: 1, y: 0, val: "" }, { clicked: false, x: 1, y: 1, val: "" }, { clicked: false, x: 1, y: 2, val: "" }, { clicked: false, x: 1, y: 3, val: "" }, { clicked: false, x: 1, y: 4, val: "" }, { clicked: false, x: 1, y: 5, val: "" }, { clicked: false, x: 1, y: 6, val: "" }],
  [{ clicked: false, x: 2, y: 0, val: "" }, { clicked: false, x: 2, y: 1, val: "" }, { clicked: false, x: 2, y: 2, val: "" }, { clicked: false, x: 2, y: 3, val: "" }, { clicked: false, x: 2, y: 4, val: "" }, { clicked: false, x: 2, y: 5, val: "" }, { clicked: false, x: 2, y: 6, val: "" }],
  [{ clicked: false, x: 3, y: 0, val: "" }, { clicked: false, x: 3, y: 1, val: "" }, { clicked: false, x: 3, y: 2, val: "" }, { clicked: false, x: 3, y: 3, val: "" }, { clicked: false, x: 3, y: 4, val: "" }, { clicked: false, x: 3, y: 5, val: "" }, { clicked: false, x: 3, y: 6, val: "" }],
  [{ clicked: false, x: 4, y: 0, val: "" }, { clicked: false, x: 4, y: 1, val: "" }, { clicked: false, x: 4, y: 2, val: "" }, { clicked: false, x: 4, y: 3, val: "" }, { clicked: false, x: 4, y: 4, val: "" }, { clicked: false, x: 4, y: 5, val: "" }, { clicked: false, x: 4, y: 6, val: "" }],
  [{ clicked: false, x: 5, y: 0, val: "" }, { clicked: false, x: 5, y: 1, val: "" }, { clicked: false, x: 5, y: 2, val: "" }, { clicked: false, x: 5, y: 3, val: "" }, { clicked: false, x: 5, y: 4, val: "" }, { clicked: false, x: 5, y: 5, val: "" }, { clicked: false, x: 5, y: 6, val: "" }]
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public db: AngularFireDatabase, public alertCtrl: AlertController) {
      // if(this.navParams.get("reset")==true){
      //   this.resetGame();
      // }
  }

  checkFreeSlot() {
    console.log()
    if ((this.ngUsername).trim() !== "") {
      this.user1 = this.db.object("/dotsGame/players/player1/name").valueChanges().subscribe(data => {
        console.log(data);
        if (data == "") {
          this.user1.unsubscribe();
          console.log("unsubscribed IF");
          this.navUser1();
        }
        else {
          this.user1.unsubscribe();
          console.log("unsubscribed Else");
          this.checkUser2();
        }
      });
    }
    else{
      alert("username cannot be empty.");
    }
  }

  checkUser2() {
    this.user2 = this.db.object("/dotsGame/players/player2/name").valueChanges().subscribe(data => {
      // this.buttonArray1Count = data;
      console.log(data);
      if (data == "") {
        this.user2.unsubscribe();
        this.db.object("/dotsGame/players/player2/name").set(this.ngUsername);
        this.db.object("/dotsGame/freeSlots").set(false);
        console.log("user2");
        this.navCtrl.setRoot(HomePage,{userType:false});
      }
      else {
        alert("Please login after some time.");
        this.user2.unsubscribe();
        this.ngUsername = "";
      }
    });
  }

  navUser1() {
    this.db.object("/dotsGame/players/player1/name").set(this.ngUsername);
    console.log("user1");
    this.showAlert();
    this.startGame = this.db.object("/dotsGame/freeSlots").valueChanges().subscribe(data => {
      if (data == false) {
        this.alertVar.dismiss();
        console.log("user1 Waiting");
        this.startGame.unsubscribe();
        this.navCtrl.setRoot(HomePage,{userType:true});
      }
    })
  }

  resetGame() {
    console.log("reset")
    this.db.object("/dotsGame").set({
      players:
      {
        player1:
        { name: "", score: 0, turn: false },
        player2:
        { name: "", score: 0, turn: true }
      },
      freeSlots: true,
      gameObject: this.buttonArray1Count
    });
  }

  showAlert() {
    this.alertVar = this.alertCtrl.create({
      message: "waiting for other user to join.",
    })
    this.alertVar.present();
  }
}