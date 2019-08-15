import React, { Component } from "react";
import { StyleSheet, FlatList, Text, View, Alert,  Dimensions, TouchableHighlight } from "react-native";
import { connect } from 'react-redux';

import axios from 'axios';

class AppF1List extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Список гонщиков',

        };
    };


    constructor(props) {
        super(props);
        this.state = { limit: 10, offset: 0 }
    }

    setStateAddF1 = (Newlimit = 10, Newoffset = 0) => {
        if (Newoffset >= 0) {
            axios.get(`http://ergast.com/api/f1/drivers.json?limit=10&${Newlimit}&offset=${Newoffset}`)
                .then(response => {
                  
                    if (response.data.MRData.DriverTable.Drivers.length > 0) {
                        this.props.getNewList(response.data.MRData.DriverTable.Drivers);
                        this.setState({ limit: Newlimit, offset: Newoffset })
                    }
                })
                .catch(error => {
                    Alert.alert("Ошибка, возможно нет соединения");
                });
        }
    }


    componentDidMount() {
        this.setStateAddF1();

    }


    FlatListSeparator = () => {
        return (
            <View style={{ height: 1, width: "100%", backgroundColor: "#607D8B" }} />
        );
    };


    ItemRender = ({ item, index }) => {
        return (
            <View style={styles.itemlist} key={index}>

                <TouchableHighlight key={index}
                    onPress={() => { this.props.navigation.navigate('AppItems', {driverId:item.driverId , FIO:  item.givenName +' '+ item.familyName  })}}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.item} >{item.givenName} {item.familyName} </Text>
                        <Text style={Object.assign({}, styles.item, { fontSize: 10, color: '#778899' })} >{item.dateOfBirth} {item.nationality}</Text>
                        <Text style={Object.assign({}, styles.item, { fontSize: 10, color: '#D2691E' })}   >{item.url}</Text>

                    </View>
                </TouchableHighlight>

            </View>)
    }


    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.masItems}
                    ItemSeparatorComponent={this.FlatListSeparator}
                    renderItem={this.ItemRender}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                    <TouchableHighlight
                        onPress={() => { this.setStateAddF1(10, this.state.offset - 10) }}>
                        <Text style={Object.assign({}, styles.item, { fontSize: 40, color: '#778899' })}  > &lt; </Text>
                    </TouchableHighlight>

                    <Text style={Object.assign({}, styles.item, { fontSize: 10, color: '#778899' })}  >Страница: {this.state.offset / 10 + 1} </Text>

                    <TouchableHighlight
                        onPress={() => { this.setStateAddF1(10, this.state.offset + 10) }}>
                        <Text style={Object.assign({}, styles.item, { fontSize: 40, color: '#778899' })}  > &gt; </Text>
                    </TouchableHighlight>

                </View>

            </View>);
    }
}

// Основной оьбъект
export default connect(
    state => ({
        myname: state.name,
        masItems: state.masItems
    }),
    dispath => ({
        getNewList: (masItems) => { dispath({ type: 'getNewList', masItems: masItems }) }
    }
    )
)(AppF1List)

// основные стили
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#e5e5e5",
        // alignItems: 'center',
    },
    itemlist: {
        paddingLeft: 5,
        flex: 1,
        justifyContent: "space-between",
        alignItems: 'center',
        height: (Dimensions.get('window').width / 3.5) + 5,
        backgroundColor: "#e5e5e5",
        flexDirection: 'row'
    },

    item: {

        fontSize: 20,

        textAlignVertical: 'center'
    },


});