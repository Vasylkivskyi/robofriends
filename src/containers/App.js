import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';

// In order to use state we need to use 'class' key word instead of 'const', also we have to use 'render' method!.
class App extends Component{
  // Have to create constructor method, because we need to change values of props.
  constructor(){
    super();
    // Inputing the props into state, now we can change them.
    this.state = {
      robots: [],
      searchfield: ''
    }
  }

  componentDidMount(){
    // fetch - it is a tool to make request to server and grab from there information (for example in our case it is a list of users).
    fetch('https://jsonplaceholder.typicode.com/users')
    // then we resive response from server and that response we convert into json format.
      .then(response => response.json())
    // then we set json response into state.
      .then(users => this.setState({robots: users}));
  }

  // Something like standart elent listener in React. Listens to changes in input field.
  onSearchChange = (event) => {
    //To change values in state we have to use method setState.
    //To catch value of input field I will use event.target.value.
    // and that value I will input into seachfield variable.
    this.setState({ searchfield: event.target.value });
  }

  render() {
    // Creating an array there I will store filtered robots.
    const filteredRobots = this.state.robots.filter(robot => {
      //Check if robots array contains robots with names like user input into search field.
      return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
    });

    // if the list of users is very long and it needs more time to load we can add if else statement to render loading message on page.
    if (this.state.robots.length === 0) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div className='tc'>
          <h1 className='f1' >Robofriends</h1>
          {/* I pass to SearchBox logic of onSerchChange. */}
          <SearchBox searchChange={this.onSearchChange}/>
          
          {/* We create component inside another component to make list of robots scrollable on the page. */}
          <Scroll>
            {/* Passing all filtered robots array on page. */}
            <ErrorBoundry>
              <CardList robots={filteredRobots}/>
              </ErrorBoundry>
          </Scroll>
        </div>
      )
    }
  }
}

export default App;