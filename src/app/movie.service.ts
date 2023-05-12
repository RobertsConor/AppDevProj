import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface MovieApiResponse {
  results: Movie[];
 
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  isFavourite: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  favourites: Movie[] = [];
  private baseUrl = 'https://api.themoviedb.org/3';
  private apiKey = 'f5bfc497612ad86ef334aff05b18dd39';

  constructor(private http: HttpClient) {}

  getUpcomingMovies(): Observable<Movie[]> {
    const url = `${this.baseUrl}/movie/upcoming?api_key=${this.apiKey}`;

    return this.http.get<MovieApiResponse>(url).pipe(
      map(response => {
        const today = new Date();
        const movies = response.results.filter(movie => {
          const releaseDate = new Date(movie.release_date);
          return releaseDate >= today;
        });
        return movies;
      })
    );
  }


  //Movie Details function
  getMovieDetails(movieId: string): Observable<Movie> {
    const url = `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}`;
    return this.http.get<Movie>(url);
  }
  
  //Get Trending Movies
  getTrendingMovies(): Observable<Movie[]> {
    const url = `${this.baseUrl}/trending/movie/week?api_key=${this.apiKey}`;

    return this.http.get<MovieApiResponse>(url).pipe(
      map(response => {
        const today = new Date();
        return response.results.filter(movie => {
          const releaseDate = new Date(movie.release_date);
          return releaseDate <= today;
        });
      })
    );
  }

  //addToFavourites function
  addToFavourites(movie: Movie) {
    this.favourites.push(movie);
  }

  //getFavourites function
  getFavourites(): Movie[] {
    return this.favourites;
  }
  

  //removeFromLikedMovies function
  removeFromLikedMovies(movie: Movie) {
    const index = this.favourites.findIndex(m => m.id === movie.id);
    if (index >= 0) {
      this.favourites.splice(index, 1);
    }
  }
  
  

  
}

