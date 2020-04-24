import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
  const [region, setRegion] = useState({
    latitude: -15.7768263,
    longitude: -47.9008514,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  function alterarCidade(lat, long) {
    setRegion({
      latitude: lat,
      longitude: long,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  }

  const [markers, setMarkers] = useState([
    {
      key: 0,
      coords: { latitude: -15.7768263, longitude: -47.9008514 },
      pinColor: '#ff0000',
    },
    {
      key: 1,
      coords: { latitude: -15.7868263, longitude: -47.9208514 },
      pinColor: '#0000ff',
    },
    {
      key: 2,
      coords: { latitude: -15.7968263, longitude: -47.9508514 },
      pinColor: '#00ff00',
    },
  ]);

  function newMarker(e) {
    markers.push({
      key: markers.length,
      coords: {
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
      },
      pinColor: '#ff0000',
    });
    setMarkers(markers);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}> MyMap</Text>
      <MapView
        style={styles.maps}
        region={region}
        onPress={(e) => newMarker(e)}>
        {markers.map((m) => {
          return (
            <Marker key={m.key} coordinate={m.coords} pinColor={m.pinColor} />
          );
        })}
      </MapView>
      <View style={styles.areaBtns}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => alterarCidade(-23.5492243, -46.5813785)}>
          <Text style={styles.btnText}>São Paulo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => alterarCidade(-15.7768263, -47.9008514)}>
          <Text style={styles.btnText}>Brasília</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
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
});
