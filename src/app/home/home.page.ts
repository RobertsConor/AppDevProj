import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Browser } from '@capacitor/browser' // import Browser from Capacitor Browser plugin

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private navCtrl: NavController) {}

  // navigate to the UpcomingPage
  goToUpcomingPage() {
    this.navCtrl.navigateForward('/upcoming');
  }

  // navigate to the FavouritesPage
  goToFavouritesPage() {
    this.navCtrl.navigateForward('/favourites')
  }

  // navigate to the TrendingPage
  goToTrendingPage() {
    this.navCtrl.navigateForward('/trending')
  }

  // open the browser to go to the Cinema page
  goToThisYearPage() {
    this.openBrowser();
  }

  // open the browser using the Capacitor Browser plugin
  async openBrowser() {
    await Browser.open({ url: 'https://www.omniplex.ie/cinema/galway'});
  }
}
