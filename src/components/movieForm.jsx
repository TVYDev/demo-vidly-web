import React from 'react';

class MovieForm extends React.Component {
    handleSave = () => {
        this.props.history.push('/movies');
    };

    render () {
        return (
            <React.Fragment>
                <h2>Movie Form {this.props.match.params.id}</h2>
                <button type="button" className="btn btn-primary" onClick={this.handleSave}>Save</button>
            </React.Fragment>
        );
    }
}

export default MovieForm;