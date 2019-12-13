import React from 'react';
import PropTypes from 'prop-types';
import { PostShape } from './posts.js';
import { CategoryShape } from '../categories/categories.js';
import { PostForm } from './post-form.js';
import { Post } from './post.js';

// eslint-disable-next-line react/prefer-stateless-function
export class EditablePostItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showForm: props.showForm
        };

        this.onEditPost = this.onEditPost.bind(this);
        this.onSubmitPost = this.onSubmitPost.bind(this);
        this.onHideForm = this.onHideForm.bind(this);
    }

    onEditPost() {
        this.setState({ showForm: true });
    }

    onSubmitPost(upsertPost) {
        const { onSubmitPost } = this.props;

        onSubmitPost(upsertPost);
        this.onHideForm();
    }

    onHideForm() {
        this.setState({ showForm: false });
    }

    render() {
        const { categories, post, onDelPost } = this.props;
        const { showForm } = this.state;

        return (
            <div className="EditablePostItem">
                {showForm ? (
                    <PostForm
                        categories={categories}
                        post={post}
                        onSubmitPost={this.onSubmitPost}
                        onHideForm={this.onHideForm}
                    />
                ) : (
                    <Post
                        post={post}
                        categories={categories}
                        onDelPost={onDelPost}
                        onEditPost={this.onEditPost}
                    />
                )}
            </div>
        );
    }
}

EditablePostItem.propTypes = {
    showForm: PropTypes.bool,
    categories: PropTypes.arrayOf(PropTypes.shape(CategoryShape)).isRequired,
    post: PropTypes.shape(PostShape).isRequired,
    onDelPost: PropTypes.func.isRequired,
    onSubmitPost: PropTypes.func.isRequired
};

EditablePostItem.defaultProps = {
    showForm: false
};
