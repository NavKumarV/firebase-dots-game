import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { UserNamePage } from "../pages/user-name/user-name";
  var config = {
    apiKey: "YOUR_API_KEY",
    authDomain: "chat-bot-d1cd9.firebaseapp.com",
    databaseURL: "https://chat-bot-d1cd9.firebaseio.com",
    projectId: "chat-bot-d1cd9",
    storageBucket: "chat-bot-d1cd9.appspot.com",
    messagingSenderId: "SENDERS_ID"
  };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UserNamePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UserNamePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
