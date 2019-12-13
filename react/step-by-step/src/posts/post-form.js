import React from 'react';
import PropTypes from 'prop-types';
import { CategoryShape } from '../categories/categories.js';
import { PostShape } from './posts.js';
import './post-form.css';

// eslint-disable-next-line no-confusing-arrow
const getSubmitButtonText = post => (post.id ? 'Update' : 'Add');
const defaultForm = {
    id: 0,
    title: '',
    postText: '',
    categoryId: 0,
    date: 0
};

export class PostForm extends React.Component {
    constructor(props) {
        super(props);

        const { post, categories } = props;
        this.state = {
            post: {
                ...post,
                categoryId: post.categoryId || categories[0].id
            }
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onPostTextChange = this.onPostTextChange.bind(this);
        this.updateForm = this.updateForm.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();

        const { onSubmitPost } = this.props;
        const { post } = this.state;

        const now = new Date();
        const fullPost = {
            ...post,
            date: now.getTime()
        };
        onSubmitPost(fullPost);
    }

    onTitleChange(event) {
        this.updateForm('title', event.target.value);
    }

    onCategoryChange(event) {
        this.updateForm('categoryId', Number(event.target.value));
    }

    onPostTextChange(event) {
        this.updateForm('postText', event.target.value);
    }

    onCancelClick() {
        const { post, onHideForm } = this.props;
        if (post.id) {
            this.resetForm();
            onHideForm();
        } else {
            this.clearForm();
        }
    }

    updateForm(field, value) {
        const { post } = this.state;
        this.setState({
            post: {
                ...post,
                [field]: value
            }
        });
    }

    resetForm() {
        const { post } = this.props;

        this.setState({
            post: {
                ...post
            }
        });
    }

    clearForm() {
        const { categories } = this.props;

        this.setState({
            post: {
                ...defaultForm,
                categoryId: categories[0].id
            }
        });
    }

    render() {
        const { categories } = this.props;
        const { post } = this.state;

        return (
            <div className="PostForm">
                <form
                    className="post-form-form pure-form"
                    onSubmit={this.onSubmit}
                >
                    <fieldset>
                        <div className="pure-g">
                            <div className="form-field-column pure-u-2-3">
                                <label htmlFor="title">
                                    Title <br />
                                    <input
                                        id="title"
                                        type="text"
                                        value={post.title}
                                        onChange={this.onTitleChange}
                                    />
                                </label>
                            </div>
                            <div className="form-field-column pure-u-1-3">
                                {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                                <label htmlFor="category">
                                    Category <br />
                                    <select
                                        id="category"
                                        value={post.categoryId}
                                        onChange={this.onCategoryChange}
                                    >
                                        {categories.map(category => (
                                            <option
                                                value={category.id}
                                                key={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                        </div>
                        <div className="form-field-column">
                            <label htmlFor="postText">
                                Text <br />
                                <textarea
                                    id="postText"
                                    className="post-text-area"
                                    value={post.postText}
                                    onChange={this.onPostTextChange}
                                />
                            </label>
                        </div>
                        <div className="form-field-column form-buttons-container">
                            <button
                                type="submit"
                                className="pure-button pure-button-primary"
                            >
                                {getSubmitButtonText(post)}
                            </button>
                            <button
                                type="button"
                                className="pure-button"
                                onClick={this.onCancelClick}
                            >
                                Cancel
                            </button>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}

PostForm.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape(CategoryShape)).isRequired,
    post: PropTypes.shape(PostShape),
    onSubmitPost: PropTypes.func.isRequired,
    onHideForm: PropTypes.func
};

PostForm.defaultProps = {
    post: { ...defaultForm },
    onHideForm() {} // do nothing
};
