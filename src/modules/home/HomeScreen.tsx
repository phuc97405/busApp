import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import icons from '../../assets/icons';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={icons.ic_bus}
          resizeMode="contain"
          style={styles.ic_bus}
        />
        <Image
          source={icons.ic_menu}
          resizeMode="contain"
          style={styles.ic_menu}
        />
      </View>
      <View style={styles.containerTopTab}>
        <View style={styles.selectStation}>
          <Text style={styles.labelTopTab}>설정</Text>
        </View>
        <View style={styles.tab2}>
          <Text style={styles.labelTopTab}>설정</Text>
        </View>
      </View>

      <View style={styles.listOptions}>
        <View style={styles.containerItem}>
          <Text style={styles.labelOptions}>인원수</Text>
          <View style={styles.containerFormEdit}>
            <Image
              source={icons.ic_decre}
              resizeMode="contain"
              style={styles.ic_math}
            />
            <Text style={styles.label_math}>1</Text>
            <Image
              source={icons.ic_incre}
              resizeMode="contain"
              style={styles.ic_math}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ic_bus: {
    width: 30,
    height: 40,
  },
  ic_menu: {width: 24, height: 24},
  containerTopTab: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  labelTopTab: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  selectStation: {
    flex: 1,
    backgroundColor: '#CADEAF',
    paddingVertical: 8,
    borderBottomColor: '#628941',
    borderBottomWidth: 2,
  },
  tab2: {
    flex: 1,
    paddingVertical: 8,
    backgroundColor: 'gray',
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
  },
  listOptions: {flex: 1, padding: 24},
  containerItem: {flexDirection: 'row', alignItems: 'center'},
  labelOptions: {fontSize: 16, fontWeight: '600', lineHeight: 20, flex: 1},
  containerFormEdit: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5.5,
    paddingHorizontal: 6,
    borderRadius: 6,
    borderColor: '#E1E2E5',
    borderWidth: 1,
  },
  ic_math: {
    width: 24,
    height: 24,
  },
  label_math: {fontSize: 14, fontWeight: '400', lineHeight: 20},
});

export default HomeScreen;
