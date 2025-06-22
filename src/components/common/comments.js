import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { COLORS } from '../../constants';

// Create a Component for Comments, where we can use this component in AuditForm.js and AuditHistory.js

const Comments = ({ comment, setComment, isEdit }) => {
  // handling the Comments based on the isEdit prop, so in read only mode, the user cannot change the comments.

  return (
    <View>
      <Text style={styles.label}>Comments or Observations:</Text>
      <TextInput
        style={styles.textInput}
        multiline
        placeholder="Type your comments here..."
        value={
          !isEdit && comment === '' ? '***No comments provided***' : comment
        }
        editable={isEdit}
        onChangeText={isEdit && setComment}
        placeholderTextColor="#aaa"
      />
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  textInput: {
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    minHeight: 100,
    textAlignVertical: 'top',
    color: COLORS.black,
    fontSize: 16,
  },
});
