/* eslint-disable react-native/no-inline-styles */
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import Video from 'react-native-video';
import videosData from '../videosData';

const {height, width} = Dimensions.get('window');

const TikTokScreen = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<any>(null);

  const volOpac = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(volOpac.value, {duration: 500}),
    };
  });

  useEffect(() => {
    videoRef.current.seek(0);
    setTimeout(() => {
      volOpac.value = 0;
    }, 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMuted]);

  const renderItem = ({item, index}: any) => {
    return (
      <View>
        <Video
          ref={videoRef}
          style={styles.videoPlayer}
          poster={item.avatarUri}
          posterResizeMode="cover"
          source={{
            uri: item.uri,
          }}
          resizeMode="cover"
          paused={activeVideoIndex !== index}
          repeat
          muted={isMuted}
        />
        <Animated.View
          style={[
            {position: 'absolute', alignSelf: 'center', top: height / 2},
            animatedStyle,
          ]}>
          <TouchableWithoutFeedback
            style={{
              backgroundColor: 'rgba(0, 0, 0,0.5)',
              padding: 24,
              borderRadius: 100,
              opacity: 1,
            }}
            onPress={() => {
              setIsMuted(!isMuted);
              return (volOpac.value = 1);
            }}>
            <FontAwesomeIcon
              icon={`fa-solid fa-volume-${isMuted ? 'xmark' : 'high'}`}
              size={24}
              color="#fff"
            />
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerList}>
        <View style={{height: height}}>
          <FlatList
            data={videosData}
            renderItem={i => renderItem(i)}
            keyExtractor={i => i.id.toString()}
            pagingEnabled
            onScroll={e => {
              const index = Math.round(e.nativeEvent.contentOffset.y / height);
              setActiveVideoIndex(index);
            }}
          />
        </View>
      </View>
      <SafeAreaView edges={['top', 'left', 'right']}>
        <View>
          <Text style={styles.title}>Reels</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    paddingHorizontal: 16,
    elevation: 10,
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000000',
    shadowOpacity: 0.5,
  },
  containerList: {flex: 1, position: 'absolute'},
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  videoPlayer: {
    width: width,
    height: height,
  },
});

export default TikTokScreen;
