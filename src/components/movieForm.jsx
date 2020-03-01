import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/fakeGenreService";
import { getMovie } from "../services/fakeMovieService";
import { saveMovie } from "./../services/fakeMovieService";

class MovieForm extends Form {
   state = {
      data: {
         title: "",
         genreId: "",
         numberInStock: "",
         dailyRentalRate: ""
      },
      errors: {},
      genres: []
   };

   schema = {
      _id: Joi.string(),
      title: Joi.string()
         .required()
         .label("Title"),
      genreId: Joi.string()
         .required()
         .label("Genre"),
      numberInStock: Joi.number()
         .min(1)
         .max(100)
         .required()
         .label("Number in Stock"),
      dailyRentalRate: Joi.number()
         .min(1)
         .max(10)
         .label("Rate")
   };

   componentDidMount() {
      const genres = getGenres();
      this.setState({ genres });

      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const movie = getMovie(movieId);
      if (!movie) return this.props.history.replace("/not-found");

      this.setState({ data: this.mapToViewModel(movie) });
   }

   mapToViewModel(movie) {
      return {
         _id: movie._id,
         title: movie.title,
         genreId: movie.genre._id,
         numberInStock: movie.numberInStock,
         dailyRentalRate: movie.dailyRentalRate
      };
   }

   handleSave = () => {
      this.props.history.push("/movies");
   };

   doSubmit = () => {
      saveMovie(this.state.data);

      this.props.history.push("/movies");
   };

   render() {
      return (
         <div>
            <h3>Movie Form</h3>
            <form onSubmit={this.handleSubmit}>
               {this.renderInput("title", "Title")}
               {this.renderSelect("genreId", "Genre", this.state.genres)}
               {this.renderInput("numberInStock", "Number in Stock")}
               {this.renderInput("dailyRentalRate", "Rate")}
               {this.renderButton("Save")}
            </form>
         </div>
      );
   }
}

export default MovieForm;
