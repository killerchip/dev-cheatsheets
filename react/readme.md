# React - Cheatsheet

This a collection of cheatsheets for beginners in React. It is based on [React JS Documentation](https://reactjs.org/docs/hello-world.html) and other resources. Keep it handy for when you want quickly to refer on how to do React stuff.

**Contents:**

* [Starting A Project](#starting-a-project)
* [Rendering Components](#rendering-components)
* [Defining Components](#defining-components)
* [Local State](#local-state)
* [Event Handling](#event-handling)
* [Passing Up State](#passing-up-state)
* [Children Components](#children-components)
* [Binding `this`](#binding-this)
* [Passing up Event Handling to parent](#passing-up-event-handling-to-parent)
* [Building a page step-by-step](./step-by-step/readme.md)
* [REACT-ROUTER cheatsheet](./react-router/react-router.md)

## Starting a Project

### Minimal HTML Page

Dowanlod the following page and start building:
[Single File Example](https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html)

It is for tests only. Not for production environment.

## Rendering components
_[single-file-example.html](./single-file-example.html)_

In HTML:
```
<body>
  <div id="react-root"></div>
</body>
```

In JSX file:
```
ReactDOM.render(
  <h1>Hello World</h1>,
  document.getElementById('root');
);
```

## Defining Components

### Functional Components
_[functional-components.html:](./examples/functional-components.html)_

Define a component as a function:

`props` is the properties passed to our component.

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}

ReactDOM.render(
  <Welcome name="John Doe" />,
  document.getElementById('root')
);
```

### Class components

_[class-components.html:](./examples/class-components.html)_

```
class Goodbye extends React.Component {
  render() {
    return <h1>Goodbye, {this.props.name}</h1>
  }
}
```

### Assignable to variables

_[assignables.html:](./examples/assignables.html)_

```
const welcomeSirComponent = <Welcome name="Sir" />;

ReactDOM.render(
  welcomeSirComponent,
  document.getElementById('root')
);
```

## Local State

_[states.html](./examples/states.html)_

### Defining state

State can be initialized in constructor. It's a best practice to initialize the schema of our state (e.g with empty values):
```
class TimeCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      counter: 0,
      date: null
    };
...
```

and then initilize with initial values within `componentDidMount` hook.

```
  componentDidMount() {
    this.setState({counter: 1});
    this.setState({date: new Date()});
  }
```

### Reading State

```
<div>
  <h1>Counting: {this.state.counter}</h1>
  <p>{this.state.date.toLocaleTimeString()}</p>
</div>  
```

### Updating state

Use `setState`:
```
this.setState({
  date: new Date()
});
```

### Relying on previous state to update state

In this case do not rely directly to `this.state` object. Use the `setState` with arrow function parameter:
```
this.setState(
  (prevState, props) => ({counter: prevState.counter + props.incValue})
);
```

## State immutability

It is important to consider the state as immutable. When updating the state be carefull **not to mutate** an object or array that already is referenced by the state. Use may use spread operator to create a copy of the original object (`{...myObject}`) or array (`{...myArray`});

For example we have a user's data as an object:
```
componentDidMount() {
  this.setState({user:{
      name: John,
      surname: Doe,
      age: 25
    }});
}
```

Now we want to increase his age. The following is wrong because we mutate the object that `this.state.user` is already referencing.

```
  ageUserByOneYear() {
    const user = this.state.user;
    user.age = user.age + 1;
    this.setState({user: user});
  };
```

The correct way is the following:
```
  ageUserByOneYear() {
    const user = this.state.user;
    this.setState({
      user: {...user, ['age']: user.age + 1}
    });
  }
```

Bear in mind about cloning of Arrays and Objects. They peform 'shallow copy'. If you need to perform deeper clone you can use 3rd party tools.

[See recommendations by React documentation](https://reactjs.org/docs/update.html).

## Event Handling

_[event-handling.html](./examples/event-handling.html)_

### Simple Case

Use `preventDefault` and not `return false` to prevent bubbling up the event.

You attach an event handler function and not a string in the `onClick` and the other event handler properties. 

```
function ALink() {
  function handleClick(e) {
    e.preventDefault();
    alert ('You clicked button: A');
    console.log('Event', e);
  }

  return (
    <a href="#" onClick={handleClick}>Link A</a>          
  );
}
```

### Event Handling in Class / `bind` method

```
class BLink extends React.Component {

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    alert('You clicked button: B');
    console.log(e);
    console.log(this);
  }

  render(){
    return (
      <a href="#" onClick={this.handleClick}>Link B</a>          
    );
  }

}
```

### Event Handling / Arrow functions

```
class CLink extends React.Component {

  //Arrow function as event handler
  handleClick = (e) => {
    e.preventDefault();
    alert('You clicked button: C');
    console.log(e);
    console.log(this);
  };

  render(){
    return (
      <a href="#" onClick={this.handleClick}>Link C</a>          
    );
  }

}
```

### Event Handling / Arrow Callbacks

```
class DLink extends React.Component {

  handleClick = (e) => {
    e.preventDefault();
    alert('You clicked button: D');
    console.log(e);
    console.log(this);
  };

  //Directly Arrow function in callback statement
  render(){
    return (
      <a href="#" onClick={(e) => this.handleClick(e)}>Link D</a>          
    );
  }
}
```

### Passing Arguments with Arrow Callbacks

Event argument has to be passed to the event handler, along with other custom parameters.

```
class DLink extends React.Component {

  handleClick = (e, name) => {
    e.preventDefault();
    alert(`You clicked button: D and the name is ${name}`);
    console.log(e);
    console.log(this);
  };

  render(){
    return (
      <a href="#" onClick={(e) => this.handleClick(e, 'John Doe')}>Link D</a>          
    );
  }
}
```

### Passing Arguments with Callback binding

The Event argument will be automatically be passed after any custom parameters in the `.bind` operation.

```
class ELink extends React.Component {

  handleClick (name, e) {
    alert(`You clicked button: E and the name is ${name}`);
    console.log(e);
    console.log(this);
  };

    render(){
      return (
        <a href="#" onClick={this.handleClick.bind(this, "Jane Doe")}>Link E</a>          
      );
    }
}
```

## Passing Up State
_[pass-up-events.html](./examples/pass-up-events.html)_

You can pass up state from children components to parent. The parent component passes an even handler in `props` and the child component calls it up.

Parent passes event handler to child
```
<NameInput onChange={ (name)=> {this.setState({name})} } />
```

Child calls the parent handler on state changes
```
<input type="text" onChange={(e) => {this.props.onChange(e.target.value)}}></input>
```

## Children Components

_[children-props.html](./examples/children-props.html)_

A component can handle `children` components by having direct access to their JSX via the `props.children` property.

A component can have 'content':
```
<Bordered>
  <p>Dear John</p>
  <p>I wish you Happy Birthday!!</p>
</Bordered>
```

And the `Bordered` component can access and manipulate the content:
```
class Bordered extends React.Component {
  render(){
    return (
      <div>
        Letter:
        <div className="fancy-border content">
          {this.props.children}
        </div>
      </div>
    );
  }
}
```
### Multiple Children Components

You can pass them as custom JSX `props`.

```
class NewsPaperPage extends React.Component {
  render() {
    
    const columnLeft = (...);
    const columnMiddle = (...);
    const columnRight = ();

    return (
      <PaperPage
        columnLeft={columnLeft}
        columnMiddle={columnMiddle}
        columnRight={columnRight}
      />
    );

  }
}
```

And the `PaperPage` Component:

```
class PaperPage extends React.Component {
  render(){
    return (
      <div className="paper-page">
        <div className="column column-left">
          {this.props.columnLeft}
        </div>
        <div className="column column-middle">
            {this.props.columnMiddle}
        </div>
        <div className="column column-right">
            {this.props.columnRight}
        </div>
      </div>
    );
  }
}
```

## Binding `this`

When creating a class-based React component, React will automatically bind `this` to the component instance. This will happen only for the predefined class methods of React's components, like `render()` or `componentWillUpdate()`. So you can freely refer to `this.props` or `this.state` inside these methods.

But if you define your own methods in the component, `this` will be set to `null`. React does not bind it automatically. You will have to do it yourself. Best practice is to do it in constructor.

```
class Logger extends React.Component {
    constructor(props) {
        super(props);

        this.logEvents = this.logEvents.bind(this);
    }

    logEvents() {
        console.log(this.props.events);
    }
    ...
}
```

## Passing up Event Handling to parent

Child representational components should pass data handling up to their parents. The data owners should be actually the parent smart component.


* Parent has an event handler for events from child: `SoundList.handleSound`
* Parent pass this handler as prop to child: `onSound={this.handleSound}`
* Parent also pass `callback` information as props for the child to send back to parent: `sound={sound}`
* Child has its own event handler (`onClick={this.handleSound}`), that triggers parent's event handler: `this.props.onSound(this.props.sound)`

```
const sounds = ['miaou', 'woof', 'quack'];

class SoundList extends React.Component {
    handleSound(sound) {
        console.log(sound);
    }

    render() {
        {
            sounds.map(sound => (
                <Sound sound={sound} onSound={this.handleSound}/>
            ))
        }
    }
}

class Sound extends React.Component {
    constructor(props) {
        super(props);

        this.handleSound = this.handleSound.bind(this);
    }

    handleSound() {
        this.props.onSound(this.props.sound);
    }

    render() {
        <button onClick={this.handleSound}>
            {this.props.sound}
        </button>
    }
}

```