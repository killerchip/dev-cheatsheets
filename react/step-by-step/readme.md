# Step-by-Step Guide for building a React page

This is a quick-reference guide on best practices for building a React page. It is a list of guidelines and not a full training or tutorial. Also it does assume a minimum set of react plugins and does not utilize more advanced methods like _Redux_ state management, _context_ etc. Also it does not involve remote data handling. It assumes that this will be done with further steps (not covered here).

In general it is a best practices collection for building a single react page.

## Overview

Here is the list overview:

1. Create a mockup of the page and break it up in component (2do: example)
1. Build the page with hardcoded data:
    1. Create a tree diagram with the component hierarchy (2do: example diagram)
        * Note in the diagram re-usable component(S)
    1. Build the app with dummy placeholder components, bottom-up (2do: example code)
    2. Build Up-bottom the app with hardcoded data
        * For lists/re-usable components just repeat the same 'hardcopy' component
        * (optionally) fine tune now your HTML/Styling of your page.
1. Update your diagram to be React-ready. (2do: example here)
    1. Update the diagram with with props and states initially needed by components.
        1. re-usable components get their data via `props`.
        1. forms maintain an internal state.
        1. mark other components that maintain an internal state.
    1. Update diagram with the real state owners.
        * Data states must be up-lifted to common anchestors where all involved components can get/update the data.
        * Don't be afraid to create components, just to hold data to be used by children components.
    1. Update diagram with the data-shapes to be used.
1. Start building components of the tree top-bottom. For each component:
    1. Note down 'incoming' props
    1. Note down 'states' that need to be initialized
    1. Note down 'props' to be passed to children
    1. Define `PropTypes` and `defaultProps` of the component.
    1. (optional) if the component will maintain a state, have a `constructor` or use event hooks, turn it into a class
    1. Pass incoming props directly to children (if applicable)
    1. Initialize states with incoming props, or initial values.
        * Use `constructor` to define `this.state` with empty/dummy data
        * Use `componentDidMount` to initialize the actual values
        * CAUTION: always pass immutable data to states and use `this.setState()`
    1. Pass state down to children (if applicable)
    1. Handle internal state changes (if applicable)
        1. Define state changer methods and `bind` them to `this`.
        1. Hook HTML component events to state changer methods.
1. Build a diagram with uplifting state changers (2do: example)
    * indicate which component will pass up state to which component
    * indicate the 'props` functions that will carry these states
1. Start building state uplifts top-bottom. 
    * For each component that accepts state changes from below.
        1. Define state changer methods and bind them this.
        1. Pass down to next component the state changer as property.
    * For each component that passes-down state changes
        1. Define in propTypes the incomping functions
        1. Pass them down to children as props
    * For consumers of the state changer props
        1. Define in PropTypes the incoming functions
        1. Define the state changers and bind them to this.
        1. The state changers should call now the 'props' and pass up state.
