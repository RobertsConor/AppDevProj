import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Define interface for Movie API response
interface MovieApiResponse {
  results: Movie[];
}

// Define interface for Movie object
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
  // Initialize empty array for favourites
  favourites: Movie[] = [];
  
  // Set base URL and API key for API calls
  private baseUrl = 'https://api.themoviedb.org/3';
  private apiKey = 'f5bfc497612ad86ef334aff05b18dd39';

  constructor(private http: HttpClient) {}

  // Function to get upcoming movies from API
  getUpcomingMovies(): Observable<Movie[]> {
    const url = `${this.baseUrl}/movie/upcoming?api_key=${this.apiKey}`;

    return this.http.get<MovieApiResponse>(url).pipe(
      // Filter out movies with release date earlier than today
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

  // Function to get movie details by ID from API
  getMovieDetails(movieId: string): Observable<Movie> {
    const url = `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}`;
    return this.http.get<Movie>(url);
  }
  
  // Function to get trending movies from API
  getTrendingMovies(): Observable<Movie[]> {
    const url = `${this.baseUrl}/trending/movie/week?api_key=${this.apiKey}`;

    return this.http.get<MovieApiResponse>(url).pipe(
      // Filter out movies with release date later than today
      map(response => {
        const today = new Date();
        return response.results.filter(movie => {
          const releaseDate = new Date(movie.release_date);
          return releaseDate <= today;
        });
      })
    );
  }

  // Function to add a movie to favourites array
  addToFavourites(movie: Movie) {
    this.favourites.push(movie);
  }

  // Function to get favourites array
  getFavourites(): Movie[] {
    return this.favourites;
  }

  // Function to remove a movie from favourites array
  removeFromLikedMovies(movie: Movie) {
    const index = this.favourites.findIndex(m => m.id === movie.id);
    if (index >= 0) {
      this.favourites.splice(index, 1);
    }
  }
}
