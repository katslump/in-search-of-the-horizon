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
      let self = this;
    fetch('http://Kats-MacBook-Pro.local:3000/users')
    .then((response) => response.json())
    .then(function(responseJson) {
        self.setState({dataSource: responseJson.users});
    })
    .catch(function(error) {
      self.setState({message: error});
    });

  }

  render() {
    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => (r1 !== r2)
    });

    return (<View style={styles.container}>
      <Text>{this.state.message}</Text>
      <ListView style={styles.listContainer} dataSource={dataSource.cloneWithRows(this.state.dataSource)} renderRow={(rowData) =>
          <View style={styles.listRow}>
              <Image source={{uri: rowData.photo}}
       style={{width: 100, height: 100}} />
              <Text>{rowData.f_name} {rowData.l_name}</Text>
              <Text>{rowData.phone}</Text>
              <Text>{JSON.stringify(rowData.cohort)}</Text>
          </View>}/>
    </View>)
  };
}

export default UsersScreen;
