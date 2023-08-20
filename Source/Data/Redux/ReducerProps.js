const ReducerProps = (state) => {
    return {
        foodProducts: state.productsReducer.foodProducts,
    }
}

export default ReducerProps