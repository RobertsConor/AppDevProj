import { Component, OnInit } from '@angular/core';
import { MovieService, Movie } from '../movie.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.page.html',
  styleUrls: ['./upcoming.page.scss'],
})
export class UpcomingPage implements OnInit {

  // Array to store upcoming movies
  movies: Movie[] = [];

  constructor(
    private movieService: MovieService, // Inject the MovieService
    private router: Router, // Inject the Router
    private toastController: ToastController // Inject the ToastController
  ) {}

  // Function to navigate to movie details page
  showMovieDetails(movieId: number) {
    this.router.navigate(['/movie-detail', movieId.toString()]);
  }

  // Function to add movie to favourites
  async addToFavourites(movie: Movie) {
    this.movieService.addToFavourites(movie); // Call the addToFavourites method of the MovieService
    const toast = await this.toastController.create({ // Create a ToastController to display message
      message: 'Movie added to favorites!', 
      duration: 2000, 
      position: 'bottom',
    });
    toast.present(); // Display the toast message
  }

  ngOnInit() {
    // Call the getUpcomingMovies method of the MovieService and subscribe to the observable
    this.movieService.getUpcomingMovies().subscribe((movies) => {
      this.movies = movies; // Set the movies array to the returned array of movies
    });
  }
}
