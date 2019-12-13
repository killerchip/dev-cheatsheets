import React from 'react';
import PropTypes from 'prop-types';
import { CategoryShape } from './categories.js';

export class CategoriesListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEnabled: props.category.isEnabled
        };

        this.onCheckboxChange = this.onCheckboxChange.bind(this);
    }

    onCheckboxChange(event) {
        const { category, onActivationChange } = this.props;
        const { id } = category;
        const newState = event.target.checked;

        this.setState({ isEnabled: newState });
        onActivationChange(id, newState);
    }

    render() {
        const { category } = this.props;
        const { id, name } = category;
        const { isEnabled } = this.state;

        return (
            <label htmlFor={`${id}`} className="pure-checkbox">
                <input
                    id={`${id}`}
                    type="checkbox"
                    checked={isEnabled}
                    onChange={this.onCheckboxChange}
                />{' '}
                {name}
            </label>
        );
    }
}

CategoriesListItem.propTypes = {
    category: PropTypes.shape(CategoryShape).isRequired,
    onActivationChange: PropTypes.func.isRequired
};
