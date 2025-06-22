import React from 'react';
import { ActivityIndicator } from 'react-native';
import WebView from 'react-native-webview';
import { COLORS } from '../../constants';

const PrivacyPolicy = () => {
  const url = 'https://www.delightree.com/privacy-policy';
  return (
    <WebView
      source={{ uri: url }}
      style={{  marginTop: -100 }}
      startInLoadingState={true}
      renderLoading={() => (
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          style={{ flex: 1, justifyContent: 'top', alignItems: 'center', backgroundColor: '#fff' }}
        />
      )}
    />
  );
};

export default PrivacyPolicy;
