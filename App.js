import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { getPixel } from './src/utils';

import MapView, { Marker, Callout } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: null,
      destLocation: null,

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
          coords: { latitude: -15.8188182, longitude: -48.0922574 },
        },
        {
          key: 3,
          color: '#aaffaa',
          coords: { latitude: -15.8274373, longitude: -48.0905635 },
        },
      ],
    };
    this.alterarCidade = this.alterarCidade.bind(this);
    this.newMarker = this.newMarker.bind(this);
    this.novoDestino = this.novoDestino.bind(this);
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
        enableHighAccuracy: true,
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
  novoDestino(lat, long) {
    this.setState({
      destLocation: {
        latitude: lat,
        longitude: long,
      },
    });
  }
  render() {
    const { region, markers } = this.state;
    return (
      <ScrollView style={styles.container}>
        <MapView
          ref={(map) => {
            this.map = map;
          }}
          style={styles.maps}
          region={region}
          // onPress={this.newMarker}
          showsUserLocation
          loadingEnabled>
          {this.state.destLocation && (
            <MapViewDirections
              origin={this.state.region}
              destination={this.state.destLocation}
              apikey="AIzaSyAtIeXAJ1qT-4WhTRmz3_0mK9lxK70LHNk"
              strokeWidth={2}
              strokeColor="#ff7777"
              onReady={(result) => {
                this.map.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: getPixel(50),
                    left: getPixel(50),
                    top: getPixel(50),
                    bottom: getPixel(50),
                  },
                });
              }}
            />
          )}
          {/* {markers.map((m) => {
            return (
              <Marker image={m.image} key={m.key} coordinate={m.coords}>
                <View style={[styles.viewMarker, { backgroundColor: m.color }]}>
                  <Text style={styles.textMarker}>olá</Text>
                </View>
                <Callout tooltip={true}>
                  <View style={styles.viewTooltip}>
                    <Text style={styles.tooltipText}>eae</Text>
                  </View>
                </Callout>
              </Marker>
            );
          })} */}
        </MapView>
        <ScrollView
          style={styles.box}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.localView}>
            {/* 15.8418868,-48.0526351 */}
            <TouchableOpacity
              style={styles.localBtn}
              onPress={() => this.novoDestino(-15.8418868, -48.0526351)}>
              <Text style={styles.localText}>Burger King</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.localView}>
            {/* 15.8419128,-48.046069 */}
            <TouchableOpacity
              style={styles.localBtn}
              onPress={() => this.novoDestino(-15.8419128, -48.046069)}>
              <Text style={styles.localText}>Shopping</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.localView}>
            {/* 15.8406292,-48.0236391 */}
            <TouchableOpacity
              style={styles.localBtn}
              onPress={() => this.novoDestino(-15.8406292, -48.0236391)}>
              <Text style={styles.localText}>Farmácia</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.localView}>
            {/* 15.8391276,-48.0409236 */}
            <TouchableOpacity
              style={styles.localBtn}
              onPress={() => this.novoDestino(-15.8391276, -48.0409236)}>
              <Text style={styles.localText}>Padaria</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.localView}>
            {/* 15.8391173,-48.0409236 */}
            <TouchableOpacity
              style={styles.localBtn}
              onPress={() => this.novoDestino(-15.8391173, -48.0409236)}>
              <Text style={styles.localText}>Pizzaria</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  viewTooltip: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    backgroundColor: '#ddd',
    padding: 5,
  },
  tooltipText: {
    color: '#313131',
    fontSize: 14,
  },
  box: {
    position: 'absolute',
    top: 16,
    margin: 16,
    height: 70,
  },
  localView: {
    height: 40,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  localBtn: {
    padding: 8,
    paddingHorizontal: 20,
    backgroundColor: '#ff5555',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  localText: {
    color: '#fff',
  },
});
