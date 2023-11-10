import React, {memo, useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PublicStackScreenProps} from '../../navigation/types';
import icons from '../../assets/icons';

const SplashScreenNext = ({
  navigation,
}: PublicStackScreenProps<'splash_next'>) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.reset({index: 0, routes: [{name: 'home'}]});
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Image
          source={icons.ic_splash}
          resizeMode="contain"
          style={styles.icon}
        />
      </View>
    </View>
  );
};

export default SplashScreenNext;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  icon: {
    height: 588,
    width: 258,
  },
});
