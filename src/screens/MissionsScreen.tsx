import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const MissionsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Missions Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
  },
});
