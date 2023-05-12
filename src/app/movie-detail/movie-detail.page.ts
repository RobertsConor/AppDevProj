import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService, Movie } from '../movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {
  movie!: Movie;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const movieId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    if (!isNaN(movieId)) {
      this.movieService.getMovieDetails(movieId.toString()).subscribe(movie => {
        this.movie = movie;
      });
      
    }
  }
}
