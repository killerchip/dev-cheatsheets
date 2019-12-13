import React from 'react';
import PropTypes from 'prop-types';
import { PostShape } from './posts.js';
import { CategoryShape } from '../categories/categories.js';
import './post.css';

const getCategoryNameFromId = (id, categories) =>
    categories.filter(category => category.id === id)[0].name;

const getDateFromEpoch = epochDate => {
    const date = new Date(epochDate);
    return date.toDateString();
};

export class Post extends React.Component {
    constructor(props) {
        super(props);

        this.onDelClick = this.onDelClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
    }

    onDelClick() {
        const { onDelPost, post } = this.props;
        onDelPost(post.id);
    }

    onEditClick() {
        const { onEditPost } = this.props;
        onEditPost();
    }

    render() {
        const { post, categories } = this.props;
        return (
            <div className="Post">
                <h2>{post.title}</h2>
                <div className="pure-g">
                    <div className="pure-u-4-5">
                        <h4>
                            {getCategoryNameFromId(post.categoryId, categories)}
                        </h4>
                    </div>
                    <div className="post-date pure-u-1-5">
                        <p>{getDateFromEpoch(post.date)}</p>
                    </div>
                </div>
                <p className="post-text">{post.postText}</p>
                <div className="post-buttons-container">
                    <button
                        type="button"
                        className="pure-button"
                        onClick={this.onEditClick}
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        className="pure-button button-danger"
                        onClick={this.onDelClick}
                    >
                        Delete
                    </button>
                </div>
            </div>
        );
    }
}

Post.propTypes = {
    post: PropTypes.shape(PostShape).isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape(CategoryShape)).isRequired,
    onDelPost: PropTypes.func.isRequired,
    onEditPost: PropTypes.func.isRequired
};
