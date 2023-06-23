import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Button,
  SafeAreaView,
  PanResponder,
  Animated,
} from 'react-native';
import { Easing } from 'react-native';

import {blockNumbers} from "./ActionsScreen";

import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo
const MainScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageData, setImageData] = useState([
    require('./assets/pngwing.com.png'),
    require('./assets/pngwing2.png'),
    require('./assets/pngwing3.png'),
    require('./assets/pngwing4.png'),
  ]);
  const [livePosition, setLivePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [message, setMessage] = useState('');
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }],{useNativeDriver: false}),
      onPanResponderRelease: () => {
        // Reset the position after releasing
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
      },
    })
  ).current;


  const handleActionPress = (image) => {
    console.log('Action pressed for sprite:', image);
    navigation.navigate('Actions', { image });
  };
  const handleImagePress = (image) => {
    setSelectedImage(image);
  };
  const resettt = () => {
    pan.setValue({ x: 0, y: 0 }); 
    setLivePosition({ x: 0, y: 0 }); 
    setSelectedImage(null); 
    setRotation(0);
    setMessage('');

  };
  
  const handleRunPress = () => {
    const newX = pan.x._value + 50;
  
    Animated.timing(pan, {
      toValue: { x: newX, y: pan.y._value },
      duration: 500, 
      useNativeDriver: false,
      easing: Easing.linear,
    }).start(() => {
      setRotation(15);
      setMessage('Hello');
    });
  
    setLivePosition({ x: newX, y: pan.y._value });
  };
  

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.topBox}>
        {selectedImage ? (
          <Animated.View
          style={[
            styles.selectedImageContainer,
            {
              transform: [
                { translateX: pan.x },
                { translateY: pan.y },
                { rotate: `${rotation}deg` }, 
              ],
            },
          ]}
        >
          <Text style={styles.messageText}>{message}</Text>
          <Image source={selectedImage} style={[styles.selectedImage, selectedImage.style]} />
          
        </Animated.View>
        ) : (
          <Text style={styles.placeholderText}>Select Sprite</Text>
        )}
      </View>

      <View style={styles.middleBox}>
  <View style={styles.coordinatesContainer}>
  <Text style={styles.coordinatesText}>
  X: {Math.round(livePosition.x)}, Y: {Math.round(livePosition.y)}
  </Text>

    {/* Reset Icon */}
    <TouchableOpacity style={styles.resetButton} onPress={resettt}>
      <Ionicons name="refresh-outline" size={24} color="black" />
    </TouchableOpacity>

    {/* Run Icon */}
    <TouchableOpacity style={styles.runButton} onPress={handleRunPress}>
      <Ionicons name="play-outline" size={24} color="black" />
    </TouchableOpacity>
  </View>
</View>



      <View style={styles.bottomBox}>
        <View style={styles.imageBoxContainer}>
          {imageData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.imageBox}
              onPress={() => handleImagePress(item)}
            >
              <Image source={item} style={styles.thumbnailImage} />
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleActionPress(item)}
              >
                <Text style={styles.actionButtonText}>Add Action</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

// Styles...

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  topBox: {
    flex: 2,
    borderWidth: 11,
    borderColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  middleBox: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  bottomBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: 'lightgrey',
    height: 160,
    marginVertical: 10,
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedImageContainer: {
    width: '70%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedImage: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
  thumbnailImage: {
    width: '98%',
    height: '75%',
    resizeMode: 'cover',
  },
  imageBox: {
    width: 100,
    height: 150,
    borderWidth: 1,
    borderColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  coordinatesText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButton: {
    backgroundColor: 'blue',
    marginBottom: 10,
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  middleBox: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  coordinatesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coordinatesText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  resetButton: {
    marginRight: 10,
  },
  runButton: {},

});

export default MainScreen;
