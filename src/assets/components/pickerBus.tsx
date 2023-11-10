import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker} from 'react-native-wheel-pick';

const PickerBus = (callback: (value: string) => void) => {
  const data = [
    '36 (황전면행정복지센터- 내임선)',
    '36 (내임선 - 황전면행정복지센터)',
    '37 (내임선 - 황전면행정복지센터)',
    '37 (황전면행정복지센터 - 내임선)',
    '38 (내임선 - 황전면행정복지센터)',
    '38 (황전면행정복지센터- 내임선)',
    '40 (내임선 - 황전면행정복지센터)',
    '41 (내임선 - 황전면행정복지센터)',
    '42 (황전면행정복지센터 - 내임선)',
    '43 (내임선 - 황전면행정복지센터)',
  ];
  return (
    <View style={styles.container}>
      <Picker
        textSize={20}
        selectTextColor="#090A0B"
        style={styles.pickerTime}
        selectedValue={data[5]}
        selectBackgroundColor="rgba(241,242,243,0.2)"
        itemStyle={styles.itemStyle}
        selectLineColor={'#CACACA'}
        selectLineSize={2}
        pickerData={data}
        onValueChange={callback}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#626576',
    shadowOffset: {width: 1, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: 'white',
  },

  pickerTime: {
    width: '100%',
    height: 200,
    backgroundColor: 'white',
  },
  itemStyle: {
    overflow: 'hidden',
    fontSize: 20,
    fontWeight: '400',
    color: '#F1F2F3',
    lineHeight: 28,
  },
});

export default PickerBus;
