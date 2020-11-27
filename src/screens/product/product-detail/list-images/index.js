import Carousel, { Pagination } from 'react-native-snap-carousel';
import React from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import {useImageListFacade} from './hooks';

const W = Dimensions.get('screen').width

export default function ListImages({ data }) {
  const { activeSlide, _onUpdateActiveSlide } = useImageListFacade();
  const numberOfDots = data.length

  _renderItem = ({ item, index }) => {
    return (
      <View>
        <Image
          style={styles.image}
          source={{
            uri: item && item !== '' ? item : '',
          }}
          resizeMode='cover'
        />
      </View>
    );
  }

  _renderPagination = () => {

    return (
      <Pagination
        dotsLength={numberOfDots}
        activeDotIndex={activeSlide}
        containerStyle={[styles.pagination, {start: W / 2 - (numberOfDots * 22),}]}
        dotStyle={{
          width: 12,
          height: 12,
          borderRadius: 6,
          marginHorizontal: 0,
          backgroundColor: 'rgba(255,255,255,1)'
        }}
        inactiveDotStyle={{
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  return (
    <View>
      <Carousel
        ref={(c) => { this._carousel = c; }}
        data={data}
        renderItem={_renderItem}
        sliderWidth={W}
        itemWidth={W}
        onSnapToItem={(index) => _onUpdateActiveSlide(index) }
      />
      {_renderPagination()}
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    width: W,
    height: W,
  },
  image: {
    width: W,
    height: W,
  },
  slide: {
    width: Dimensions.get('screen').width,
    height: 200,
  },
  pagination: { 
    position: 'absolute',
    top: W - 60,
    backgroundColor: 'transparent' 
  }
})