import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';


import Home from './home/home';
import single from './single/singleGif';

export const About = () =>(<h1>About Us</h1>) 
export const Routes = () => (


 <Router basename="/react" >
	<Switch>
   		<Route exact path="/" component={Home}/>
		<Route exact path="/single-gif/:id" component={single}/>
  </Switch>
  </Router>

);



