import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Rating } from 'react-native-ratings';

// Create a Component for rating, where we can use this component in AuditForm.js and AuditHistory.js

const RatingService = ({ setRating, value, isEdit }) => {

  // handling the rating based on the isEdit prop, so in read only mode, the user cannot change the rating.
  return (
    <View>
      <Text style={styles.label}>
        {!isEdit ? 'Rating' : `Rate the service`}:
      </Text>
      <Rating
        type="custom"
        startingValue={value || 0}
        ratingCount={5}
        fractions={1}
        onFinishRating={setRating}
        readonly={!isEdit}
      />
    </View>
  );
};

export default RatingService;

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
});
