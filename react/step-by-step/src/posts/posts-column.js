import React from 'react';
import PropTypes from 'prop-types';
import { CategoryShape } from '../categories/categories.js';
import { PostForm } from './post-form.js';
import { PostsList } from './posts-list.js';
import { initialPostsList } from './posts.js';

export class PostsColumn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: JSON.parse(JSON.stringify(initialPostsList))
        };

        this.getFilteredPostLsist = this.getFilteredPostsList.bind(this);
        this.onSubmitPost = this.onSubmitPost.bind(this);
        this.onDelPost = this.onDelPost.bind(this);
    }

    onDelPost(id) {
        const { posts } = this.state;
        this.setState({
            posts: posts
                .map(post => {
                    return post.id !== id ? { ...post } : undefined;
                })
                .filter(post => post) // remove undefined entries
        });
    }

    onSubmitPost(upsertPost) {
        const { posts } = this.state;
        const updatedList = posts.map(post => {
            return post.id === upsertPost.id ? { ...upsertPost } : { ...post };
        });

        if (!upsertPost.id) {
            const now = new Date();
            updatedList.push({ ...upsertPost, id: now.getTime() }); // timestamp as unique ID
        }

        this.setState({ posts: updatedList });
    }

    getFilteredPostsList() {
        const { categories } = this.props;
        const { posts } = this.state;

        const activeCategories = categories.filter(
            category => category.isEnabled
        );
        const activeCategoriesIds = activeCategories.map(
            category => category.id
        );

        return posts.filter(post =>
            activeCategoriesIds.includes(post.categoryId)
        );
    }

    render() {
        const { categories } = this.props;

        return (
            <div className="PostsColumn">
                <h1>News Post</h1>
                <PostForm
                    categories={categories}
                    onSubmitPost={this.onSubmitPost}
                />
                <PostsList
                    categories={categories}
                    posts={this.getFilteredPostsList()}
                    onDelPost={this.onDelPost}
                    onSubmitPost={this.onSubmitPost}
                />
            </div>
        );
    }
}

PostsColumn.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape(CategoryShape)).isRequired
};
