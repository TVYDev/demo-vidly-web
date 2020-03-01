import React from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import _ from "lodash";
import SearchBox from "./searchBox";

class Movies extends React.Component {
   state = {
      movies: [],
      genres: [],
      likes: [],
      pageSize: 4,
      currentPage: 1,
      selectedGenre: null,
      searchQuery: "",
      sortColumn: {
         path: "title",
         order: "asc"
      }
   };

   componentDidMount() {
      const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

      this.setState({
         movies: getMovies(),
         genres
      });
   }

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

   handleSort = sortColumn => {
      this.setState({ sortColumn });
   };

   handlePageChange = page => {
      this.setState({ currentPage: page });
   };

   handleGenreSelect = genre => {
      this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
   };

   handleSearch = query => {
      this.setState({
         searchQuery: query,
         selectedGenre: null,
         currentPage: 1
      });
   };

   getPageData = () => {
      const {
         movies: allMovies,
         currentPage,
         pageSize,
         selectedGenre,
         sortColumn,
         searchQuery
      } = this.state;

      let filtered = allMovies;
      if (searchQuery) {
         filtered = allMovies.filter(m =>
            m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
         );
      } else if (selectedGenre && selectedGenre._id) {
         filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);
      }

      const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

      const movies = paginate(sorted, currentPage, pageSize);

      return { totalCount: filtered.length, data: movies };
   };

   render() {
      const { totalCount, data } = this.getPageData();

      return (
         <div className="row">
            <div className="col-3">
               <ListGroup
                  items={this.state.genres}
                  onItemSelect={this.handleGenreSelect}
                  selectedItem={this.state.selectedGenre}
               />
            </div>
            <div className="col">
               <Link
                  to={"/movies/new"}
                  className="btn btn-primary"
                  style={{ marginBottom: "10px" }}
               >
                  New Movie
               </Link>
               {totalCount > 0 && (
                  <h5>Showing {totalCount} movies in the database.</h5>
               )}
               {totalCount === 0 && (
                  <h5>There are no movies in the database.</h5>
               )}
               <SearchBox
                  value={this.state.searchQuery}
                  onChange={this.handleSearch}
               />
               <MoviesTable
                  movies={data}
                  onLike={this.handleLike}
                  onDelete={this.handleDeleteMovie}
                  onSort={this.handleSort}
                  sortColumn={this.state.sortColumn}
               />
               <Pagination
                  itemsCount={totalCount}
                  pageSize={this.state.pageSize}
                  onPageChange={this.handlePageChange}
                  currentPage={this.state.currentPage}
               />
            </div>
         </div>
      );
   }
}

export default Movies;
