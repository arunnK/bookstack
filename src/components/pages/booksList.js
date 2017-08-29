"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Carousel, Grid, Col, Row, Button} from 'react-bootstrap';
import {getBooks} from '../../actions/booksActions';

import BookItem from './bookItem';
import BooksForm from './booksForm';
import Cart from './cart';

class BooksList extends React.Component{
	componentDidMount(){
		this.props.getBooks();
	}

	render(){
		const booksList = this.props.books.map((booksArr) => {
			return(
				<Col xs={12} sm={6} md={4} key={booksArr._id}>
					<BookItem
						_id={booksArr._id}
						title={booksArr.title}
						description={booksArr.description}
						images={booksArr.images}
						price={booksArr.price} 
					/>
				</Col>
			)
		})
		return(
			<Grid>
				<Row>
					<Carousel>
						<Carousel.Item>
							<img width={900} height={50} alt="900x50" src="/images/home1.jpg"/>
							<Carousel.Caption>
								<h4 style={{color: 'black'}}>“A room without books is like a body without a soul.”</h4>
								<p style={{color: 'black'}}>-Marcus Tullius Cicero</p>
							</Carousel.Caption>
						</Carousel.Item>

						<Carousel.Item>
							<img width={900} height={50} alt="900x50" src="/images/home2.jpg"/>
							<Carousel.Caption >
								<h4 style={{color: 'black'}}>“There is no friend as loyal as a book.”</h4>
								<p style={{color: 'black'}}>-Ernest Hemingway</p>
							</Carousel.Caption>
						</Carousel.Item>

						<Carousel.Item>
							<img width={900} height={50} alt="900x50" src="/images/home3.jpg"/>
							<Carousel.Caption>
								<h4 style={{color: 'black'}}>“... a mind needs books as a sword needs a whetstone, if it is to keep its edge.”</h4>
								<p style={{color: 'black'}}>-George R.R. Martin</p>
							</Carousel.Caption>
						</Carousel.Item>
					</Carousel>
				</Row>
				<Row style={{marginTop: '15px'}}>
					{booksList}
				</Row>
			</Grid>
		)
	}
}

function mapStateToProps(state){
	return{
		books: state.books.books
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getBooks: getBooks
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);