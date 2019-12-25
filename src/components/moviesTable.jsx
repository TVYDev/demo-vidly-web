import React from 'react';
import Like from "./common/like";
import Table from './common/table';

class MoviesTable extends React.Component {
    columns = [
        { path: 'title', label: 'Title'},
        { path: 'genre.name', label: 'Genre'},
        { path: 'numberInStock', label: 'Stock'},
        { path: 'dailyRentalRate', label: 'Rate'},
        { 
            key: 'like', 
            content: movie => <Like movieId={movie._id} liked={movie.liked} onLike={() => this.props.onLike(movie)}/>  },
        { 
            key: 'delete',
            content: movie => <button type="button" className="btn btn-danger" onClick={() => this.props.onDelete(movie._id)}>Delete</button>
        },
    ];


    render () {
        const { movies, sortColumn, onSort } = this.props;

        return (
            <Table columns={this.columns} data={movies} sortColumn={sortColumn} onSort={onSort}/>  
        );
    }
};

export default MoviesTable;