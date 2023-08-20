import ReducerConstant from "./ReducerConstant";

const ReducerAction = (dispatch) => {
    return {
        productsReducer: (products) => dispatch({ type: ReducerConstant.FOOD_PRODUCTS, products: products }),
    }
}

export default ReducerAction