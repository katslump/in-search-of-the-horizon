import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TextInput,
    ListView,
    Alert,
    AsyncStorage,
    Image,
    Keyboard,
    Modal
} from 'react-native';
import {Location, Permissions} from 'expo';
// import {styles} from '../App';
import axios from 'axios';
import Geocoder from 'react-native-geocoding';
import {transfer} from './LoginScreen';
import { Button, Container, Footer, FooterTab, Icon, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Col, Row, Input } from 'native-base';

const styles = StyleSheet.create({
  tweetHead: {
    flexDirection: "row",
    padding: 10,
    paddingBottom: 0
  },
  timeStamp: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 10,
    borderBottomColor: "#CCC",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  tweetFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomColor: "#CCC",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  footerIcons: {
    flexDirection: "row",
    alignItems: "center"
  },
  tweetReply: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    paddingBottom: 0
  }
});


class UsersScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
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
                      user_id: transfer,
                      location_name: json.results[0].address_components[2].long_name
                  };
                  this.setState({currentLocation: json.results[0].address_components[2].long_name});
                  fetch('http://172.16.1.25:3000/location', {
                      method: 'POST',
                      headers: {
                          "Content-Type": "application/json"
                      },
                      body: JSON.stringify(currLocation)
                  }).then((response) => response.json()).then((responseJson) => {
                      if (responseJson) {

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
        return {title: 'Your Friends'}
    };

    componentDidMount() {
        let self = this;
        this.getLocation();
        fetch(`http://172.16.1.25:3000/users?currentUser=${transfer.currentUser}`).then((response) => response.json()).then(function(responseJson) {
            self.setState({dataSource: responseJson.users});
        }).catch(function(error) {
            self.setState({message: error});
        });
    }

    modal = () => {
      let rowDatas = this.state.rowData;
    return (
      <Modal animationIn={'slideInDown'} animationOut={'slideInUp'} visible={this.state.modalVisible} animationType={'slide'} onRequestClose={() => this.closeModal()}>
        <Button light onPress={() => this.closeModal()}
              title="Back"/>
          <Thumbnail source={{
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
        return (<Container>
            <Content style={{ backgroundColor: "white" }}>
            {this.state.modalVisible ? this.modal() : null}
            <Button iconLeft block light title="Refresh"
                onPress={() => {
                    this.getLocation()
                }}>
                <Icon name='refresh' />
                <Text>Refresh</Text>
            </Button>
                <Text style={{ textAlign: "center", fontSize: 14, color: "#AAA" }}>Current Location: {this.state.currentLocation ? this.state.currentLocation : "Refresh for location"}</Text>
                <Text style={{ textAlign: "center", fontSize: 14, color: "#AAA" }}>{transfer.currentUser}</Text>
            <List dataArray={this.state.dataSource} renderRow={(rowData) =>
                <ListItem avatar onPress={() => {this.openModal(rowData)}}>
                    <Content style={{ backgroundColor: "white" }}>
                    <View style={styles.tweetHead}>
                        <Thumbnail large source={{uri: rowData.photo}}/>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        paddingLeft: 10,
                        height: 56
                      }}
                    >
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>{rowData.f_name} {rowData.l_name}</Text>
                        <Text style={{ color: "#999", fontSize: 14 }}>{rowData.location_name ? rowData.location_name : "" }</Text>
                    </View>
                </View>
                <View>
                  <Text style={{ fontSize: 22, padding: 10 }}>
                    Bio here
                  </Text>
                </View>
                <View style={styles.timeStamp}>
                  <Text style={{ color: "#888", fontSize: 16 }}>
                    time stamp here
                  </Text>
                </View>
                  <View style={styles.tweetFooter}>
                    <View>
                      <Button transparent dark>
                        <Icon name="ios-heart-outline" />
                      </Button>
                    </View>
                    <View>
                      <Button transparent dark>
                        <Icon name="ios-mail-outline" />
                      </Button>
                    </View>
                </View>
            </Content>
              </ListItem>
            }>
          </List>
        </Content>
            <Footer>
         <FooterTab>
             <Body>
                 <Text>{this.state.message ? this.state.message.toString() : ''}</Text>
             </Body>
         </FooterTab>
       </Footer>
        </Container>)
    };
}

export default UsersScreen;
