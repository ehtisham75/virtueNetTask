import React, { useEffect, useState } from 'react'
import { View, Text, AppState, StyleSheet, StatusBar, TouchableOpacity, Button, TextInput } from 'react-native'
import { Colors } from '../Assets/Color/Colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import NetInfo from '@react-native-community/netinfo';
import firestore from '@react-native-firebase/firestore';

const AddPorductScreen = ({ route }) => {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [isConnected, setIsConnected] = useState(true);
    const [appState, setAppState] = useState(AppState.currentState);
    const [getItem, setGetItem] = useState(route.params?.editItem ?? "");

    useEffect(() => {
        console.log("======== GetItem on Edit =====>>", getItem)
        if (getItem !== "") {
            setProductName(getItem.product_name)
            setDescription(getItem.product_desc)
            setProductPrice(getItem.product_price)
            return
        }
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });
        return () => {
            unsubscribe();
        }
    }, [])

    const handleProducts = () => {
        if (productName !== "" && description !== "" && productPrice !== "") {
            addProductToFirestore()
            return
        }
        else { alert("Please fill the data.") }
    }

    const addProductToFirestore = async () => {
        try {
          await firestore()
            .collection('FoodProducts')
            .doc('Products')
            .collection('MoreProducts')
            .add({
              product_name: productName,
              product_desc: description,
              product_price: productPrice,
            }).then((ref) => { console.log("----Product Added --->", ref) });
      
        } catch (error) {
          console.error('Error adding product:', error);
        }
      
        setProductName('');
        setDescription('');
        setProductPrice('');
      };
      

    const updateProduct = () => {
        firestore().collection('FoodProducts')
            .doc("Products")
            .collection('MoreProducts')
            .update({
                product_name: productName,
                product_desc: description,
                product_price: productPrice,
            })
            .then(() => {
                alert('Updated Successfully');
            });
        setProductName("")
        setDescription("")
        setProductPrice("")
    };

    const handleAppStateChange = (nextAppState) => {
        setAppState(nextAppState);
    };
    // useEffect(() => {
    //     AppState.addEventListener('change', handleAppStateChange);
    //     return () => {
    //         AppState.removeEventListener('change', handleAppStateChange);
    //     };
    // }, []);
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

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={Colors.TRANSPARENT}
                barStyle={"dark-content"}
                translucent={true}
            />

            <View style={styles.header}>
                <Text style={styles.netStatus}>{isConnected ? 'Online' : 'Offline'}</Text>
                {/* <Text style={styles.appStatus}>{getStatusText()}</Text> */}
            </View>

            <View style={styles.inputWrapper}>
                <TextInput
                    placeholder="Product Name"
                    value={productName}
                    onChangeText={setProductName}
                    style={styles.inputs}
                />
                <TextInput
                    placeholder="Description"
                    value={description}
                    onChangeText={setDescription}
                    style={styles.inputs}
                />
                <TextInput
                    placeholder="Product Price"
                    value={productPrice}
                    onChangeText={setProductPrice}
                    keyboardType="numeric"
                    style={styles.inputs}
                />

                {getItem === "" ?
                    (<View style={styles.btnBox}>
                        <TouchableOpacity
                            onPress={() => { handleProducts() }}
                            activeOpacity={0.5}
                            style={styles.button}>
                            <Text style={styles.btnTitle}>Add Product</Text>
                        </TouchableOpacity>
                    </View>)
                    :
                    (<View style={styles.btnBox}>
                        <TouchableOpacity
                            onPress={() => { updateProduct() }}
                            activeOpacity={0.5}
                            style={styles.button}>
                            <Text style={styles.btnTitle}>Update Product</Text>
                        </TouchableOpacity>
                    </View>)}

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: Colors.PRIMARY_COLOR,
        height: hp(15),
        paddingTop: hp(5),
        paddingHorizontal: wp(5)
    },
    netStatus: {
        color: Colors.WHITE_TEXT_COLOR,
        fontSize: hp(2.8),
        fontWeight: 'bold',
    },
    appStatus: {
        color: Colors.WHITE_TEXT_COLOR,
        fontSize: hp(2.2),
        marginTop: hp(1),
    },
    inputWrapper: {
        marginTop: hp(10),
        marginHorizontal: wp(5),
    },
    inputs: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    btnBox: {
        marginTop: hp(5),
    },
    button: {
        width: wp(90),
        height: hp(7.5),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.PRIMARY_COLOR,
        borderRadius: 8,
    },
    btnTitle: {
        fontSize: hp(2.5),
        color: Colors.WHITE_TEXT_COLOR
    },
})

export default AddPorductScreen