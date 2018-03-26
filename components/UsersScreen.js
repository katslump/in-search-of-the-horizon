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
import axios from 'axios';
import Geocoder from 'react-native-geocoding';
import {transfer} from './LoginScreen';
import TimeAgo from 'react-timeago';
import { Button,Card, CardItem, Container, Footer, FooterTab, Icon, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Col, Row, Input } from 'native-base';

const styles = StyleSheet.create({
  tweetHead: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 0
  },
  tweetFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomColor: "#CCC",
    borderBottomWidth: StyleSheet.hairlineWidth
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
            Geocoder.setApiKey(process.env.GOOGLE_API); // use a valid API key

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
        return {title: 'Near You',
                headerRight: (<Button transparent onPress={() => navigation.navigate('Settings')}><Icon name="settings"/></Button>)}
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
      <Modal visible={this.state.modalVisible}  transparent={true} onRequestClose={() => this.closeModal()}>
          <Header>
              <Left>
            <Button transparent onPress={() => this.closeModal()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
        </Header>
          <Content>
              <Card style={{paddingTop: 20}}>
                  <CardItem header>
                 <Text style={{ fontWeight: "bold", fontSize: 18 }}>{rowDatas.f_name} {rowDatas.l_name}</Text>
               </CardItem>
               <CardItem>
                  <Body>
                      <Thumbnail source={{
                              uri: rowDatas.photo
                          }} style={{
                              width: 100,
                              height: 100
                          }}/>
                      <Text style={{ fontWeight: "bold", fontSize: 12 }}>{rowDatas.phone}</Text>
                      <Text style={{ color: "#343434", fontSize: 14 }}>{rowDatas.location_name ? rowDatas.location_name : "" }</Text>
                      <Text>{JSON.stringify(rowDatas.cohort)}</Text>
                </Body>
            </CardItem>
            <CardItem footer>
                <Text>More info here</Text>
            </CardItem>
            </Card>
        </Content>
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
                <Text style={{ textAlign: "center", fontSize: 14, color: "#AAA" }}>Current Location: {this.state.currentLocation ? this.state.currentLocation : "Refresh for location"}</Text>
            </Button>
            <List dataArray={this.state.dataSource} renderRow={(rowData) =>
                <ListItem avatar onPress={() => {this.openModal(rowData)}}>
                    <Content style={{ backgroundColor: "white" }}>
                    <View style={styles.tweetHead}>
                        <Thumbnail large source={{uri: rowData.photo}}/>
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        paddingLeft: 10,
                        paddingTop: 10,
                        paddingBottom: 0,
                        height: 55
                      }}>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>{rowData.f_name} {rowData.l_name}</Text>
                        <Text style={{ color: "#343434", fontSize: 14 }}>
                            {rowData.location_name ? rowData.location_name : "" }
                        </Text>
                        <Text style={{ color: "#999", fontSize: 12 }}>
                            Last updated 5 min ago
                        </Text>
                    </View>
                </View>
                 <View style={styles.tweetFooter}>
                    {/* <View>
                    </View>
                    <View>
                    </View>
                    <View>
                    </View>
                    <View>
                      <Button transparent dark>
                        <Icon name="ios-mail-outline" />
                      </Button>
                    </View> */}
                </View>
            </Content>
              </ListItem>
            }>
          </List>
        </Content>
            <Footer>
         <FooterTab>
             <Body>
                 <Text style={{ textAlign: "center", fontSize: 14, color: "#AAA" }}>{transfer.currentUser}</Text>
                 <Text>{this.state.message ? this.state.message.toString() : ''}</Text>
             </Body>
         </FooterTab>
       </Footer>
        </Container>)
    };
}

export default UsersScreen;
