import React from 'react';
import PropTypes from 'prop-types';
import './categories-list.css';
import { CategoriesListItem } from './categories-list-item.js';
import { CategoryShape } from './categories.js';

export const CategoriesList = ({ categories, onCategoryActivationChange }) => (
    <div className="CategoriesList">
        <h3>Categories</h3>
        <form className="categories-form pure-form pure-form-stacked">
            <fieldset>
                {categories.map(category => (
                    <CategoriesListItem
                        key={category.id}
                        category={category}
                        onActivationChange={onCategoryActivationChange}
                    />
                ))}
            </fieldset>
        </form>
    </div>
);

CategoriesList.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape(CategoryShape)).isRequired,
    onCategoryActivationChange: PropTypes.func.isRequired
};
