import React from 'react';
import './App.css';
import  Login from './components/user/login.js'
import  SingUp from './components/user/user-singup.js'
import  UserProfile from './components/user/user-profile.js'
import  Movies from './components/movies/movies.js'
import  MoviesDashboard from './components/movies/movies-dash.js'
import  AddMovie from './components/movies/addMovies.js'
import  UpdateMovie from './components/movies/updateMovie.js'
import  Category from './components/category/view-category.js'
import  AddCategory from './components/category/addCategory.js'
import  UpdateCategory from './components/category/update-category.js'

import {BrowserRouter,Switch,Route} from 'react-router-dom';


function App() {
  return (
        <React.Fragment>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={MoviesDashboard} />
                    <Route exact path='/login' component={Login} />
                    <Route path='/view-movies' component={Movies} />
                    <Route path='/add-movies' component={AddMovie} />
                    <Route path='/update-movies' component={UpdateMovie} />
                    <Route path='/view-category' component={Category} />
                    <Route path='/add-category' component={AddCategory} />
                    <Route path='/update-category' component={UpdateCategory} />
                    <Route path='/user-profile' component={UserProfile} />
                    <Route path='/user-singup' component={SingUp} />
                </Switch>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;
