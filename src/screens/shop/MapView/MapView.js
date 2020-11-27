import React, { useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity, Image, Platform, Dimensions } from 'react-native';
import { Text, Modal } from 'src/components';
import { margin, padding } from 'src/components/config/spacing';
import { useMapViewFacade } from './hooks';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Input from 'src/containers/input/Input';
import { sizes } from 'src/components/config/fonts';
import * as colors from 'src/components/config/colors';

const H = Dimensions.get('screen').height

export default function MapViewComponent({ t, onChangeLocation, editableLocation, style, onUpdateAddress, CustomComponent }) {
  const { location, address, isVisible, imagePreviewUrl, markerCoordinates,
    _onChangePreviewLocation, _onAddressSubmit, _onChangeAddress, _onGetAdress,
    _onGetCurrentLocation, _onChangeVisible, _onChangeMarker, _onUserTapped } = useMapViewFacade(editableLocation, t);

  useEffect(() => {
    if (address) {
      onUpdateAddress(address)
    }
  }, [address])

  const saveElement = () => {
    return (
      <TouchableOpacity onPress={() => {
        _onChangePreviewLocation();
        const loc = location[0] + ',' + location[1]
        onChangeLocation(loc);
        _onGetAdress(location)
      }}>
        <Text style={{ color: colors.selIcon }}>{t('shop:text_save')}</Text>
      </TouchableOpacity>
    )
  }

  useEffect(() => {
    if (location) {
      const loc = location[0] + ',' + location[1]
      onChangeLocation(loc);
    }
  }, [location])

  return (
    <View style={[styles.container, style]}>
      {CustomComponent ? <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Input
          flex={1}
          inputContainerStyle={styles.inputAddress}
          label={t('shop:text_address')}
          value={address}
          style={{ fontSize: sizes.h4, color: colors.white, fontFamily: 'Lato-regular' }}
          multiline={true}
          numberOfLines={2}
          onEndEditing={() => _onAddressSubmit()}
          onChangeText={value => _onChangeAddress(value)}
        />
        <CustomComponent />
      </View> : <Input
          inputContainerStyle={styles.inputAddress}
          label={t('shop:text_address')}
          value={address}
          style={{ fontSize: sizes.h4, color: colors.white, fontFamily: 'Lato-regular' }}
          multiline={true}
          numberOfLines={2}
          onEndEditing={() => _onAddressSubmit()}
          onChangeText={value => _onChangeAddress(value)}
        />}

      <TouchableOpacity onPress={_onChangeVisible}>
        <Image style={styles.map} source={{ uri: imagePreviewUrl ? imagePreviewUrl : '' }} />
      </TouchableOpacity>

      <View style={styles.containerOption}>
        <TouchableOpacity style={styles.item} onPress={() => _onGetCurrentLocation()}>
          <MaterialCommunityIcons style={styles.icon} name='crosshairs-gps' size={24} color={colors.text_color} />
          <Text h5 style={{ color: colors.grey5 }}>{t('map:text_get_my_location')}</Text>
        </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={_onChangeVisible}>
            <MaterialCommunityIcons style={styles.icon} name='map-marker-outline' size={24} color={colors.text_color} />
            <Text h5 style={{ color: colors.grey5 }}>{t('map:text_pick_on_map')}</Text>
          </TouchableOpacity>
      </View>

      <Modal
        visible={isVisible}
        noBorder={true}
        topRightElement={saveElement()}
        headerStyle={{ marginTop: 0, paddingTop: Platform.OS == 'ios' && H >= 812 ? padding.big * 1.2 : padding.small, 
        backgroundColor: colors.black  }}
        setModalVisible={_onChangeVisible}
        ratioHeight={1}>
        <MapView
          style={{ flex: 1 }}
          onPress={(e) => _onUserTapped({ x: e.nativeEvent.coordinate })}
          initialRegion={{
            latitude: location[0],
            longitude: location[1],
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={{
            latitude: location[0],
            longitude: location[1],
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            draggable
            coordinate={markerCoordinates}
            title='Picked Location'
            onDragEnd={(e) => _onChangeMarker({ x: e.nativeEvent.coordinate })}
          />
        </MapView>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: margin.base,
    marginTop: margin.base
  },
  containerOption: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  map: {
    height: 240,
    marginBottom: margin.big,
    marginTop: margin.base,
    borderRadius: margin.small
  },
  item: {
    flex: 0.45,
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginEnd: margin.tiny
  },
  inputAddress: {
    paddingBottom: margin.small,
  }
})