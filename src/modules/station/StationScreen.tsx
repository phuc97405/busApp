import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {PublicStackScreenProps} from '../../navigation/types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import icons from '../../assets/icons';

const datas = Array.from({length: 20}, (_, i) => ({
  id: i.toString(),
  name: 'Bus station ' + i,
  number: Math.round(Math.random() * 1000000),
  time: '05:47-22:' + i,
}));

const ARROW_CIRCLE_WIDTH = 20;
const MARGIN_WIDTH = 4;
const BORDER_WIDTH = 1;
const LINE_WIDTH = 2;
const ITEM_HEIGHT = 40 + 12 + 12;

const StationScreen = ({
  navigation,
  route,
}: PublicStackScreenProps<'stationScreen'>) => {
  const {busInfo, onSubmitStation, stationName} = route?.params || {
    busInfo: '',
    onSubmitStation: () => {},
  };

  const [currentStation, setCurrentStation] = useState<number | undefined>(
    undefined,
  );

  useEffect(() => {
    const curIndex = datas.findIndex(data => data.name === stationName);
    console.log('==sfd==', curIndex, stationName);
    setCurrentStation(curIndex === -1 ? undefined : curIndex);
  }, [busInfo]);

  const ActiveCheckbox = useCallback(() => {
    return (
      <View
        style={{
          width: ARROW_CIRCLE_WIDTH,
          height: ARROW_CIRCLE_WIDTH,
          borderRadius: ARROW_CIRCLE_WIDTH / 2,
          borderWidth: BORDER_WIDTH,
          borderColor: '#3AD1DB',
          backgroundColor: 'white',
          padding: 2,
        }}>
        <View
          style={{
            backgroundColor: '#3AD1DB',
            flex: 1,
            borderRadius: ARROW_CIRCLE_WIDTH / 2,
          }}
        />
      </View>
    );
  }, []);
  const InactiveCheckbox = useCallback(() => {
    return (
      <View
        style={{
          width: ARROW_CIRCLE_WIDTH,
          height: ARROW_CIRCLE_WIDTH,
          borderRadius: ARROW_CIRCLE_WIDTH / 2,
          borderWidth: BORDER_WIDTH,
          borderColor: '#C4C6CD',
          backgroundColor: 'white',
          padding: 2,
        }}>
        <View
          style={{
            backgroundColor: 'transparent',
            flex: 1,
            borderRadius: ARROW_CIRCLE_WIDTH / 2,
          }}
        />
      </View>
    );
  }, []);
  const ActiveArrow = useCallback(() => {
    return (
      <View style={styles.active_view_arrow}>
        <Image source={icons.ic_expand} style={styles.active_arrow} />
      </View>
    );
  }, []);
  const InactiveArrow = useCallback(() => {
    return (
      <View style={styles.inactive_view_arrow}>
        <Image source={icons.ic_expand} style={styles.inactive_arrow} />
      </View>
    );
  }, []);

  const isDisableButton = currentStation !== undefined ? false : true;

  const onConfirmStation = () => {
    // send data to home screen
    if (currentStation !== undefined) {
      onSubmitStation?.(datas[currentStation].name);
    }

    // go back
    navigation.goBack();
  };
  const onPressBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {marginTop: insets.top || 6}]}>
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
      <View style={styles.body}>
        <View style={styles.view_bus_route}>
          <TouchableOpacity onPress={onPressBack}>
            <Image source={icons.ic_back} style={styles.icon} />
          </TouchableOpacity>

          <Text style={styles.text_bus_route}>
            {busInfo || '37 (내임선 - 황전면행정복지센터)'}
          </Text>
        </View>

        <ScrollView
          style={{paddingHorizontal: 24}}
          contentContainerStyle={{
            paddingTop: ITEM_HEIGHT / 2,
            paddingBottom: 24 + 40 + 16 + 16,
          }}
          bounces={false}>
          {datas.map((item, index) => (
            <TouchableOpacity
              activeOpacity={0.8}
              key={item.id}
              onPress={() => setCurrentStation(index)}>
              <View
                style={{
                  height: ITEM_HEIGHT,
                }}>
                {index === datas.length - 1 ? null : (
                  <View
                    style={{
                      backgroundColor:
                        currentStation === undefined || currentStation > index
                          ? '#E1E2E5'
                          : '#FFBB6C',
                      height: ITEM_HEIGHT,
                      width: LINE_WIDTH,
                      marginTop: ITEM_HEIGHT / 2,
                      marginHorizontal:
                        (ARROW_CIRCLE_WIDTH +
                          MARGIN_WIDTH * 2 +
                          BORDER_WIDTH * 2 -
                          LINE_WIDTH) /
                        2,
                    }}
                  />
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    ...StyleSheet.absoluteFillObject,
                  }}>
                  {currentStation === index ? (
                    <ActiveArrow />
                  ) : (
                    <InactiveArrow />
                  )}

                  <View style={{marginLeft: 20, flex: 1}}>
                    <Text style={styles.station_name}>{item.name}</Text>
                    <Text style={styles.station_time}>
                      {item.number} | {item.time}
                    </Text>
                  </View>

                  {currentStation === index ? (
                    <ActiveCheckbox />
                  ) : (
                    <InactiveCheckbox />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.view_bottom}>
          <TouchableOpacity
            onPress={onConfirmStation}
            style={[
              styles.touch_bottom,
              {
                backgroundColor: isDisableButton ? '#C4C6CD' : '#AFDF7B',
              },
            ]}
            disabled={isDisableButton}>
            <Text
              style={[
                styles.button_text,
                {
                  color: isDisableButton ? '#090A0B' : 'black',
                },
              ]}>
              완료
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  view_bus_route: {
    backgroundColor: '#DDECCB',
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  text_bus_route: {
    fontSize: 16,
    lineHeight: 24,
    color: 'black',
    marginLeft: 16,
  },

  body: {
    flex: 1,
    backgroundColor: 'white',
  },

  active_view_arrow: {
    backgroundColor: 'white',
    borderRadius:
      (ARROW_CIRCLE_WIDTH + MARGIN_WIDTH * 2 + BORDER_WIDTH * 2) / 2,
    borderWidth: BORDER_WIDTH,
    borderColor: '#FFBB6C',
  },
  active_arrow: {
    tintColor: 'black',
    width: ARROW_CIRCLE_WIDTH,
    height: ARROW_CIRCLE_WIDTH,
    backgroundColor: '#FFBB6C',
    borderRadius: ARROW_CIRCLE_WIDTH / 2,
    margin: MARGIN_WIDTH,
  },

  inactive_view_arrow: {
    backgroundColor: 'transparent',
    borderRadius:
      (ARROW_CIRCLE_WIDTH + MARGIN_WIDTH * 2 + BORDER_WIDTH * 2) / 2,
    borderWidth: BORDER_WIDTH,
    borderColor: 'transparent',
  },
  inactive_arrow: {
    tintColor: '#A3A5AE',
    width: ARROW_CIRCLE_WIDTH,
    height: ARROW_CIRCLE_WIDTH,
    backgroundColor: '#E1E2E5',
    borderRadius: ARROW_CIRCLE_WIDTH / 2,
    margin: MARGIN_WIDTH,
  },
  absolute_line_view: {
    ...StyleSheet.absoluteFillObject,
    marginLeft:
      (ARROW_CIRCLE_WIDTH + MARGIN_WIDTH * 2 + BORDER_WIDTH * 2 + LINE_WIDTH) /
      2,
    marginRight: ARROW_CIRCLE_WIDTH + MARGIN_WIDTH * 2 + BORDER_WIDTH * 2,
  },

  station_name: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#090A0B',
  },
  station_time: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    color: '#626576',
  },
  view_bottom: {
    ...StyleSheet.absoluteFillObject,
    top: undefined,
    backgroundColor: '#F5F6F7',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  touch_bottom: {
    flex: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  button_text: {
    color: 'black',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
});

export default StationScreen;
