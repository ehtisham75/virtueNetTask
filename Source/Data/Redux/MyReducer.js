import { combineReducers, createStore } from "redux"
import ReducerConstant from "./ReducerConstant"

const initialProductState = {
    products: ""
}
const productsReducer = (state = initialProductState, action) => {
    switch (action.type) {
        case ReducerConstant.FOOD_PRODUCTS:
            return { products: action.products }
    }
    return state
}

const reducers = combineReducers({ productsReducer })
const store = createStore(reducers)
export default store