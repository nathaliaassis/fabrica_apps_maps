import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: null,

      markers: [
        {
          key: 0,
          image: require('./src/assets/img/carro.png'),
          coords: { latitude: -15.7768263, longitude: -47.9008514 },
        },
        {
          key: 1,
          image: require('./src/assets/img/carro_left.png'),
          coords: { latitude: -15.7868263, longitude: -47.9208514 },
        },
        {
          key: 2,
          color: '#ff6665',
          coords: { latitude: -15.7968263, longitude: -47.9508514 },
        },
      ],
    };
    this.alterarCidade = this.alterarCidade.bind(this);
    this.newMarker = this.newMarker.bind(this);
  }
  componentDidMount() {
    Geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        this.setState({
          region: {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        });
      },
      () => { },
      {
        timeout: 2000,
        maximumAge: 1000,
      },
    );
  }
  newMarker(e) {
    let state = this.state;

    state.markers.push({
      key: state.markers.length,
      coords: {
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
      },
      pinColor: '#ff0000',
    });

    this.setState(state);
  }

  alterarCidade(lat, long) {
    let state = this.state;

    let region = {
      latitude: lat,
      longitude: long,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    state.region = region;
    this.setState(state);
  }
  render() {
    const { region, markers } = this.state;
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}> MyMap</Text>
        <MapView
          style={styles.maps}
          region={region}
          onPress={this.newMarker}
          showsUserLocation
          loadingEnabled>
          {markers.map((m) => {
            return (
              <Marker image={m.image} key={m.key} coordinate={m.coords}>
                <View style={[styles.viewMarker, { backgroundColor: m.color }]}>
                  <Text style={styles.textMarker}>olá</Text>
                </View>
              </Marker>
            );
          })}
        </MapView>
        <View style={styles.areaBtns}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.alterarCidade(-23.5492243, -46.5813785);
            }}>
            <Text style={styles.btnText}>São Paulo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.alterarCidade(-15.7768263, -47.9008514);
            }}>
            <Text style={styles.btnText}>Brasília</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginVertical: 12,
  },
  maps: {
    width: '100%',
    height: 500,
  },
  areaBtns: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btn: {
    backgroundColor: '#123456',
    height: 45,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnText: {
    fontSize: 18,
    color: 'white',
  },
  viewMarker: {
    padding: 5,
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMarker: {
    color: 'white',
  },
});
