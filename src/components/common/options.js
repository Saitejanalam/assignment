import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants';

// Create a Component for Options, where we can use this component in AuditForm.js and AuditHistory.js

const Options = ({ checkboxes, setCheckboxes, isEdit }) => {

  // handling the selecting Options based on the isEdit prop, so in read only mode, the user cannot change the Checkboxes.
  return (
    <View>
      <Text style={styles.label}>Quality of Compliance:</Text>
      {Object.keys(checkboxes).map(key => (
        <View key={key} style={styles.checkboxContainer}>
          <CheckBox
            disabled={!isEdit}
            value={checkboxes[key]}
            // allowing user to only select one checkbox
            onValueChange={() => {
              const updatedCheckboxes = Object.fromEntries(
                Object.keys(checkboxes).map(k => [k, k === key]),
              );
              setCheckboxes(updatedCheckboxes);
            }}
            tintColors={{ true: COLORS.primary, false: undefined }}
          />

          <Text style={styles.checkboxLabel}>{key}</Text>
        </View>
      ))}
    </View>
  );
};

export default Options;

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkboxLabel: {
    fontSize: 16,
  },
});
