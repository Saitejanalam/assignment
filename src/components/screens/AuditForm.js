import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Icon from 'react-native-vector-icons/FontAwesome5';
// Constant COLORS
import { COLORS } from '../../constants';
// review component
import RatingService from '../common/rating';
import Options from '../common/options';
import Comments from '../common/comments';
// Summary
import Summary from '../common/summary';
// using useUser to fetch username
import { useUser } from '../../useContext/UserContext';

const AuditForm = () => {
  const { username } = useUser();
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [rating, setRating] = useState(0);
  const [checkboxes, setCheckboxes] = useState({
    Excellent: false,
    Good: false,
    Avg: false,
  });
  const [comment, setComment] = useState('');
  const [newAuditData, setNewAuditData] = useState(null);

  const handleCancel = () => {
    // onCancel submissing of Audit Form closing the form
    setShowForm(false);
  };

  const handleSubmit = async () => {
    try {
      // creating a newAudit object.
      const newAudit = {
        username: username || 'Anonymous',
        rating,
        selections: checkboxes,
        comment,
        timestamp: Date.now(),
      };
      setNewAuditData(newAudit);

      // fetching the existing audit object
      const existing = await AsyncStorage.getItem('audits');

      // intialzing the audits as empty array
      let audits = [];

      // if any existing audits setting it to audits variable
      if (existing) {
        audits = JSON.parse(existing);
      }

      // adding the newly created object to aduits variable and setting it to AsyncStorage
      audits.push(newAudit);
      await AsyncStorage.setItem('audits', JSON.stringify(audits));
      // displaying the submitted audit in summary page.
      setShowForm(false);
      setShowSuccess(true);
    } catch (error) {
      console.error('Error saving audit:', error);
    }
  };

  // on close of the summary popup, setting the states to intial states.
  const handleClose = () => {
    setShowSuccess(false);
    setShowForm(false);
    setRating(0);
    setCheckboxes({ Excellent: false, Good: false, Avg: false });
    setComment('');
  };

  // Entry page of the Audit form.
  if (!showForm) {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Icon name={'file-alt'} size={125} color={COLORS.primary} />
          <Text style={styles.heading}>Submit a New Audit Form</Text>
        </View>
        <View style={styles.button}>
          <Button
            title="Start New Audit"
            onPress={() => setShowForm(true)}
            color={COLORS.primary}
          />
        </View>
        {/*  displying the submitted item in the Summary Popup */}
        {showSuccess && (
          <Summary
            auditObject={newAuditData}
            onClose={handleClose}
            showSuccessMsg={true}
          />
        )}
      </View>
    );
  }

  // Multi step Audit form.
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Audit Form</Text>
      {/* ProgressSteps */}
      <ProgressSteps
        completedProgressBarColor={COLORS.primary}
        activeStepIconBorderColor={COLORS.primary}
        activeLabelColor={COLORS.primary}
        completedStepIconColor={COLORS.primary}
        labelFontSize={16}
      >
        {/* step1 for the rating */}
        <ProgressStep
          label="Rating"
          nextBtnTextStyle={{ color: 'blue' }}
          buttonFillColor={COLORS.primary}
          previousBtnDisabled={true}
          buttonNextDisabled={rating === 0}
        >
          <View style={{ marginTop: 20 }}>
            <RatingService setRating={setRating} value={rating} isEdit={true} />
          </View>
        </ProgressStep>

        {/* step2 for the Compliance options */}
        <ProgressStep
          label="Compliance"
          nextBtnTextStyle={{ color: COLORS.primary }}
          previousBtnTextStyle={{ color: COLORS.primary }}
          nextBtnStyle={styles.buttonWidth}
          buttonFillColor={COLORS.primary}
          buttonBorderColor={COLORS.primary}
          buttonPreviousTextColor={COLORS.primary}
          previousBtnStyle={styles.buttonWidth}
        >
          <View style={{ marginTop: 20 }}>
            <Options
              checkboxes={checkboxes}
              setCheckboxes={setCheckboxes}
              isEdit={true}
            />
          </View>
        </ProgressStep>

        {/* step3 for the Comments */}
        <ProgressStep
          label="Comments"
          onSubmit={handleSubmit}
          finishBtnText="Submit"
          nextBtnTextStyle={{ color: COLORS.primary }}
          previousBtnTextStyle={{ color: COLORS.primary }}
          nextBtnStyle={styles.buttonWidth}
          previousBtnStyle={styles.buttonWidth}
          buttonFillColor={COLORS.primary}
          buttonBorderColor={COLORS.primary}
          buttonPreviousTextColor={COLORS.primary}
        >
          <View style={{ marginTop: 20 }}>
            <Comments comment={comment} setComment={setComment} isEdit={true} />
          </View>
        </ProgressStep>
      </ProgressSteps>

      {/* displing the cancel button if the user wants to cancel the Audit Form */}
      <View style={{ marginTop: 20 }}>
        <Button title="Cancel" onPress={handleCancel} color={COLORS.primary} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    flexGrow: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 20,
  },
  buttonWidth: {
    width: '40%',
  },
});

export default AuditForm;
