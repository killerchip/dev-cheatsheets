import React from 'react';
import PropTypes from 'prop-types';
import { PostShape } from './posts.js';
import { CategoryShape } from '../categories/categories.js';
import { EditablePostItem } from './editable-post-item.js';

const showForms = false;

export const PostsList = ({ categories, posts, onDelPost, onSubmitPost }) => (
    <div className="PostsList">
        {posts.map(post => (
            <EditablePostItem
                key={post.id}
                post={post}
                categories={categories}
                showForm={showForms}
                onDelPost={onDelPost}
                onSubmitPost={onSubmitPost}
            />
        ))}
    </div>
);

PostsList.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape(CategoryShape)).isRequired,
    posts: PropTypes.arrayOf(PropTypes.shape(PostShape)).isRequired,
    onDelPost: PropTypes.func.isRequired,
    onSubmitPost: PropTypes.func.isRequired
};
