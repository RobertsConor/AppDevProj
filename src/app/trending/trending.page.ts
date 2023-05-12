import { Component, OnInit } from '@angular/core';
import { MovieService, Movie } from '../movie.service';  // import MovieService and Movie interface
import { Router } from '@angular/router';  // import Router
import { ToastController } from '@ionic/angular';  // import ToastController

@Component({
  selector: 'app-trending',
  templateUrl: './trending.page.html',
  styleUrls: ['./trending.page.scss'],
})
export class TrendingPage implements OnInit {
  movies: Movie[] = [];  // initialize empty array to hold movies

  constructor(
    private movieService: MovieService,
    private router: Router,
    private toastController: ToastController
  ) {}

  // function to show details of selected movie
  async showMovieDetails(movieId: number) {
    await this.router.navigate(['/movie-detail', movieId.toString()]);
  }

  // function to add movie to favorites
  async addToFavourites(movie: Movie) {
    this.movieService.addToFavourites(movie);  // call addToFavourites function of MovieService
    const toast = await this.toastController.create({
      message: 'Movie added to favorites!',
      duration: 2000
    });
    toast.present();  // present toast message
  }

  ngOnInit() {
    this.movieService.getTrendingMovies().subscribe((movies) => {  // get trending movies from MovieService
      const today = new Date();  // get current date
      this.movies = movies.filter((movie) => {  // filter movies based on release date
        const releaseDate = new Date(movie.release_date);  // get release date of movie
        return releaseDate <= today;  // return movies that have been released
      });
    });
  }
}
