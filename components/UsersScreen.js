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
  Keyboard
} from 'react-native';
import {styles} from '../App';
import axios from 'axios';

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

  static navigationOptions = ({navigation}) => {
    return {title: 'Users'}
  };

  messages() {
    this.props.navigation.navigate("Messages");
  }

  componentDidMount() {
      console.log("MOUNTINGS");
    // GET /users via axios
    let self = this;

    fetch('http://Kats-MacBook-Pro.local:3000/')
    .then((response) => response.json())
    .then(function(responseJson) {
        console.log("/");
        console.log(responseJson);
    })
    .catch(function(error) {
    //   self.setState({message: error});
        console.log(error);
    });

    // axios.get('/users').then(function(response) {
    //     console.log(response);
    // //   self.setState({dataSource: response});
    // }).catch(function(error) {
    // //   self.setState({message: error});
    // console.log(error);
    // });

  }

  render() {
    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => (r1 !== r2)
    });

    return (<View style={styles.container}>
      <Text>{this.state.message}</Text>
      <ListView style={styles.listContainer} dataSource={dataSource.cloneWithRows(this.state.dataSource)} renderRow={(rowData) =>
          <View style={styles.listRow}>
          </View>}/>
    </View>)
  };
}

export default UsersScreen;
