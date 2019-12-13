import PropTypes from 'prop-types';

export const initialCategoriesList = [
    {
        id: 1,
        name: 'Arts',
        isEnabled: true
    },
    {
        id: 2,
        name: 'Science',
        isEnabled: true
    },
    {
        id: 3,
        name: 'Sports',
        isEnabled: true
    }
];

export const CategoryShape = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    isEnabled: PropTypes.bool.isRequired
};
