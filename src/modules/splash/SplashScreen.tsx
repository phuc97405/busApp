import React, {memo, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PublicStackScreenProps} from '../../navigation/types';

const SplashScreen = ({navigation}: PublicStackScreenProps<'splash'>) => {
  const inset = useSafeAreaInsets();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('splash_next');
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.labelTitle}>{`또바기버스 어플\n구상도`}</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#85C055',
  },
  labelTitle: {
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#F5F6F7',
  },

  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
