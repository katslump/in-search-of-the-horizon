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
    Keyboard,
    Modal
} from 'react-native';
import {Location, Permissions} from 'expo';
import {styles} from '../App';
import axios from 'axios';
import Geocoder from 'react-native-geocoding';
import {myShit} from './LoginScreen'

class UsersScreen extends React.Component {
    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: ds.cloneWithRows([]),
            message: '',
            currentLocation: '',
            rowData: null,
            modalVisible: false
        };
    }

    openModal(rowData) {
      this.setState({modalVisible:true, rowData: rowData});
    }

    closeModal() {
      this.setState({modalVisible:false});
    }

    getLocation = async () => {

        let self = this;
        let currLocation = {};
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            alert("Error getting location: " + status);
        } else {

            let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
            Geocoder.setApiKey("AIzaSyAuP9_agcMpX9v27aVlU4LggxmrpzvfITY"); // use a valid API key

            Geocoder.getFromLatLng(location.coords.latitude, location.coords.longitude)
            .then(
              json => {
                  currLocation = {
                      lat: location.coords.latitude,
                      long: location.coords.longitude,
                      last_updated: new Date(),
                      user_id: myShit,
                      location_name: json.results[0].address_components[2].long_name
                  };
                  this.setState({currentLocation: json.results[0].address_components[2].long_name});
                  fetch('http://10.2.110.153:3000/location', {
                      method: 'POST',
                      headers: {
                          "Content-Type": "application/json"
                      },
                      body: JSON.stringify(currLocation)
                  }).then((response) => response.json()).then((responseJson) => {
                      if (responseJson) {
                          Alert.alert('Success', 'Your location was refreshed', [
                              {
                                  text: 'Cool'
                              }
                          ]);
                      } else {
                          this.setState({message: "There has been an error"});
                      }
                  }).catch((err) => {
                      this.setState({message: err});
                  });
              },
              error => {
                alert(error);
              }
            );
        }
    }

    static navigationOptions = ({navigation}) => {
        return {title: 'Users'}
    };

    componentDidMount() {
        let self = this;
        this.getLocation();
        fetch(`http://10.2.110.153:3000/users?currentUser=${myShit.currentUser}`).then((response) => response.json()).then(function(responseJson) {
            self.setState({dataSource: responseJson.users});
        }).catch(function(error) {
            console.log(error);
            self.setState({message: error});
        });
    }


    modal = () => {
      let rowDatas = this.state.rowData;
    return (
      <Modal animationIn={'slideInDown'} animationOut={'slideInUp'} visible={this.state.modalVisible} animationType={'slide'} onRequestClose={() => this.closeModal()}>
        <Button style={{marginTop: 20}}
              onPress={() => this.closeModal()}
              title="Back"
          />
          <Image source={{
                  uri: rowDatas.photo
              }} style={{
                  width: 100,
                  height: 100
              }}/>
          <Text>{rowDatas.f_name}
              {rowDatas.l_name}</Text>
          <Text>{rowDatas.phone}</Text>
          <Text>{rowDatas.location_name ? "Current Location:" + rowDatas.location_name : "" }</Text>
          <Text>{JSON.stringify(rowDatas.cohort)}</Text>
      </Modal>
    )
  }

    render() {
        var dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => (r1 !== r2)
        });
        return (<View style={styles.container}>
            {this.state.modalVisible ? this.modal() : null}
            <TouchableOpacity onPress={() => {
                    this.getLocation()
                }}>
                <Text>Refresh</Text>
            </TouchableOpacity>
            <Text>Current Location: {this.state.currentLocation ? this.state.currentLocation : "Refresh for location"}</Text>
            <Text>Current User: {myShit.currentUser}</Text>
            <Text>{this.state.message}</Text>
            <ListView style={styles.listContainer} dataSource={dataSource.cloneWithRows(this.state.dataSource)} renderRow={(rowData) => <View style={styles.listRow}>
                  <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}} onPress={() => {this.openModal(rowData)}} >
                    <Image source={{
                            uri: rowData.photo
                        }} style={{
                            width: 100,
                            height: 100,
                        }}/>
                    <Text>{rowData.f_name}
                        {rowData.l_name}</Text>
                    <Text>{rowData.phone}</Text>
                    <Text>{rowData.location_name ? "Current Location:" + rowData.location_name : "" }</Text>
                    <Text>{JSON.stringify(rowData.cohort)}</Text>
                  </TouchableOpacity>
                </View>}/>
        </View>)
    };
}

export default UsersScreen;
