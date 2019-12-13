import React from 'react';
import './App.css';
import { CategoriesList } from './categories/categories-list.js';
import { PostsColumn } from './posts/posts-column.js';
import { initialCategoriesList } from './categories/categories.js';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: JSON.parse(JSON.stringify(initialCategoriesList)) // immutable copy
        };

        this.onCategoryActivationChange = this.onCategoryActivationChange.bind(
            this
        );
    }

    onCategoryActivationChange(id, newState) {
        const { categories } = this.state;
        const newCategoryList = categories.map(category => {
            return category.id === id
                ? { ...category, isEnabled: newState }
                : { ...category };
        });
        this.setState({ categories: newCategoryList });
    }

    render() {
        const { categories } = this.state;
        return (
            <div className="App">
                <div className="pure-g">
                    <div className="pure-u-1-5">
                        <CategoriesList
                            categories={categories}
                            onCategoryActivationChange={
                                this.onCategoryActivationChange
                            }
                        />
                    </div>
                    <div className="pure-u-4-5">
                        <PostsColumn categories={categories} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
