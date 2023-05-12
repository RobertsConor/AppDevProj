export interface MovieApiResponse {
    results: Movie[];
   
  }
  
  export interface Movie {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;

  }
  