import React from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends React.Component {
  state = { movies: getMovies() };

  handleDeleteMovie = movieId => {
    const updatedMovieList = this.state.movies.filter(
      movie => movie._id !== movieId
    );
    this.setState({ movies: updatedMovieList });
  };

  renderListOfMovies() {
    if (this.state.movies.length > 0) {
      return (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
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
      );
    }
  }

  render() {
    return (
      <div>
        {this.state.movies.length > 0 && (
          <h5>Showing {this.state.movies.length} movies in the database.</h5>
        )}
        {this.state.movies.length === 0 && (
          <h5>There are no movies in the database.</h5>
        )}
        {this.renderListOfMovies()}
      </div>
    );
  }
}

export default Movies;