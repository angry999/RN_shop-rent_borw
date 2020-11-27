import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useImageListFacade } from './hooks';
import { margin } from 'src/components/config/spacing';

const W = Dimensions.get('screen').width
const H = Dimensions.get('screen').height

export default function ImageFullScreen({ listImages, _onShowFullScreen, firstImage }) {
  const { activeSlide, firstItem, _onUpdateActiveSlide } = useImageListFacade(firstImage);

  _renderItem = ({ item, index }) => {
    return (
      <View style={styles.containerImage}>
        <FastImage
          style={styles.image}
          source={{
            uri: item && item !== '' ? item.uri ? item.uri : item :
              'https://s3.eu-central-1.amazonaws.com/storage.propmap.io/staging/uploads/user/avatar/25/user_account_profile_avatar_person_student_male-512.jpg',
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    );
  }

  _renderPagination = () => {
    return (
      <Pagination
        dotsLength={listImages.length}
        activeDotIndex={activeSlide}
        containerStyle={{ backgroundColor: 'transparent' }}
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
      <Modal isVisible={true} onBackdropPress={() => _onShowFullScreen(false)}>
        <View style={styles.containerContent}>
          <Carousel
            ref={(c) => { this._carousel = c; }}
            firstItem={firstItem}
            data={listImages}
            renderItem={_renderItem}
            sliderWidth={W}
            itemWidth={W - 32}
            onSnapToItem={(index) => _onUpdateActiveSlide(index)}
          />
          {_renderPagination()}
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  // container: {
  //   height: H,
  //   backgroundColor: colors.white,
  //   alignItems: 'center',
  //   justifyContent: 'center'
  // },
  containerContent: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerImage: {
    width: W,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  image: {
    width: W - margin.big,
    height: W - margin.big,
    borderRadius: 16,
  },
})

