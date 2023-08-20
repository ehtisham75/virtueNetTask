import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, AppState, StatusBar, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Modal } from 'react-native'
import { Colors } from '../Assets/Color/Colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import Entypo from 'react-native-vector-icons/Entypo';


const HomeScreen = () => {
  const navigation = useNavigation();
  const [isConnected, setIsConnected] = useState(true);
  const [appState, setAppState] = useState(AppState.currentState);
  const [activeStartTime, setActiveStartTime] = useState(new Date());
  const [timer, setTimer] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemList, setItemList] = useState([]);


  useEffect(() => {
    firestore()
      .collection('FoodProducts')
      .doc('Products')
      .collection('MoreProducts')
      .onSnapshot(onCollectionUpdate)

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    }
  }, [])

  onCollectionUpdate = (querySnapshot) => {
    let tempArray = []
    querySnapshot.forEach(documentSnapshot => {
      tempArray.push(documentSnapshot.data())
    });
    setItemList(tempArray)
    console.log('===========Food Items==========>>', tempArray)
  }

  const handleAppStateChange = (nextAppState) => {
    setAppState(nextAppState);
    if (nextAppState === 'active') {
      setActiveStartTime(new Date());
    }
  };
  // useEffect(() => {
  //   AppState.addEventListener('change', handleAppStateChange);

  //   const interval = setInterval(() => {
  //     if (appState === 'active') {
  //       const now = new Date();
  //       const timeDifference = now - activeStartTime;
  //       setTimer(timeDifference);
  //     }
  //   }, 1000);

  //   return () => {
  //     AppState.removeEventListener('change', handleAppStateChange);
  //     clearInterval(interval);
  //   };
  // }, [appState, activeStartTime]);
  const getStatusText = () => {
    switch (appState) {
      case 'active':
        return 'Active';
      case 'background':
        return 'Background';
      case 'inactive':
        return 'Inactive';
      default:
        return 'Unknown';
    }
  };
  const formatTimer = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    if (seconds >= 60) {
      const minutes = Math.floor(seconds / 60);
      if (minutes >= 60) {
        const hours = Math.floor(minutes / 60);
        return `${hours} hours`;
      }
      return `${minutes} minutes`;
    }

    return `${seconds} seconds`;
  };

  const handleEdit = (item) => {
    setModalVisible(false);
    navigation.navigate("AddPorductScreen", { editItem: item })
  };

  const handleDelete = () => {
    setModalVisible(false);
    onDelete(item.id);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Colors.TRANSPARENT}
        barStyle={"dark-content"}
        translucent={true}
      />

      <View style={styles.header}>
        <Text style={styles.netStatus}>{isConnected ? 'Online' : 'Offline'}</Text>

        <View style={styles.appStatusWrapper}>
          {/* <Text style={styles.appStatus}>AppStatus {getStatusText()}</Text>
          {appState === 'active' && (
            <Text style={styles.timerText}>{formatTimer(timer)}</Text>
          )} */}
        </View>
      </View>

      <View style={styles.flatlistWrap}>
        <FlatList
          data={itemList}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ justifyContent: 'space-between', }}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.productBox}>

                <TouchableOpacity onPress={() => setModalVisible(true)}
                  style={styles.productOptions}>
                  <Entypo name="dots-three-vertical" size={20} color="#900" />
                </TouchableOpacity>

                <Text numberOfLines={1} style={styles.productName}>{item.product_name}</Text>
                <Text numberOfLines={2} style={styles.productDescription}>{item.product_desc}</Text>
                <View style={styles.priceBox}>
                  <Text style={styles.priceTag}>Rs: </Text>
                  <Text numberOfLines={1} style={styles.productPrice}>{item.product_price}</Text>
                </View>

                {(modalVisible && index == index.toString()) &&
                  <View style={styles.optionBox}>
                    <TouchableOpacity
                      onPress={() => { handleEdit(item) }}
                      style={styles.optionTab} >
                      <Text style={styles.optionTabTitle}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => { }}
                      style={{ ...styles.optionTab, marginTop: hp(1), }} >
                      <Text style={styles.optionTabTitle}>Delete</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => { setModalVisible(false) }}
                      style={{ ...styles.optionTab, marginTop: hp(1), }} >
                      <Text style={styles.optionTabTitle}>Cancel</Text>
                    </TouchableOpacity>

                  </View>}
              </View>
            )
          }}
        />

        <View style={styles.addBtnWrap}>
          <TouchableOpacity
            onPress={() => { navigation.navigate("AddPorductScreen") }}
            activeOpacity={0.5}
            style={styles.addButton}>
            <Text style={styles.addBtnTitle}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: Colors.PRIMARY_COLOR,
    height: hp(17),
    paddingTop: hp(5),
    paddingHorizontal: wp(5)
  },
  netStatus: {
    color: Colors.WHITE_TEXT_COLOR,
    fontSize: hp(2.8),
    fontWeight: 'bold',
  },
  appStatusWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.e,
    borderRadius: hp(10),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    marginTop: hp(1),
  },
  appStatus: {
    color: Colors.WHITE_TEXT_COLOR,
    fontSize: hp(2.2),
  },
  timerText: {
    color: Colors.WHITE_TEXT_COLOR,
    fontSize: hp(2),
  },
  flatlistWrap: {
    flex: 1,
    marginHorizontal: wp(5),
    marginTop: hp(1),
    paddingTop: hp(2)
  },
  productBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(30),
    height: hp(22),
    margin: 8,
    backgroundColor: Colors.SECONDARY_COLOR,
    borderRadius: 8,
  },
  productOptions: {
    position: 'absolute',
    right: wp(2),
    top: hp(1),
  },
  productName: {
    fontSize: hp(2.5),
    fontWeight: '500',
    color: Colors.BLACK_TEXT_COLOR,
  },
  productDescription: {
    fontSize: hp(2.2),
    color: Colors.LIGHTBLACK_TEXT_COLOR,
    textAlign:'center',
  },
  priceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2),
    // backgroundColor: 'plum',
  },
  priceTag: {
    fontSize: hp(2.2),
    color: Colors.PRIMARY_COLOR
  },
  productPrice: {
    fontSize: hp(2.2),
    color: Colors.PRIMARY_COLOR
  },
  optionBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_BLACK,
    position: 'absolute',
    right: wp(6),
    top: hp(1),
    paddingHorizontal: wp(5),
    paddingVertical: hp(1.5),
    borderRadius: hp(1)
  },
  optionTab: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.WHITE
  },
  optionTabTitle: {
    fontSize: hp(2),
    color: Colors.WHITE_TEXT_COLOR
  },
  addBtnWrap: {
    position: 'absolute',
    bottom: hp(2),
    right: wp(2),
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY_COLOR,
    borderRadius: 10,
    paddingHorizontal: wp(4),
    paddingVertical: hp(2)
  },
  addBtnTitle: {
    fontSize: hp(2),
    color: Colors.WHITE_TEXT_COLOR
  },



  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 16,
  },
  actionText: {
    color: 'blue',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalOption: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
  },


});

export default HomeScreen