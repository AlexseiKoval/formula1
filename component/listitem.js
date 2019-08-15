import React, { Component } from "react";
import { StyleSheet, Text, View, Alert, ScrollView, Dimensions } from "react-native";
import { connect } from 'react-redux';

import axios from 'axios';


class AppItems extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('FIO', '<< не заполнено >>'),
        };
    };


    constructor(props) {
        super(props);
    }


    setStateAddF1 = () => {
        const { navigation } = this.props;
        const driverId = navigation.getParam('driverId', null);

        axios.get(`http://ergast.com/api/f1/drivers/${driverId}/constructors/renault/results.json`)
            .then(response => {
                this.props.funcItemsItem(response.data.MRData.RaceTable.Races);
                this.setState({});
            })
            .catch(error => {
                Alert.alert("Ошибка, возможно нет соединения");
            });

    }

    componentDidMount() {
        this.setStateAddF1();
    }

    render() {
        return (
            <ScrollView>
                {this.props.masItemsItem.map((item, index) =>

                    <View style={styles.itemlist} key={index}>

                        <View style={{ flexDirection: 'column' }}>
                            <Text style={Object.assign({}, styles.item, { fontSize: 10, color: '#778899' })} >Сезон:{item.season} Раунд:{item.round}</Text>
                            <Text style={Object.assign({}, styles.item, { fontSize: 10, color: '#778899' })} >Рейс:{item.raceName} </Text>
                            <Text style={Object.assign({}, styles.item, { fontSize: 10, color: '#D2691E' })}   >{item.url}</Text>
                        </View>
                    </View>)}

            </ScrollView>
        );
    }
}

// Основной оьбъект
export default connect(
    state => ({
        myname: state.name,
        masItemsItem: state.masItemsItem
    }),
    dispath => ({
        funcItemsItem: (masItems) => { dispath({ type: 'getMasItemsItem', masItems: masItems }) }
    }
    )
)(AppItems)

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

        backgroundColor: "#e5e5e5",
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#fff',
    },


});