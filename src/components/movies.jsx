import React from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Movies extends React.Component {
   state = { movies: getMovies(), likes: [], pageSize: 4, currentPage: 1 };

   handleDeleteMovie = movieId => {
      const updatedMovieList = this.state.movies.filter(
         movie => movie._id !== movieId
      );
      this.setState({ movies: updatedMovieList });
   };

   handleLike = movie => {
      let movies = [...this.state.movies];
      const index = movies.indexOf(movie);
      movies[index] = { ...movies[index] };
      movies[index].liked = !movies[index].liked;
      this.setState({ movies });
   };

   handlePageChange = page => {
      this.setState({ currentPage: page });
   }

   renderListOfMovies() {
      
   }

   render() {
      const { movies: allMovies, currentPage, pageSize } = this.state;

      const movies = paginate(allMovies, currentPage, pageSize);

      return (
         <div>
            {movies.length > 0 && (
               <h5>
                  Showing {movies.length} movies in the database.
               </h5>
            )}
            {movies.length === 0 && (
               <h5>There are no movies in the database.</h5>
            )}
            <table className="table">
               <thead>
                  <tr>
                     <th scope="col">Title</th>
                     <th scope="col">Genre</th>
                     <th scope="col">Stock</th>
                     <th scope="col">Rate</th>
                     <th scope="col"></th>
                     <th scope="col"></th>
                  </tr>
               </thead>
               <tbody>
                  {movies.map(movie => (
                     <tr key={movie._id}>
                        <td>{movie.title}</td>
                        <td>{movie.genre.name}</td>
                        <td>{movie.numberInStock}</td>
                        <td>{movie.dailyRentalRate}</td>
                        <td>
                           <Like
                              movieId={movie._id}
                              liked={movie.liked}
                              onLike={() => this.handleLike(movie)}
                           />
                        </td>
                        <td>
                           <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => this.handleDeleteMovie(movie._id)}
                           >
                              Delete
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
            <Pagination 
               itemsCount={this.state.movies.length} 
               pageSize={this.state.pageSize} 
               onPageChange={this.handlePageChange} 
               currentPage={this.state.currentPage}
            />
         </div>
      );
   }
}

export default Movies;
