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
import {Location, Permissions} from 'expo';
import {styles} from '../App';

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

  componentWillMount() {

    // GET /users via axios

  }

  render() {
    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => (r1 !== r2)
    });

    return (<View style={styles.container}>
      <Text>{this.state.message}</Text>
      <ListView style={styles.listContainer} dataSource={dataSource.cloneWithRows(this.state.dataSource)} renderRow={(rowData) =>
          <View style={styles.listRow}>
            <Text>{rowData.username}</Text>
          </View>}/>
    </View>)
  };
}

export default UsersScreen;
