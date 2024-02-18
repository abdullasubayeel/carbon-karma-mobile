import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../constants/colors';
import Icon from 'react-native-vector-icons/Feather';
const PasswordField = (props: any) => {
  const [visibile, setVisible] = useState(false);
  console.log(visibile);
  return (
    <View style={styles.fieldContainer}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}

      <TextInput
        secureTextEntry={!visibile}
        style={styles.field}
        {...props}></TextInput>
      {visibile ? (
        <TouchableOpacity style={styles.eye} onPress={() => setVisible(false)}>
          <Icon name="eye-off" color={COLORS.borderColor} size={24} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.eye} onPress={() => setVisible(true)}>
          <Icon name="eye" color={COLORS.borderColor} size={24} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PasswordField;

const styles = StyleSheet.create({
  fieldContainer: {
    padding: 4,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.black,
    marginLeft: 4,
    marginBottom: 8,
  },
  field: {
    borderRadius: 8,
    borderColor: COLORS.borderColor,
    borderWidth: 1,
    paddingHorizontal: 14,
  },
  eye: {
    position: 'absolute',
    right: 18,
    top: '57%',
  },
});
