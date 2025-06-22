import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../../useContext/UserContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Summary from '../common/summary';
import { COLORS } from '../../constants';
import { Alert } from 'react-native';

const AuditHistory = () => {
  // fetching the user from userContext
  const { user } = useUser();

  // intilizing the states
  const [audits, setAudits] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // fetching existing audits and setting it to audits state variable
  useEffect(() => {
    const fetchAudits = async () => {
      try {
        // fetching and setting audits data from the AsyncStorage to audits.
        const data = await AsyncStorage.getItem('audits');
        if (data) {
          setAudits(JSON.parse(data));
        }
      } catch (e) {
        console.error('Failed to load audits', e);
      }
    };
    fetchAudits();
  }, []);

  // To delete the specific audit
  const handleDelete = index => {
    // getting confirmation from the user before deleting the Audit.
    Alert.alert(
      'Delete Audit',
      'Are you sure you want to delete this audit?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: async () => {
            try {
              // since we dont have any id, so deleting the object based on the index, and updating the AsyncStorage and audits state.
              const updatedAudits = audits.filter((_, i) => i !== index);
              await AsyncStorage.setItem(
                'audits',
                JSON.stringify(updatedAudits),
              );
              setAudits(updatedAudits);
            } catch (e) {
              console.error('Failed to delete audit', e);
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  // setting the selectedItem, based on that we can show the audit data in summary popup
  const handleSelectedItem = item => () => {
    setSelectedItem(item);
  };

  // displaying the each item in a card with a simple UI, so user can see the
  const renderItem = ({ item, index }) => (
    //   onclick on the card, setting the item so it will be displayed inthe summary popup.
    <TouchableOpacity style={styles.card} onPress={handleSelectedItem(item)}>
      <View style={styles.cardHeader}>
        <Text style={styles.username}>{item.username}</Text>
        {/* onclick on the eye icon, setting the item so it will be displayed inthe summary popup  */}
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <TouchableOpacity onPress={handleSelectedItem(item)}>
            <Icon name="remove-red-eye" size={22} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.cardBox}>
          <Text style={styles.boxLabel}>Rating</Text>
          <Text style={styles.boxValue}>{item.rating} / 5</Text>
        </View>
        <View style={styles.cardBox}>
          <Text style={styles.boxLabel}>Quality of Compliance</Text>
          <Text style={styles.boxValue}>
            {Object.entries(item.selections)
              .filter(([_, v]) => v)
              .map(([k]) => k)
              .join(', ') || 'None'}
          </Text>
        </View>
      </View>

      {/* displying No comments provided text when the comment is empty */}
      <View style={styles.commentContainer}>
        <Text style={styles.label}>Comments</Text>
        <Text style={styles.comment}>
          {item.comment || '***No comments provided***'}
        </Text>
      </View>

      <View style={styles.cardHeader}>
        <Text style={styles.dateText}>
          <Text style={styles.boxValue}> Submitted at:</Text>{' '}
          {new Date(item.timestamp).toLocaleString()}
        </Text>
        {/* allowing the Admin to delete the Audit */}
        {user === 'Admin' && (
          <TouchableOpacity
            onPress={() => handleDelete(index)}
            style={{ marginTop: 10 }}
          >
            <Icon name="delete" size={22} color={COLORS.black} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );


  // rendering the entire list using audits 
  return (
    <View>
      <FlatList
        data={audits}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No audit history found.</Text>
        }
      />
      {/*  displying the selected item in the Summary Popup */}
      {selectedItem && (
        <Summary
          auditObject={selectedItem}
          onClose={() => setSelectedItem(null)}
          showSuccessMsg={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  username: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  cardBox: {
    flex: 1,
    backgroundColor: '#f0f4ff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  boxLabel: {
    fontSize: 15,
    color: '#6c757d',
    marginBottom: 4,
  },
  boxValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  commentContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    padding: 10,
    marginTop: 6,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
  },
  comment: {
    fontSize: 15,
  },
  dateText: {
    fontSize: 14,
    color: COLORS.black,
    marginTop: 12,
    textAlign: 'right',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: COLORS.black,
  },
});

export default AuditHistory;
