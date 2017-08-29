"use strict"
import React from 'react';
import Menu from './components/menu';
import Footer from './components/footer';
import {connect}  from 'react-redux';
import { bindActionCreators } from 'redux';

import { getCart } from '../src/actions/cartActions';

class Main extends React.Component{
	componentDidMount(){
		this.props.getCart();
	}

	render(){
		return(
			<div>
				<Menu cartItemsNumber={this.props.totalQty}/>
				{this.props.children}
				<Footer />
			</div>
		)
	}
}

function mapToStateProps(state){
	return {
		totalQty: state.cart.totalQty
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getCart: getCart
	}, dispatch)
}

export default connect(mapToStateProps, mapDispatchToProps)(Main);