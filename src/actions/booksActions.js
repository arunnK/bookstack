"use strict"
import axios from 'axios';

// GET BOOKS
export function getBooks(book){
	return function(dispatch){
		axios.get("/api/books")
			.then(function(response){
				dispatch({type:"GET_BOOKS", payload: response.data})
			})
			.catch(function(err){
				dispatch({type:"GET_BOOKS_REJECTED", payload:err})
			})
	}
}

// POST A BOOK
export function postBooks(book){
	return function(dispatch){
		axios.post("/api/books", book)
			.then(function(response){
				dispatch({type:"POST_BOOK", payload:response.data})
			})
			.catch(function(err){
				dispatch({type:"POST_BOOK_REJECTED", payload:"There was an error while posting a new book"})
			})
	}
	
}

// DELETE A BOOK
export function deleteBooks(id){
	return function(dispatch){
		axios.delete("/api/books/" + id)
			.then(function(response){
				dispatch({type:"DELETE_BOOK", payload: id})
			})
			.catch(function(err){
				dispatch({type:"DELETE_BOOK_REJECTED", payload: err})
			})
	}
}

// RESET BUTTON
export function resetButton(){
	return {
		type: "RESET_BUTTON"
	}
}