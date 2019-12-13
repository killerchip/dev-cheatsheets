# React-Redux-Typescript guide

_React_ and _React-Native_ are powerfull and popular libraries allowing to build web-apps and mobile-apps, using Javascript. And they almost always are used with _Redux_ state-management library, that allows managing state globally in the app from a central point. Microsoft's _Typescript_ on the other hand is a superset language of Javascript, that brings the benefits of typing-languages to it. 

Combine these technologies (_React-Native_, _Redux_, _Typescript_) you have a powerfull toolbox for building mobile-apps.

The following is an example-based guide/checklist on how to use the _React-Native_ (applies to _React_ also) _Typescript_, and _Redux_ altogether, to build and consume your states with your components. It assumes that you are already familiar with [React-Native](https://facebook.github.io/react-native/docs/getting-started), [Redux](https://redux.js.org/introduction/getting-started), and [Typescript language](https://www.typescriptlang.org/). 

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

All types are gathered in the `types.ts` file. It can be also a folder, but in general I find it a good way to have types in one place, for other parts of the app easily access them.

The `store.ts` will export the one **combined** state of various domain sub-states.

Then for each sub-state there is a correspondingly-named folder. In this folder the actions and reducer each sub-state are stored.

## Creating the State

### Clarify the State and Actions

First sit back and think of what your App state will be. Let's go for a simple example of a _user-list_ of some sort.

Our _user-list_ will have the following form:

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

Then we need to think of the actions that will manage the state.

For our _user-list_ example, let's assume we need the following actions:

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

Our state will have sub-objects. We can start define their types. In our example we need to define the `User` type.

_state/types.ts_
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

_state/types.ts_
```
export type UserListState = User[];
```

**Define actions Enum**

Now we should start bulding the interfaces of our actions. First define a _Typescript_ `enum` for the actual action types.

_state/user-list/actions.ts_
```
export enum USER_LIST_ACTION_TYPES {
    ADD_USER: 'USER_LIST/ADD_USER',
    REMOVE_USER: 'USER_LIST/REMOVE_USER',
    UPDATE_USER: 'USER_LIST/UPDATE_USER'
}
```

**Define action types**

Remember that each redux _action_creator_ returns a specific action object to pass-on to reducers. These action objects have specific format.
With _Typescript_ we strongly type them.

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

_state/types.ts_
```
export type UserListAction = AddUserAction | UpdateUserAction | RemoveUserAction;
```

## Writing Actions

### Action Creators

Next we can start writing our action creators.

Here's the example of our `addUser` creator.

_state/user-list/actions.ts_
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

Next we can move on with writing the redux reducer:

**define an initial state**

_state/user-list/reducer.ts_
```
export const initialState: UserListState = [];
```

**create a dummy reducer**

First we write a dummy reducer. A dummy reducer does nothing more than return the state that is receiving. It will be our base for adding actions immediately after:

_state/user-list/reducer.ts_
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

Pay attention to the type of `action` parameter. It is the `union` of types of each individual actions.

**add actions to reducers**
Next we can start handling actions per `action.type`:

_state/user-list/reducer.ts_
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

Pay attention in line
```
    const { name, surename, age } = <AddUserAction>action;
```

Because our actions are of different shape, most times we have to _type-cast_ them to use one of their particular forms.

## Writing the store

Now we can define our global app state store. Typically our entire app state is comprised of our sub-states (like _user-list_ sub-state in our example). We will use _reac-redux_ `combineReducers` to do it.

### define AppState type

First we define our entire App's state type. This is a combination of our sub-states.

_state/types.ts_
```
export type AppState = {
    userList: UserListState,
    // add future state slices here
}
```

### create store / combineReducers

Then we create that store for our whole app state. We export it to be consumed by the rest of our app.

_state/store.ts_
```
import { combineReducers } from 'react-redux';
import { AppState } from './types';

export default store.create(
    comabineReducers<AppState>(
        userList,   // this is the user-list reducer
        // other sub-states reducers go here
    )
)
```

### Write tests for reducers

We will not go into details here. But as a note, you might want to write tests for your reducers.

The test cases should be:
* Reducer returns initial state when no state is given.
* Reducer returns the same state when an irrelative action is provided to it.
* At least one test per action.

## Consuming the store

### Provide the store

Once we have our store defined we can pass it down to our App, via _React-Redux_ `Provider` component.
Of course we have to import our store from the `state` folder.

_App.tsx_
```
import store from './state/store';

const App = () => {
    return (
        <Provider store={store}>
            <Fragment>
                {/* Your app magic goes here. */}
            </Fragment>
        </Provider>
    );
};
```

### Smart components

_Smart_ components are the ones that consume the state and use `dispatch` action of the store to dispatch actions. So when you want to consume your state, first define the smart component using _React-Redux_ `connect` to wrap a _presententional_ component.

_ui/components/user-list/user-list.tsx_
```
const UserList = connect(
    mapStateToProps,
    mapDipatchToProps
)(UserListBase);

export default UserList;
```

You'll notice that in general I prefer to use a 'public' component name for the smart component (e.g. `UserList`) and use the extension `Base` for the internal presentational component. (e.g. `UserListBase`).

Then create the `mapStateToProps` method to feed your component exactly the data needed from the state.

_ui/components/user-list/user-list.tsx_
```
const mapStateToProps = (state: AppState) => ({
    users: state.userList
});
```

Also you may create the `mapDispatchToProps` method, to send actions to the reducer.

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

### Types for Component Props

For components to work with Typescript we must type their properties first. We define both data properties and callback functions. For our example:

_ui/components/user-list/user-list-base.tsx_
```
type Props = {
    users: UserListState,
    onAddUser: (name: string, surename: string; age: number) => void;
}
```

### Presentational Component (Funcational)

Then we use the Props type when we destructuring the props in the function:

_ui/components/user-list/user-list-base.tsx_
```
const UserListBase = ({
    users,
    onAddUser
}: Props) => { /* your component here */ };
```

### Presentational Component (Class based)

Defining a class-based component is similar. We pass the `Props` type in `Component` class:

_ui/components/user-list/user-list-base.tsx_
```
class DiceEditorBaseComponent extends React.Component<Props> {
    /* define your Component class here */
}
```

## * Using styles

Using styles with _Typescript_ is similar as with plain _React_, since we let _Typescript_ to automatically infer the types of styles.

I prefer having styles in their own files though:

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
