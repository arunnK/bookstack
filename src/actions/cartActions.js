"use strict"
import axios from 'axios';

// GET CART
export function getCart(){
	return function(dispatch){
		axios.get("/api/cart")
			.then(function(response){
				dispatch({type: "GET_CART", payload: response.data})
			})
			.catch(function(err){
				dispatch({type:"GET_CART_REJECTED", msg: 'Error while getting the cart'})
			})
	}
}

// ADD TO CART
export function addToCart(cart){
	return function(dispatch){
		axios.post("/api/cart", cart)
			.then(function(response){
				dispatch({type: "ADD_TO_CART", payload: response.data})
			})
			.catch(function(err){
				dispatch({type:"ADD_TO_CART_REJECTED", msg: 'Error while adding to the cart'})
			})
	}
}

// UPDATE CART
export function updateCart(_id, unit, cart){
	const currentBookToUpdate = cart
	const indexToUpdate = currentBookToUpdate.findIndex(
		(book) => {
			return book._id === _id;
		}
	)
	const newBookToUpdate = {
		...currentBookToUpdate[indexToUpdate],
		quantity: currentBookToUpdate[indexToUpdate].quantity + unit
	}
	let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,
	...currentBookToUpdate.slice(indexToUpdate + 1)]
	
	return function(dispatch){
		axios.post("/api/cart", cartUpdate)
			.then(function(response){
				dispatch({type: "UPDATE_CART", payload: response.data})
			})
			.catch(function(err){
				dispatch({type:"UPDATE_CART_REJECTED", msg: 'Error while updating the cart'})
			})
	}
}

// DELETE FROM CART
export function deleteCartItem(cart){
	return function(dispatch){
		axios.post("/api/cart", cart)
			.then(function(response){
				dispatch({type: "DELETE_CART_ITEM", payload: response.data})
			})
			.catch(function(err){
				dispatch({type:"DELETE_CART_ITEM_REJECTED", msg: 'Error while deleting item from the cart'})
			})
	}
}