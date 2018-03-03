import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TextInput,
    ListView,
    Alert,
    Button,
    AsyncStorage,
    Image,
    Keyboard
} from 'react-native';
import {Location, Permissions} from 'expo';
import {styles} from '../App';
import axios from 'axios';

const self = this;

class UsersScreen extends React.Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: ds.cloneWithRows([]),
            message: ''
        };
    }

    getLocation = async () => {
        alert("GOT IT");
        let currLocation = {};
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          alert("Error getting location: " + status);
        } else {
          let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
          currLocation = {
            lat: location.coords.latitude,
            long: location.coords.longitude,
            last_updated: new Date(),
            user_id: "5a9999e3f379104f91ec5001"
          };
          fetch('http://Kats-MacBook-Pro.local:3000/location', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(currLocation)
          })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.success) {
              Alert.alert('Success', 'Your location was refreshed', [
                {
                  text: 'Cool'
                }
              ]);
            } else {
              this.setState({message: responseJson.error});
              console.log(responseJson.error);
            }
          }).catch((err) => {
            console.log(err);
            this.setState({message: err});
          });
        }
    }


    static navigationOptions = ({navigation}) => {
        return {title: 'Users'}
    };

    componentDidMount() {
        let self = this;
        // fetch('http://Kats-MacBook-Pro.local:3000/users').then((response) => response.json()).then(function(responseJson) {
        //     self.setState({dataSource: responseJson.users});
        // }).catch(function(error) {
        //     self.setState({message: error});
        // });

    }

    render() {
        var dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => (r1 !== r2)
        });

        return (<View style={styles.container}>
            <TouchableOpacity onPress={() => {this.getLocation()}}><Text>Refresh</Text></TouchableOpacity>
            <Text>{this.state.message}</Text>
            <ListView style={styles.listContainer} dataSource={dataSource.cloneWithRows(this.state.dataSource)} renderRow={(rowData) => <View style={styles.listRow}>
                    <Image source={{
                            uri: rowData.photo
                        }} style={{
                            width: 100,
                            height: 100
                        }}/>
                    <Text>{rowData.f_name}
                        {rowData.l_name}</Text>
                    <Text>{rowData.phone}</Text>
                    <Text>{JSON.stringify(rowData.cohort)}</Text>
                </View>}/>
        </View>)
    };
}

export default UsersScreen;
