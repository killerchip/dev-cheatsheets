# Handling Asynchronous fetching of data with Redux

_This article is a quick explanation and guide on how to use `redux` with async functions. Most common case is fetching data from remote source (eg. an API on the internet)._

A full working example can be found here:
[https://snack.expo.io/@killerchip/redux-async](https://snack.expo.io/@killerchip/redux-async)

The example is build with React-Native, but the core concepts are exactly the same for web.

## What we know so far

Up to now you should be familiar with the classic `redux` model. In short:

* A state is stored centrally in a `store`.
* The UI subscribes to state via the `connect` HOC from `react-redux`. It renders and re-renders, following changes in the state.
* State changes are launched with the help of _action-creators_. An _action creator_ function actually return an _action-object_, which has at least the `type` property.
* The _action-object_ is passed to `redux`'s `dispatch` function, which eventually passes it to the `reducer` function, we define.
* The `reducer` function composes and returns a new _state_, based on the received _action-object_.
* The returned _state_ is becoming new _state_ in the `store`.
* And the changes are propagated to UI parts that have subscribed to it.
* And the story goes on...

## Handling Asychronous operations with synchronous actions

Let's keep it simple. Imagine we have a simple app, fetching popular cat names from the internet. The app typically:
* Display a list of fetched cat names.
* Display a message, icon, or in general a component when it is actually fetching data from the internet.
* If the cat names are fetched OK, then we display them.
* If the fetch operation failed for some reason, display the error message.

So, for a simple list of cat names, we probably need the following _state_ form:
```
const initialState = {
    data: null,
    isFetching: false,
    error: null
}
```

* `data` holds the latest cat names fetched from the internet
* `isFetching` is indicating whether a fetch operation is in progress.
* `error` holds the error object from our last fetch operation, if it failed. If not, then `error` is `null`.

The above state should be enough to allow our UI display the information as requested above.

But launching a single fetch operation requires many changes in our state. Additonally these changes are occuring **asynchronously.**
Let's follow the chain of events...

_A fetch operation is lauched:_ The state updates to:
```
{
    isFetching: true
}
```

_Case 1: The fetch operation succeeds and returns `newData`:_
```
{
    data: newData,
    isFetching: false,
    error: null
}
```

_Case 2: The fetch operation fails with an `error` object:_
```
{
    data: null, // or we may choose to keep the old data from previoius fetch.
    isFetching: false,
    error: error
}
```

So we need the corresponding synchronous _action-objects_ and their _action-creators_:
```
export const CAT_NAMES = {
  START_FETCH: "CAT_NAMES_START_FETCH",
  FAIL_FETCH: "CAT_NAMES_FAIL_FETCH",
  FINISH_FETCH: "CAT_NAME_FINISH_FETCH"
};

export const startFetchCatNames = () => ({
  type: CAT_NAMES.START_FETCH
});

export const failFetchCatNames = error => ({
  type: CAT_NAMES.FAIL_FETCH,
  payload: error
});

export const finishFetchCatNames = data => ({
  type: CAT_NAMES.FINISH_FETCH,
  payload: data
});
```

And a `reducer` function that changes the state accordingly:
```
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAT_NAMES.START_FETCH:
      return { ...state, isFetching: true };
    case CAT_NAMES.FINISH_FETCH:
      return { isFetching: false, data: action.payload, error: null };
    case CAT_NAMES.FAIL_FETCH:
      return { ...state, isFetching: false, error: action.payload };
    default:
      return state;
  }
};
```

Now each time we wish to launch a new fetch action, we actually have to perform the asynchronous logic in a separate function that dispatches separate actions.
```
import store from './store.js' // or whatever module exports your store

function fetchCatNames = async url => {
    const {dispatch} = store;

    dispatch(startFetchCatNames()); // indicate that fetch has started

    try {
        const data = await fetchData(url);  // fetching data
        dispatch(finishFetchCatNames(data)); // handle success
    } catch (error) {
        dispatch(failFetchCatNames(error)); // handle failure
    }
}
```

Well this is a bit out of our `react-redux` pattern. We access the store directly. And can get things a bit more complicated. Wouldn't be nice if our function could be return by an _action-creator_ and be injected in our `redux` chain of action-processing seamlessly with the other good-old, _action objects_?

## `redux-thunk` middleware

Well, a more elegant approach to this, is the `redux-thunk` _middleware_.!

Wow! A lot of terms. Let's explain:

**Middleware:** `redux` allows for middleware plugins. This means that each action that is dispatched, before is delivered to `redux`'s reducer, can be handed-over to 3rd party tools. These can modify actions, tigger side actions, or even prevent redux actions from executing.

**`redux-thunk`:** This is a specific plugin that can handle asynchronous functions.
Actually `redux-thunk` will receive an action before it is handed-over to `reducer`. It will check the type of the action. If the action is a function, then it will execute it, and stop further proecessing. If it is an object, then it will pass it on untouched, and be done with it.

So we can pass our _asynchronous_ function as an action, and have it launched automatically by `redux-thunk`. The actual function will then trigger a series of `synchronous` events based on the progress of our fetch operation.

## Creating a _thunk_

A _thunk_ actually is a function that is returned from another function. So it defers execution for later. 

A _redux-thunk_ is a function that accepts `dispatch` as a parameter and uses it as it wishes to dispatch actual actions.
So in our case, our `fetchCatNames` function as _thunk_ should be:
```
function fetchCatNames = dispatch => {
    // our rest of logic does not change...
}
```

But what if we want to pass our own parameters to our _thunk_? Then we create our function (a _thunk_) via an action creator. So our special _action-creator_ returns a function and not a `redux` _action-object_.
```
export const fetchCatNames = url => async dispatch => { // <== notice the two fat-arrows
  dispatch(startFetchCatNames());

  try {
    const data = await fetchData(url);
    dispatch(finishFetchCatNames(data));
  } catch (error) {
    dispatch(failFetchCatNames(error));
  }
};
```

Actually we need to create our _thunk_ via an _action-creator_ also because it will be used by `react-redux` exactly in the same way as our typical synchronous _action-creators_. It's just that it returns a function (_thunk_) instead of an object, and it will be handled by `redux-thunk` middleware.

So when one or more components, need to call our asynchronous action, we pass its action creator the same way as we would with the our classic _action-creators_.
```
class ButtonBar extends React.PureComponent {
  fetchCatName = () => this.props.fetchCatNames('data'); // <== calling action creator is equivalent to passing it to dispatch. See below

  render() {
    return (
      <View style={styles.view}>
        <Button onPress={this.fetchCatName}>Fetch Names</Button>
      </View>
    );
  }
}

const mapActionsToProps = {
  fetchCatNames, // <== we pass our action creator to the component, here
};

export default connect(
  null,
  mapActionsToProps
)(ButtonBar);
```

> Note: In the above example we used the `mapActionsToProps` object. This is a form of `react-redux` that allows us directly to call our _action_creators_. In the background our action creators will be passed to the `dispatch` function as argument. [More details here](https://react-redux.js.org/using-react-redux/connect-mapdispatch).

> Note: we said that our _thunk_ receives `dispatch` as parameter. Well, it actually can also receive `getState` function, in case it needs the current state in its logic. [See more details here](https://daveceddia.com/what-is-a-thunk/).

## Applying the middleware

This is an easy step. We just apply the middleware using `applyMiddleware` function when we define our `store`.
```
import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import catNames from "./reducer";

const reducer = combineReducers({
  catNames
});

export default createStore(
    reducer,
    applyMiddleware(thunk) // <== Applying redux-thunk middleware
);
```

## Summary / Cheatsheet:

So in order to handle asynchronous operations with `redux` we need to define special functions that return other functions (_thunks_).

**Step 1**: we define the actions and state as normal. They are synchronous actions:

_actions.js_
```
export const CAT_NAMES = {
  START_FETCH: "CAT_NAMES_START_FETCH",
  FAIL_FETCH: "CAT_NAMES_FAIL_FETCH",
  FINISH_FETCH: "CAT_NAME_FINISH_FETCH"
};

export const startFetchCatNames = () => ({
  type: CAT_NAMES.START_FETCH
});

export const failFetchCatNames = error => ({
  type: CAT_NAMES.FAIL_FETCH,
  payload: error
});

export const finishFetchCatNames = data => ({
  type: CAT_NAMES.FINISH_FETCH,
  payload: data
});
```

_reduxer.js_
```
import { CAT_NAMES } from "./actions";

const initialState = {
  data: null,
  isFetching: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAT_NAMES.START_FETCH:
      return { ...state, isFetching: true };
    case CAT_NAMES.FINISH_FETCH:
      return { isFetching: false, data: action.payload, error: null };
    case CAT_NAMES.FAIL_FETCH:
      return { ...state, isFetching: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
```

**Step 2:** we define our asynchronous action creator that handles the asynchronous operations.

_actions.js_
```
import { fetchData } from '../api/client';

export const fetchCatNames = url => async dispatch => {
  dispatch(startFetchCatNames());

  try {
    const data = await fetchData(url);
    dispatch(finishFetchCatNames(data));
  } catch (error) {
    dispatch(failFetchCatNames(error));
  }
};
```

**Step 3:** When defining the store, we apply the `redux-thunk` middleware.

_store.js_
```
import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import catNames from "./reducer";

const reducer = combineReducers({
  catNames
});

export default createStore(reducer, applyMiddleware(thunk));
```

**Step 4:** we bind our action creator normally via the `connect` HOC of `react-redux`.

_ButtonBar.js_
```
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { fetchCatNames } from '../redux/actions';

class ButtonBar extends React.PureComponent {
  fetchCatName = () => this.props.fetchCatNames('data');

  render() {
    return (
      <View style={styles.view}>
        <Button onPress={this.fetchCatName}>Fetch Names</Button>
      </View>
    );
  }
}

const mapActionsToProps = { 
  fetchCatNames, // <== action-creator as prop function
};

export default connect(
  null,
  mapActionsToProps
)(ButtonBar);
```
