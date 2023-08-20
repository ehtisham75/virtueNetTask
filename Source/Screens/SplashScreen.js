import React, { useEffect } from 'react'
import { View, Text, StatusBar, Image, StyleSheet } from 'react-native'
import { Colors } from '../Assets/Color/Colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux'
import ReducerAction from '../Data/Redux/ReducerAction'
import ReducerProps from '../Data/Redux/ReducerProps'

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'HomeScreen',
              //   params: {}
            },
          ],
        }));

    }, 3000);
  });

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Colors.TRANSPARENT}
        barStyle={"dark-content"}
        translucent={true}
      />

      <Animatable.View
        animation="zoomInUp"
        delay={1000}
        duration={2000}
        style={styles.logoCircle}>

        <Text style={styles.logoCircleText}>Food App{"\n"}Test Project</Text>
      </Animatable.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY_COLOR,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: hp(30),
    height: hp(30),
    borderRadius: hp(100),
    backgroundColor: Colors.SECONDARY_COLOR,
  },
  logoCircleText: {
    fontSize: hp(4),
    color: Colors.PRIMARY_COLOR,
    textAlign: 'center',
    fontWeight: "600",
  },
})

export default connect(ReducerProps, ReducerAction)(SplashScreen)