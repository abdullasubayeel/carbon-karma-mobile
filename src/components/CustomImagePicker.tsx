import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/colors';
import {launchImageLibrary} from 'react-native-image-picker';

import Icon from 'react-native-vector-icons/AntDesign';

const CustomImagePicker = ({label, setSelectedAssets}: any) => {
  const options = {
    mediaType: 'photo',
    cameraType: 'back',
    durationLimit: 5,
    saveToPhotos: true,
  };

  const openGallery = async () => {
    //@ts-ignore
    const result = await launchImageLibrary(options);
    setSelectedAssets(result.assets);
  };

  return (
    <Pressable style={styles.fieldContainer} onPress={openGallery}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.field}>
        <Text style={{color: COLORS.borderColor}}>Upload an Image</Text>
        <Icon name="upload" />
      </View>
    </Pressable>
  );
};

export default CustomImagePicker;

const styles = StyleSheet.create({
  fieldContainer: {
    padding: 4,
  },
  label: {
    fontSize: 14,
    color: COLORS.black,
    marginLeft: 4,
    marginBottom: 8,
  },
  field: {
    borderRadius: 12,
    borderColor: COLORS.borderColor,
    borderWidth: 1,
    padding: 14,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
