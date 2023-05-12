import { Component, OnInit } from '@angular/core';
import { MovieService, Movie } from '../movie.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage {
  likedMovies: Movie[] = []; // Declare an array to hold liked movies.

  constructor(private movieService: MovieService, private toastCtrl: ToastController) {} // Inject MovieService and ToastController.

  ionViewDidEnter() { // Lifecycle method that fires when the page has fully entered and is now the active page.
    this.likedMovies = this.movieService.getFavourites(); // Get all liked movies from the MovieService.
  }

  async removeFromFavourites(movie: Movie) { // Remove a movie from the favourites.
    this.movieService.removeFromLikedMovies(movie); // Call the remove method in the MovieService.
    const toast = await this.toastCtrl.create({ // Create a toast to show a message that the movie has been removed.
      message: 'Movie removed from favourites',
      duration: 2000 // Set the duration of the toast.
    });
    toast.present(); // Show the toast.
  }
}
