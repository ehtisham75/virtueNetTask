import React, { useReducer } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import ReducerAction from '../Data/Redux/ReducerAction'
import ReducerProps from '../Data/Redux/ReducerProps'

const TestingScreen = () => {
    // let { foodProducts } = this.props;

    // const [state, dispatch] = useReducer(productsReducer, initialProductState);
    // const { products } = state;

    return (
        <View>
            <Text>TestingScreen</Text>
            {/* <Text>{products}</Text> */}
        </View>
    )
}

export default connect(ReducerProps, ReducerAction)(TestingScreen)