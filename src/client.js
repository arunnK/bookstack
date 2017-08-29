"use strict"
// REACT
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

// REACT-ROUTER
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// REDUX
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

// Import Reducers
import reducers from './reducers/index';

// Import Actions
import {addToCart} from './actions/cartActions'
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions';

// Create the Store
const middleware = applyMiddleware(thunk, createLogger());
const store = createStore(reducers, middleware);

// Import Components
import BooksList from './components/pages/booksList';
import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import Main from './main';

const Routes = (
	<Provider store={store}>
		<Router history={ browserHistory }>
			<Route path="/" component={Main}>
				<IndexRoute component={BooksList}/>
				<Route path="/admin" component={BooksForm}/>
				<Route path="/cart" component={Cart}/>
			</Route>
		</Router>
	</Provider>
)

render(
	Routes, document.getElementById('app')
);
