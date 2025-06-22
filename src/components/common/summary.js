import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import RatingService from './rating';
import Comments from './comments';
import Options from './options';
import { COLORS } from '../../constants';

const { width } = Dimensions.get('window');

const Summary = ({ auditObject, onClose, showSuccessMsg }) => {
  // set initial state for modal visibility
  const [modalVisible, setModalVisible] = useState(true);

  // when the close button is pressed, hide modal
  const handleClose = () => {
    setModalVisible(false);
    onClose();
  };

  // render the modal content
  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.modalBackground}>
        {/* this is the actual modal box */}
        <View style={styles.modalContent}>
          {/* optional success message after submission */}
          {showSuccessMsg && (
            <Text style={styles.successMsg}>Form submitted successfully</Text>
          )}

          {/* heading */}
          <Text style={styles.title}>summary</Text>

          {/* display username */}
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Name:</Text>
            <Text style={styles.infoText}>{auditObject.username}</Text>
          </View>

          {/* display timestamp */}
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>submitted at:</Text>
            <Text style={styles.infoTextDate}>
              {new Date(auditObject.timestamp).toLocaleString()}
            </Text>
          </View>

          {/* show rating value */}
          <View style={styles.section}>
            <RatingService value={auditObject.rating} isEdit={false} />
          </View>

          {/* show selections */}
          <View style={styles.section}>
            <Options checkboxes={auditObject.selections} isEdit={false} />
          </View>

          {/* show comment text */}
          <View style={styles.section}>
            <Comments comment={auditObject.comment} isEdit={false} />
          </View>

          {/* button to close the modal */}
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: width * 0.85,
    backgroundColor: '#fff',
    padding: 28,
    borderRadius: 18,
    alignItems: 'stretch',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  successMsg: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 18,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 18,
    alignSelf: 'center',
  },
  infoBlock: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
    marginRight: 4,
  },
  infoText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primary,
    flexShrink: 1,
  },
  infoTextDate: {
    fontSize: 16,
    flexShrink: 1,
  },
  section: {
    marginTop: 14,
    marginBottom: 18,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    padding: 12,
  },
  closeButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  closeButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 1,
  },
});

export default Summary;
