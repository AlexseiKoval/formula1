import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';

const Skiingimg = require('.././assets/skin.jpg');

class AppStart extends Component {

    
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'ФОРМУЛА 1',
 
        };
    };


    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity onPress={() => { this.props.navigation.navigate('AppList') }}>

                    <Text style={{ fontSize: 10, color: '#808080', textAlign: 'center' }}>Cписок гонщиков</Text>
                    <Text style={{ fontSize: 10, color: '#808080', textAlign: 'center' }}>(нажмите на картинку)</Text>
                    <View style={styles.ViewShadow}>
                        <Image
                            style={styles.img5}
                            source={Skiingimg}
                        />
                    </View>
                </TouchableOpacity>




            </View>)
    }
}

// Основной оьбъект
export default connect(
    state => ({

    }),
    dispath => ({

    }
    )
)(AppStart)

// основные стили
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#e5e5e5",
        alignItems: 'center',
    },
 
    img5: {

        width: Dimensions.get('window').width / 2,
        height: Dimensions.get('window').width / 2,
        alignItems: 'center',

    },
    ViewShadow:
    {
        width: Dimensions.get('window').width / 2,
        height: Dimensions.get('window').width / 2,


        backgroundColor: '#808080',
        shadowColor: '#30C1DD',
        shadowRadius: 10,
        shadowOpacity: 0.6,
        elevation: 8,
        shadowOffset: { width: 0, height: 4 }
    }

});