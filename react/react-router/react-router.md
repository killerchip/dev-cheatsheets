# React Router Cheatsheet

## Install

```
npm install react-router-dom
```

## Basics

```
const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/users">Users</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/users" component={Users}/>
    </div>
  </Router>
)
```

## About Paths

`<Route path="/about" component={About}/>` means: when in route `/about` render the `About` component.

`path=` uses a regex. So `path="/home"` will match both `http://.../home` and `http://.../home/123`

If more than one `Routes` match a path, all matching routes will be rendered.

**Root (/) path**

Especially take care about the `/`  (root) path, as it will match all paths (e.g. it will match also `/home`, `/home/123/` etc.). Use `exact path=` for the root path (or any other path that needs exact match).

**Trailing slashes**

 Trailing slashes on the URL don't matter on the match. `strict path` make the trailing slash matter. So:

* `strict path="/home/"` will match `http://.../home/` but not `http://.../home`
* `path="/home/"` will match `http://.../home/` and `http://.../home`
* `strict path="/home"` will match `http://.../home/` and `http://.../home`, anyways

A Route component with no path property will always trigger a match and render.

## Navigation

`<Link to...>` changes the URL path

All Route `Component`'s get passed the `match` prop which contains information on the current URL.

## About Route render methods

Use `component=` for components. Don't pass inline functions.

Use `render=` for inline function.

Use `children` for components that always will be rendered. Also make sure that you pass inline function here. Using a `Route children...` path instead of a typical React Component allows the rendered component to get some route information via the props injected by the router.

```
<Route path="/about" children={(props) => <div>Always rendered</div>}/>
```

## Parameters

An example:

```
const About = (props) => {
  console.log(props.match)
  // Object {path: "/about", url: "/about", isExact: true, params: Object}

  console.log(props.location)
  // Object {pathname: "/about", search: "", hash: "", state: undefined}

  console.log(props.history)
  // Object {length: 1, action: "POP", location: Object}
  ```

### Match

* **params** (object) - contains key/value pairs of the dynamic segments that are used in the path pattern (e.g. {userId = 123} when path = “/user/:userId” and the URL is "/user/123")

* **isExact** (boolean) - true if the URL is an exact match with the path property.

* **path** (string) - the path property of the route component. Useful for building nested routes.

* **url** (string) - the matched portion of the URL. Useful for building nested Links

Note: The match object is null when there is no match.

### Location

A location object is passed down to all components rendered from Route components as a property. The location object contains the following information about the path that was rendered:

* **pathname** (string) - the full path of the URL
* **search** (string) - the URL query string
* **hash** (string) - the URL hash fragment
* **state** (object) - the current state, if a state was provided to history.push(path, [state]), otherwise undefined

### History

A history object is passed down to all components rendered from Route components as a property. The history object contains the following information about the path that was rendered:

* **length** (number) - The number of entries in the history stack
* **action** (string) - (PUSH, POP, or REPLACE)
* **location** (object) - see location

It also has the following methods:

* **push(path, [state])** - (function) Pushes a new entry onto the history
* **replace(path, [state])** - (function) Replaces the current entry on the history stack
* **go(n)** - (function) Moves the pointer in the history stack by n entries
* **goBack()** - (function) Equivalent to go(-1)
* **goForward()** - (function) Equivalent to go(1)
* **block(prompt)** - (function) Prevents navigation (see the history docs)

## Nested routes

It is pretty straight forward to nest Route components within each other. The `match.url` property is useful if you want to add path segments onto the original matched url. For example, if you want to add additional Route components within a component rendered from an original Route component do the following:

```
const Info = ({match}) => {
  return (
    <div>
      <Route path="{match.url + "/telephone"}" render={(props) => <div>Phone: 999 999 9999</div>}/> // renders when URL = /info/phone`

      <Route path="{match.url + "/e-mail"}" render={(props) => <div>Email: email@example.com</div>}/> renders when URL = /info/email

      <Route path="{match.url + "/strAddress"}" render={(props) => <div>Address: 211 Sesame Str</div>}/> renders when URL = /info/address

    </div>
)}

const App = () => (
  <div>
    <BrowserRouter>
      <Route path="/info" component = {Info}/>
    </BrowserRouter>
  </div>
);
```
See that nested Route _extends_ the parent url `match.url`.

## NavLinks

NavLinks are like links but get special CSS classes when they are active:

```
NavLink to="/info" activeClassName="selected">Info</NavLink>
```

### activeStyle

```
<NavLink to="/info" activeStyle={{color:'red'}}>Info</NavLink>
```

### isActive

The NavLink component has an isActive property that triggers a function when the NavLink is active.

```
<NavLink to="/info" isActive={() => console.log('Info router selected))}>Info</NavLink>
```

### exact

The NavLink component has an exact property that only lets the NavLink become active when the location is matched exactly.

### strict

The NavLink component has a strict property that causes trailing slashes to be taken into consideration when determining whether the NavLink is active.

## Switch Component

It will only render the **first** route that will match.

example:
```
<Switch>
 <Route exact path="/" component={Home}/>
 <Route path="/about" component={About}/>
 <Route path="/users/:id" component={User}/>
 <Route component={DefaultRoute}/> //if no other routes match, this route will render for sure
</Switch>
```

# Redirect component

Redirects to URL when rendered. It's a way to 'programmatically' cause redirection.

Typical case is to be used inside other `Route`s. Redirect on error example:

```
let validUser = false;

const ValidateUser = () => {
    if(validUser){
        return <div>Welcome User</div>
    }
    else{
        return <Redirect to="/error"/>
    }
}

const Login = () => {
    validUser = true
    return <div>Logged In</div> 
}

const Error = () => {
    return <div>Please Log In</div> 
}
<Route exact path="/user" render={ValidateUser}/>
<Route exact path="/error" render={Error}/>
<Route exact path="/login" render={Login}/>
```

Redirects can also be used inside Switches. To use a Redirect within a Switch component, add a from property to the Redirect component. The Switch component will render the first component that matches, whether it is a Route or a Redirect. The from property can be only used with Redirects that are within Switch components.

```
<Switch>
  <Route path='/user' component={User}/>
  <Redirect exact from='/' to='/user'/>
  <Redirect from='/oldPageURL' to ='/newPageURL'/>
  <Route component={DefaultPage}/>

</Switch>
```

Example of default root route redirect
```
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/users/:id" component={Users} />
        <Route path="/error" component={Error} />
        <Route component={DefaultRoute} />
      </Switch>
```

# Prompt

When rendered it watches if you want to leave the current URL path and prompts.

```
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/users/:id" component={Users} />
  <Prompt message="Are you sure you want to leave?" />
```

**when**

The when attribute is a boolean that can be used to enable or disable the Prompt component. Set it to false when you want to disable the Prompt component and allow the user the navigate away without seeing a Prompt. The when attribute is set to true by default.
```
    var notSaved = true
   <Prompt when={notSaved} message="Are you sure you want to leave without saving?"/> 
```

# Example of 'subroutes'

```
import React from "react";
import { Link, Switch, Route } from "react-router-dom";

const projects = [
    {link: '/game_project', name: 'Game Project'},
    {link: '/react_project', name: 'React Project'},
    {link: '/db_project', name: 'Database Project'},
    {link: '/ml_project', name: 'Machine Learning Project'},
]

const Projects = ({ match }) => (
    <div>
        <ul>
            {projects.map (
                project => (
                    <li>
                        <Link to={`${match.url}${project.link}`}>{project.name}</Link>
                    </li>
                )
            )}
        </ul>

        <Switch>
            <Route
                path={match.url + '/:project_link'}
                render = { ({match}) => <div>{match.params.project_link}</div>}
            />

            <Route exact path={match.url} render={() => <div>Pick a Project to view!</div>} />å
        </Switch>
    </div>
);

export default Projects;
```
