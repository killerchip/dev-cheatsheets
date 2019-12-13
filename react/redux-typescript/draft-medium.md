# React Redux Typescript Walkthrough example

_React_ and _React-Native_ are powerfull and popular libraries allowing to build web-apps and mobile-apps, while staying in the Javascript realm. And they almost always are used with _Redux_ state-management library, that allows managing state globally in the app and in central point. Microsoft's _Typescript_ on the other hand is a superset lnaguge of Javascript, that brings to the latter the benefits of typing-languages. 

Combine these technologies (React-Native, Redux, Typescript) you have a powerfull toolbox for building mobile-apps.

The following is an example-based guide/checklist on how to use the React-Native (and React) Typescript, and Redux altogether, to build and consume your states with your components. It assumes though that you are already familiar with [React-Native](https://facebook.github.io/react-native/docs/getting-started), [Redux](https://redux.js.org/introduction/getting-started), and [Typescript language](https://www.typescriptlang.org/). 

## Contents

The following topics are covered:

* Preparing the app
* Creating the state
* Writing Actions
* Writing the store
* Consuming the store
* Typed Components
* Using styles

## Preparing the App

### Initialize React-Native Typesscript project

To initialize a RN-Typescript project follow the instrucitons of this article:

[React-Typescript with ESlint and Prettier](http://killerchip.net/2019/07/19/2019-07-19-rn-ts-lint/)

Apart from setting up the project, it also guides you to setup _ESlint_ and _Prettier_ for better code quality control.

### Install Redux

Install the following packages for _Redux_, _React-Redux_ with _Typescript_ flavor.

In the root folder your projec:

```
npm install redux react-redux
npm install --save-dev redux-tools
npm install @types/react-redux -D
```

### Folder Layout

For my _Redux_ state management I like to use the following folder structure:

```
state/
    types.ts    // interfaces common to all domains
    store.ts    // redux store
    <domain>/
        actions.ts      // actions specific to domain
        reducer.ts      // the reducer of the domain
```

All types are gathered in the `types.ts` file. It can be also a folder, but in general I find it a good way to have types in one place, for other parts of the app to find them.

The `store.ts` will export the one **combined** state of various domain sub-states.

Then for each sub-state there is a correspondingly-named folder. In this folder the actions and reducer of the redux state are stored.

## Creating the State

### Clarify the State and Actions

First sit back and think of what your App state will be. Let's go for a simple example of a _user-list_ of some sort.

The list will be of the following form:

**user-list**
```
[
    {
        name: John;
        surname: Doe;
        age: 32
    },
    {
        // next user here, etc.
    }
]
```

Then you need to think of the actions that will manage the state.

For our _user-list_ we will need the following actions, and the corresponding parameters that each action needs.

**user-list actions**
```
// Adding a new user in the list
addUser(name, surname, age);

// Updating the data of an existing user in the list
updateUser(index, userData);

// Remove a user from the list
removeUser(index);
```

### Create types

Since we have our state and actions clarified we can now start creating the types that will be used to define state and actions later-on.

**State Components Types**

Our state will have sub-objects, so we can start define their types. In our example we need to define the `User` type.

_types.ts_
```
export type User = {
    name: string;
    surname: string;
    age: number;
}
```

**State Type**

Since we defined the state components types we should now define our whole state type.

In our case things are simple:

_types.ts_
```
export type UserListState = User[];
```

**Define actions Enum**

Now we should start bulding the interfaces of our actions. We start by an `enum` that defines the action types contents.

_user-list/actions.ts_
```
export enum USER_LIST_ACTION_TYPES {
    ADD_USER: 'USER_LIST/ADD_USER',
    REMOVE_USER: 'USER_LIST/REMOVE_USER',
    UPDATE_USER: 'USER_LIST/UPDATE_USER'
}
```

**Define action types**

Remember that each redux _action_creator_ returns a specific action object to pass-on to reducers. These action objects have specific format, and we define them with types. Here's we apply the power of Typescript in the core of our state management.

_types.ts_
```
export type AddUserAction = {
    type: string;
    userData: User;
}

export type UpdateUserAction = {
    type: string;
    index: number;
    userData: User;
}

export type RemoveUserAction = {
    type: string;
    index: number;
}
```

And always define a `union` type. We are going to need it with our reducer:

_types.ts_
```
export type UserListAction = AddUserAction | UpdateUserAction | RemoveUserAction;
```

## Writing Actions

### Action Creators

Now we can start writing our action creators. For example, this is our `addUser` action creator:

_user-list/actions.ts_
```
export const addUser = (name: string, surename: string, age: number): AddUserAction => ({
    type: USER_LIST_ACTION_TYPES.ADD_USER,
    userData: {
        name,
        surename,
        age
    }
});
```

You can continue and define the rest of the actions accordingly.

### Write the reducer

Next we can write our reducer, which includes some sub-steps:

**define an initial state**

_user-list/reducer.ts_
```
export const initialState: UserListState = [];
```

**create a dummy reducer**

The dummy reducer does nothing than return the state that is receiving. But it is the base for adding later actions based on the action-type it receives:

_user-list/reducer.ts_
```
const userList = (
    state: UserListState = initialState,
    action: UserListAction
) => {
    switch (action.type){
        default:
            return newState;
    }
}
```

Pay attention to the fact that the `action` parameter is typed with the `union` type of our actions, that we defined earlier.

Next we can start handling actions per `action.type`:

_user-list/reducer.ts_
```
const userList = (
    state: UserListState = initialState,
    action: UserListAction
) => {
    const newState: UserListState = deepClone(state); // a deep-cloning function

    switch (action.type){
        case USER_LIST_ACTION_TYPES.ADD_USER:
            // pay attention to type-casting on action
            const { name, surename, age } = <AddUserAction>action;
            return [...newState, { name, surename, age }];
            
            // define rest of actions here

        default:
            return state;
    }
}
```

Pay attention in line:
```
    const { name, surename, age } = <AddUserAction>action;
```

Because our actions are of different shape, most times we have to _type-cast_ them to use one of their particular forms.

## Writing the store

Now we can define our global store. Almost always we will need to combine a series of sub-states (like our _user-list_ here). So it's a good idea to use `combineReducers` right from the start.

### define AppState type

First we define our entire App's state type. This is that state that combines all the rest of the sub-states.

_types.ts_
```
export type AppState = {
    userList: UserListState,
    // add future state slices here
}
```

### create store / combineReducers

Then we can create our top-level store and export it.

```
export default store.create(
    comabineReducers<AppState>(
        userList,   // this is the user-list reducer
        // put future reducers here
    )
)
```

### Write tests for reducers

We'll not go into details here, but don't forget to write tests for your reducers.

The idea of the tests is that you give your reducer a specific state, and an action and expect as a result a specific new state.

The test cases should be:
* Reducer returns initial state when no state is given
* Reducer returns the same state when an irrelative action is provided to it.
* At least one test per action

## Consuming the store

### Provide the store

Once we have our store defined we can pass it down to our App, via _React-Redux_ `Provider` component.
Of course we have to import our store from the `state` folder.


```
import { Provider } from 'react-redux';
import store from './state/store';

const App = () => {
    return (
        <Provider store={store}>
            {/* Your app magic goes here. */}
        </Provider>
    );
};
```

### Smart components

_Smart_ components are the ones that consume the state and use store's `dispatch` function to execute actions. _Smart_ components are actually wrapper functions around typical (presentational) components.

**`connect` function**

With _React-Redux_, smart components are created with the `connect` function:

_ui/components/user-list/user-list.tsx_
```
import { connect } from 'react-redux';

const UserList = connect(
    mapStateToProps,
    mapDipatchToProps
)(UserListBase);

export default UserList;
```

>It is my personal preferrence to use a "public" component name for the smart component. In our example it is the `UserList` name. Then use the extention `Base` to name the "inner" presentational component. In our example `UserListBase`.

**mapStateToProps**

Then we create the `mapStateToProps` method. It should feed our component with the exact data it needs. Data transformations should be done here.

In our example:

_ui/components/user-list/user-list.tsx_
```
import { AppState } from '../../../state/types';

const mapStateToProps = (state: AppState) => ({
    users: state.userList
});
```

**mapDispatchToProps**

If your presentational component has callback functions also,`mapDispatchToProps` does the trick.

```
import { Dispatch } from 'react-redux';

const mapDipatchToProps = (dispatch: Dispatch) => ({
    onAddUser: (name: string, surename: string, age: number) => {
        dispatch(addUser(name, surname, age));
    },
    // other callbacks go here...
});
```
## Typed Components

### Type of Component Props

First thing before creating a component, is to define its `props` type. The props might include both incoming data and callback functions.

In case of our user-list component example, here's how we define its props type:

_ui/components/user-list/user-list-base.tsx_
```
import { UserListState } from '../../../state/types';

type Props = {
    users: UserListState,
    onAddUser: (name: string, surename: string; age: number) => void;
}
```

### Presentational Component (Funcational)

Then we use the Props type to declare the type of our component's props:

_ui/components/user-list/user-list-base.tsx_
```
const UserListBase = ({
    users,
    onAddUser
}: Props) => { /* your component contents here */ };
```

### Presentational Component (class-based)

Defining a class-based component is similar. We pass the `Props` type in `Component` class declaration.

_ui/components/user-list/user-list-base.tsx_
```
import React, { Component } from 'react';

class DiceEditorBaseComponent extends Component<Props> {
    /* your component contents go here */
}
```

## Using styles

Using styles with _Typescript_ is similar as with plain _React_. We don't force any types. We let _Typescript_ to automatically infer them from the generated styles.

My personal preference is having the styles in their own file. This allows me to keep the files shorter:

_ui/components/user-list/styles.ts_
```
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    list: {
        // your styles here...
    },
    listItem: {
        // your styles here...
    }
});
```
