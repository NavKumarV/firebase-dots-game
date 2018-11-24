import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import { UserNamePage } from "../user-name/user-name";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    blockAlertUser2: boolean=false;
    blockAlertUser1: boolean=false;
    playerAlert: any;
    alertVar: any;
  player1turn: any;
  player2turn: any;
  player1data: any;
  player2data: any;
  player1: any;
  player2: any;
  userType: boolean;
  playerTurns: any;
  player1Details: any;
  player2Details: any;
  public dotGame: any;
  userVal: string = "";
  public rowCount = [0, 1, 2];
  public colCount = [0, 1, 2, 4];
  player1Count: number = 0;
  player2Count: number = 0;
  user1Turn: boolean;
  user2Turn: boolean;
  public buttonArray1Count: any = [[{ clicked: false, x: 0, y: 0, val: "" }, { clicked: false, x: 0, y: 1, val: "" }, { clicked: false, x: 0, y: 2, val: "" }, { clicked: false, x: 0, y: 3, val: "" }, { clicked: false, x: 0, y: 4, val: "" }, { clicked: false, x: 0, y: 5, val: "" }, { clicked: false, x: 0, y: 6, val: "" }],
  [{ clicked: false, x: 1, y: 0, val: "" }, { clicked: false, x: 1, y: 1, val: "" }, { clicked: false, x: 1, y: 2, val: "" }, { clicked: false, x: 1, y: 3, val: "" }, { clicked: false, x: 1, y: 4, val: "" }, { clicked: false, x: 1, y: 5, val: "" }, { clicked: false, x: 1, y: 6, val: "" }],
  [{ clicked: false, x: 2, y: 0, val: "" }, { clicked: false, x: 2, y: 1, val: "" }, { clicked: false, x: 2, y: 2, val: "" }, { clicked: false, x: 2, y: 3, val: "" }, { clicked: false, x: 2, y: 4, val: "" }, { clicked: false, x: 2, y: 5, val: "" }, { clicked: false, x: 2, y: 6, val: "" }],
  [{ clicked: false, x: 3, y: 0, val: "" }, { clicked: false, x: 3, y: 1, val: "" }, { clicked: false, x: 3, y: 2, val: "" }, { clicked: false, x: 3, y: 3, val: "" }, { clicked: false, x: 3, y: 4, val: "" }, { clicked: false, x: 3, y: 5, val: "" }, { clicked: false, x: 3, y: 6, val: "" }],
  [{ clicked: false, x: 4, y: 0, val: "" }, { clicked: false, x: 4, y: 1, val: "" }, { clicked: false, x: 4, y: 2, val: "" }, { clicked: false, x: 4, y: 3, val: "" }, { clicked: false, x: 4, y: 4, val: "" }, { clicked: false, x: 4, y: 5, val: "" }, { clicked: false, x: 4, y: 6, val: "" }],
  [{ clicked: false, x: 5, y: 0, val: "" }, { clicked: false, x: 5, y: 1, val: "" }, { clicked: false, x: 5, y: 2, val: "" }, { clicked: false, x: 5, y: 3, val: "" }, { clicked: false, x: 5, y: 4, val: "" }, { clicked: false, x: 5, y: 5, val: "" }, { clicked: false, x: 5, y: 6, val: "" }]
  ];
  // public buttonArray2Count = [[{ clicked: false, x: 0, y: 0 }, { clicked: false, x: 0, y: 1 }, { clicked: false, x: 0, y: 2 }]];
  public arrayLength = this.buttonArray1Count.length;
  constructor(public navCtrl: NavController, public navParm: NavParams,
    public db: AngularFireDatabase, public alertCtrl: AlertController) {

    this.userType = this.navParm.get("userType");

    if(this.userType){
      this.showAlert("Other player turn");
      this.player1turn=this.db.object("/dotsGame/players/player1/turn").valueChanges().subscribe(data => {
        if(data){
          this.blockAlertUser1 = true;
          this.playerAlert.present();
        }
        else{
          this.blockAlertUser1 = false;
          this.playerAlert.dismiss();
          this.showAlert("Other player turn");
        }
    })
  }else{
      this.showAlert("Other player turn");
      this.player2turn=this.db.object("/dotsGame/players/player2/turn").valueChanges().subscribe(data => {
      if(data){
          this.blockAlertUser2 = true;
          this.playerAlert.present();
        }
        else{
          this.blockAlertUser2 = false;
          this.playerAlert.dismiss();
          this.showAlert("Other player turn");
        }
    })
    }

    this.player1data = this.db.object("/dotsGame/players/player1/name").valueChanges().subscribe(data => {
      this.player1 = data;
      this.player1data.unsubscribe();
    })
    console.log(this.player1);
    this.player2data = this.db.object("/dotsGame/players/player2/name").valueChanges().subscribe(data => {
      this.player2 = data;
      this.player2data.unsubscribe();
    })

    this.user1Turn = true;
    this.user2Turn = false;
    console.log(this.buttonArray1Count);

    this.dotGame = this.db.object('/dotsGame/gameObject').valueChanges().subscribe(data => {
      this.buttonArray1Count = data;
      console.log(this.buttonArray1Count);
    });

    this.player1Details = this.db.object('/dotsGame/players/player1/score').valueChanges().subscribe(data => {
      this.player1Count = Number(data);
      this.compareScore();
      
    })
    this.player2Details = this.db.object('/dotsGame/players/player2/score').valueChanges().subscribe(data => {
      this.player2Count = Number(data);
      this.compareScore();
    })
    this.playerTurns = this.db.object('/dotsGame/players/player1/turn').valueChanges().subscribe(data => {
      console.log(data);
      if (data == true) {
        this.user1Turn = false;
        this.user2Turn = true;
      }
      else {
        this.user1Turn = true;
        this.user2Turn = false;
      }
    })

//  V2bg@123
  }

  markLine(val) {
    console.log(val);
    this.buttonArray1Count[val.x][val.y].clicked = true;
    //correct
    if (val.y == 0) {
      if (this.buttonArray1Count[val.x][val.y].clicked == true && this.buttonArray1Count[val.x][(val.y + 1)].clicked == true &&
        this.buttonArray1Count[val.x][(val.y + 2)].clicked == true && this.buttonArray1Count[(val.x + 1)][(val.y + 1)].clicked == true) {
        console.log("starting line win");
        this.changeValue();
        this.buttonArray1Count[val.x][(val.y + 1)].val = String(this.userVal);
        this.playerValueChange(1);
      }
      else {
        this.playerChange();
      }
    }
    //correct
    if (val.y == (this.buttonArray1Count[0].length - 1)) {
      if (this.buttonArray1Count[val.x][val.y].clicked == true && this.buttonArray1Count[val.x][(val.y - 1)].clicked == true &&
        this.buttonArray1Count[val.x][(val.y - 2)].clicked == true && this.buttonArray1Count[(val.x + 1)][(val.y - 1)].clicked == true) {
        console.log("Ending line win");
        this.changeValue();
        this.buttonArray1Count[val.x][(val.y - 1)].val = String(this.userVal);
        this.playerValueChange(1);
      }
      else {
        this.playerChange();
      }
    }
    //correct
    if (val.x == 0 && (val.y % 2 == 1)) {
      if (this.buttonArray1Count[val.x][val.y].clicked == true && this.buttonArray1Count[val.x][(val.y - 1)].clicked == true &&
        this.buttonArray1Count[val.x][(val.y + 1)].clicked == true && this.buttonArray1Count[(val.x + 1)][(val.y)].clicked == true) {
        console.log("Top line win");
        this.changeValue();
        this.buttonArray1Count[val.x][(val.y)].val = String(this.userVal);
        this.playerValueChange(1);
      }
      else {
        this.playerChange();
      }
    }
    //correct
    if (val.x == (this.buttonArray1Count.length - 1) && (val.y % 2 == 1)) {
      if (this.buttonArray1Count[val.x][val.y].clicked == true && this.buttonArray1Count[val.x - 1][(val.y - 1)].clicked == true &&
        this.buttonArray1Count[val.x - 1][(val.y + 1)].clicked == true && this.buttonArray1Count[(val.x - 1)][(val.y)].clicked == true) {
        console.log("Bottom line win");
        this.changeValue();
        this.buttonArray1Count[val.x - 1][(val.y)].val = String(this.userVal);
        this.playerValueChange(1);
      }
      else {
        this.playerChange();
      }
    }
    //correct
    if ((val.y != 0) && (val.y != (this.buttonArray1Count[0].length - 1)) && (val.y % 2 == 0)) {
      if (this.buttonArray1Count[val.x][val.y].clicked == true && this.buttonArray1Count[val.x][(val.y - 1)].clicked == true &&
        this.buttonArray1Count[val.x][(val.y - 2)].clicked == true && this.buttonArray1Count[(val.x + 1)][(val.y - 1)].clicked == true &&
        this.buttonArray1Count[val.x][(val.y + 2)].clicked == true && this.buttonArray1Count[(val.x + 1)][(val.y + 1)].clicked == true &&
        this.buttonArray1Count[val.x][(val.y + 1)].clicked == true) {
        console.log(" Both Center Vetrical");
        this.changeValue();
        this.buttonArray1Count[val.x][(val.y - 1)].val = String(this.userVal);
        this.buttonArray1Count[val.x][(val.y + 1)].val = String(this.userVal);
        this.playerValueChange(2);
      }
      //left
      else if (this.buttonArray1Count[val.x][val.y].clicked == true && this.buttonArray1Count[val.x][(val.y - 1)].clicked == true &&
        this.buttonArray1Count[val.x][(val.y - 2)].clicked == true && this.buttonArray1Count[(val.x + 1)][(val.y - 1)].clicked == true) {
        console.log(" Left Center Vetrical");
        this.changeValue();
        this.buttonArray1Count[val.x][(val.y - 1)].val = String(this.userVal);
        this.playerValueChange(1);
      }

      //right
      else if (this.buttonArray1Count[val.x][val.y].clicked == true && this.buttonArray1Count[val.x][(val.y + 1)].clicked == true &&
        this.buttonArray1Count[val.x][(val.y + 2)].clicked == true && this.buttonArray1Count[(val.x + 1)][(val.y + 1)].clicked == true) {
        console.log(" Right Center Vetrical");
        this.changeValue();
        this.buttonArray1Count[val.x][(val.y + 1)].val = String(this.userVal);
        this.playerValueChange(1);
      }
      else {
        this.playerChange();
      }
    }
    //correct
    if ((val.x > 0) && (val.x < this.buttonArray1Count.length - 1) && (val.y % 2 == 1)) {
      if (this.buttonArray1Count[val.x][val.y].clicked == true && this.buttonArray1Count[val.x - 1][(val.y - 1)].clicked == true &&
        this.buttonArray1Count[val.x - 1][(val.y)].clicked == true && this.buttonArray1Count[(val.x - 1)][(val.y + 1)].clicked == true &&
        this.buttonArray1Count[val.x][(val.y + 1)].clicked == true && this.buttonArray1Count[(val.x + 1)][(val.y)].clicked == true &&
        this.buttonArray1Count[val.x][(val.y - 1)].clicked == true) {
        console.log("Both Center Horizontal");
        this.changeValue();
        this.buttonArray1Count[val.x - 1][(val.y)].val = String(this.userVal);
        this.buttonArray1Count[val.x][(val.y)].val = String(this.userVal);
        this.playerValueChange(2);
      }
      //top
      else if (this.buttonArray1Count[val.x][val.y].clicked == true && this.buttonArray1Count[val.x - 1][(val.y - 1)].clicked == true &&
        this.buttonArray1Count[val.x - 1][(val.y)].clicked == true && this.buttonArray1Count[(val.x - 1)][(val.y + 1)].clicked == true) {
        console.log("Top Center Horizontal");
        this.changeValue();
        this.buttonArray1Count[val.x - 1][(val.y)].val = String(this.userVal);
        this.playerValueChange(1);
      }

      //bottom
      else if (this.buttonArray1Count[val.x][val.y].clicked == true && this.buttonArray1Count[val.x][(val.y - 1)].clicked == true &&
        this.buttonArray1Count[val.x][(val.y + 1)].clicked == true && this.buttonArray1Count[(val.x + 1)][(val.y)].clicked == true) {
        console.log(" Bottom Center Horizontal");
        this.changeValue();
        this.buttonArray1Count[val.x][(val.y)].val = String(this.userVal);
        this.playerValueChange(1);
      }
      else {
        this.playerChange();
      }
    }
  }

  changeValue(){
    if (this.user1Turn) {
      this.userVal = "O";
      console.log("O");
    }
    else{
      this.userVal = "X";
      console.log("X");
    }
  }

  playerValueChange(times: number) {
    if (this.user1Turn) {
      this.player1Count = this.player1Count + times;
      
      this.db.object("/dotsGame").set({
        players:
        {
          player1:
          { name: "", score: this.player1Count, turn: false },
          player2:
          { name: "", score: this.player2Count, turn: true }
        },
        freeSlots: true,
        gameObject: this.buttonArray1Count
      });
    }
    else {
      this.player2Count = this.player2Count + times;
      
      this.db.object("/dotsGame").set({
        players:
        {
          player1:
          { name: "", score: this.player1Count, turn: true },
          player2:
          { name: "", score: this.player2Count, turn: false }
        },
        freeSlots: true,
        gameObject: this.buttonArray1Count
      });
    }
  }

  playerChange() {
    if (this.user1Turn) {
      this.userVal = "X";
      console.log("X");
      this.db.object("/dotsGame").set({
        players:
        {
          player1:
          { name: "", score: this.player1Count, turn: true },
          player2:
          { name: "", score: this.player2Count, turn: false }
        },
        freeSlots: true,
        gameObject: this.buttonArray1Count
      });
    }
    else {
      this.userVal = "O";
      console.log("O");
      this.db.object("/dotsGame").set({
        players:
        {
          player1:
          { name: "", score: this.player1Count, turn: false },
          player2:
          { name: "", score: this.player2Count, turn: true }
        },
        freeSlots: true,
        gameObject: this.buttonArray1Count
      });
    }
  }

  compareScore(){
    // if ((this.player1Count + this.player2Count) == 3) {
    if ((this.player1Count + this.player2Count) == 15) {
        if (this.player1Count > this.player2Count) {
          if(this.blockAlertUser1 == this.blockAlertUser2 == false){
            this.playerAlert.dismiss();
          }
          alert("Ha aha ahaaaa player1 "+String(this.player1) +" won");
          this.navCtrl.setRoot(UserNamePage);
        }
        else {
          if(this.blockAlertUser1 == this.blockAlertUser2 == false){
            this.playerAlert.dismiss();
          }
          alert("He ehe eheeee player2 "+String(this.player2) +" won");
          this.navCtrl.setRoot(UserNamePage);          
        }
      }
  }

  showAlert(message) {
    this.playerAlert = this.alertCtrl.create({
      message: message,
      enableBackdropDismiss:false
    })
  }
}