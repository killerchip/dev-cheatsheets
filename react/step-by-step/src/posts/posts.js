/* eslint-disable quotes */
import PropTypes from 'prop-types';

export const initialPostsList = [
    {
        id: 1,
        title: 'Red Planet InSight: Why Do We Keep Going Back to Mars?',
        postText:
            /* eslint-disable max-len */
            // eslint-disable-next-line prettier/prettier
            "Humanity has gazed at Mars for centuries, dreaming of what might lie on its dust-orange surface. As our telescopes improved, so did our picture of the Red Planet, though scientists' interpretation of that growing detail has not always been accurate (see: Mars canals). The first mission to successfully view Mars up close, Mariner 4, beamed home a handful of blurry crater views, but the missions that followed — those that succeeded; the overall failure rate is upward of 50 percent for Mars-bound spacecraft — painted a clearer picture of the planet's dusty, bouldery present.",
        /* eslint-enable max-len */
        date: 1515785968000,
        categoryId: 2
    },
    {
        id: 2,
        // eslint-disable-next-line prettier/prettier
        title: "Salvador Dali's AI clone will welcome visitors to his museum",
        postText:
            /* eslint-disable max-len */
            // eslint-disable-next-line prettier/prettier
            "If you're planning a trip to the Dali Museum this spring, you might meet an unexpected guest: namely, Salvador Dali himself. The St. Petersburg, Florida venue has announced that an AI recreation of the artist will grace screens across the museum starting in April. A team from Goodby Silverstein & Partners used footage of Dali to train a machine learning system on how to mimic the artist's face, and superimposed that on an actor with a similar physique.",
        /* eslint-enable max-len */
        date: 1546526368000,
        categoryId: 1
    },
    {
        id: 3,
        // eslint-disable-next-line prettier/prettier
        title: "Win over Roger Federer was Stefanos Tsitsipas's turning point.",
        postText:
            /* eslint-disable max-len */
            // eslint-disable-next-line prettier/prettier
            "n an interview to Tennis Channel, Serena Williams's coach Patrick Mouratoglou commented on Stefanos Tsitsipas's potential. The Greek reached his maiden Grand Slam semifinal at the Australian Open losing to Rafael Nadal.",
        /* eslint-enable max-len */
        date: 1548686368000,
        categoryId: 3
    }
];

export const PostShape = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    postText: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    categoryId: PropTypes.number.isRequired
};
