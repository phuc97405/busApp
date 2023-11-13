import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import PickerBus from '~assets/components/pickerBus';
import icons from '~assets/icons';
import {PublicStackScreenProps} from '~navigation/types';

interface Option {
  title: string;
  type: React.JSX.Element;
  isEdit: boolean;
}
const windowWidth = Dimensions.get('window').width;

const HomeScreen = ({navigation}: PublicStackScreenProps<'home'>) => {
  const insets = useSafeAreaInsets();
  const [count, setCount] = useState<number>(1);
  const [busName, setBusName] = useState<string>('');
  const [stationName, setStationName] = useState<string>('');
  const [indexCheck, setIndexCheck] = useState<null | number>(null);
  const [poorTransportation, setPoorTransportation] = useState<boolean>(true);

  const peopleView = () => (
    <>
      <TouchableOpacity
        onPress={() => {
          setIndexCheck(0);
          count > 0 && setCount(count - 1);
        }}>
        <Image
          source={icons.ic_decre}
          resizeMode="contain"
          style={styles.ic_math}
        />
      </TouchableOpacity>
      <Text style={styles.labelValue}>{count}</Text>
      <TouchableOpacity
        onPress={() => {
          setIndexCheck(0);
          setCount(count + 1);
        }}>
        <Image
          source={icons.ic_incre}
          resizeMode="contain"
          style={styles.ic_math}
        />
      </TouchableOpacity>
    </>
  );

  const busView = () => (
    <>
      <Text
        style={[
          busName ? styles.labelValueBus : styles.labelPlaceBus,
          {width: windowWidth / 2},
        ]}
        numberOfLines={1}
        ellipsizeMode="tail">
        {`${busName ? busName : '버스 노선 번호를 선택해 주세요.'} `}
      </Text>
      <Image
        source={icons.ic_down}
        resizeMode="contain"
        style={indexCheck === 1 ? styles.ic_top : styles.ic_down}
      />
    </>
  );

  const onSubmitStation = (stationName: string) => {
    setStationName(stationName);
  };

  const stationView = () => (
    <>
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[stationName ? styles.labelValueBus : styles.labelPlaceBus]}>
        {stationName ? stationName : '선택'}
      </Text>
      <Image
        source={indexCheck === 2 ? icons.ic_detail_active : icons.ic_detail}
        resizeMode="contain"
        style={styles.detail}
      />
    </>
  );

  const poorView = () => (
    <>
      <Text style={styles.labelValue}>{`${
        poorTransportation ? '예' : '아니요'
      }`}</Text>
      <Image
        source={icons.ic_down}
        resizeMode="contain"
        style={styles.ic_down}
      />
    </>
  );

  const paymentView = () => (
    <>
      <Text style={styles.labelValue}>---</Text>
      <Image
        source={icons.ic_down}
        resizeMode="contain"
        style={styles.ic_down}
      />
    </>
  );

  const data: Option[] = [
    {title: '인원수', type: peopleView(), isEdit: false},
    {
      title: '버스',
      type: busView(),
      isEdit: false,
    },
    {
      title: '정류장',
      type: stationView(),
      isEdit: false,
    },
    {
      title: '교통 약자',
      type: poorView(),
      isEdit: false,
    },
    {
      title: '결제 선택',
      type: paymentView(),
      isEdit: false,
    },
  ];
  const changeNameBus = (name: string) => {
    setBusName(name);
    setStationName('');
  };

  return (
    <Pressable
      disabled={indexCheck !== 3}
      onPress={() => setIndexCheck(null)}
      style={[styles.container, {marginTop: insets.top || 0}]}>
      <View style={{flex: 1}}>
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
            <Text style={styles.labelTopTabInActive}>노선</Text>
          </View>
        </View>

        <View style={styles.listOptions}>
          {data.map((item: Option, index: number) => (
            <View key={index} style={styles.containerItem}>
              <Text style={styles.labelOptions}>{item.title}</Text>
              <Pressable
                disabled={index === 2 && !busName}
                onPress={() => {
                  setIndexCheck(index);
                  index === 2 &&
                    navigation.navigate('stationScreen', {
                      busInfo: busName,
                      stationName,
                      onSubmitStation: onSubmitStation,
                    });
                }}
                style={[
                  indexCheck === index
                    ? styles.containerFormEditAc
                    : styles.containerFormEdit,
                  {paddingHorizontal: index !== 0 ? 10 : 6},
                ]}>
                {item.type}
              </Pressable>
            </View>
          ))}
          {indexCheck === 3 && (
            <View style={styles.rootPosition}>
              <TouchableOpacity
                onPress={() => {
                  setPoorTransportation(true);
                  setIndexCheck(null);
                }}
                style={[
                  styles.containerPosition,
                  {
                    backgroundColor: poorTransportation ? '#F5F6F7' : '#fff',
                  },
                ]}>
                <Text style={styles.labelDropdown}>예</Text>
              </TouchableOpacity>
              <View style={styles.verticalLine} />
              <TouchableOpacity
                onPress={() => {
                  setPoorTransportation(false);
                  setIndexCheck(null);
                }}
                style={[
                  styles.containerPosition,
                  {
                    backgroundColor: !poorTransportation ? '#F5F6F7' : '#fff',
                  },
                ]}>
                <Text style={styles.labelDropdown}>아니요</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {indexCheck === 4 && (
          <View style={styles.container_img}>
            <Image
              source={icons.ic_nfid}
              resizeMode="contain"
              style={styles.ic_nfid}
            />
          </View>
        )}
      </View>
      {indexCheck === 1 && (
        <View style={styles.containerBus}>
          <Pressable
            onPress={() => {
              setIndexCheck(null);
            }}
            style={{flex: 1}}
          />
          <View style={styles.containerPopup}>
            <Text style={styles.labelPopup}>버스</Text>
            <View style={styles.verticalLine} />
            {PickerBus(changeNameBus)}
          </View>
        </View>
      )}
    </Pressable>
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
  containerTopTab: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  labelTopTab: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: '#628941',
  },
  labelTopTabInActive: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: '#676767',
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
    backgroundColor: '#f0f0f0',
  },
  listOptions: {padding: 24},
  containerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  labelOptions: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    flex: 1,
    color: '#0A0A0A',
  },
  labelPlaceholder: {
    // width: windowWidth / 2,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: '#A3A5AE',
  },
  labelValueBus: {
    // width: windowWidth / 2,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    color: '#090A0B',
  },
  labelPlaceBus: {
    // width: windowWidth / 2,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    color: '#A3A5AE',
  },
  labelValue: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: '#090A0B',
  },
  containerFormEdit: {
    height: 44,
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
    borderRadius: 6,
    borderColor: '#E1E2E5',
    borderWidth: 1,
  },
  containerFormEditAc: {
    height: 44,
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
    borderRadius: 6,
    borderColor: '#628941',
    borderWidth: 1,
  },
  ic_math: {
    width: 35,
    height: 35,
  },
  detail: {
    width: 22,
    height: 22,
  },
  ic_down: {width: 14, height: 14},
  ic_top: {width: 14, height: 14, transform: [{rotate: '180deg'}]},
  containerPopup: {
    width: windowWidth,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  labelPopup: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
    color: '#090A0B',
    fontWeight: '500',
    lineHeight: 24,
  },
  verticalLine: {
    height: 1,
    width: '100%',
    backgroundColor: '#E1E2E5',
  },
  ic_nfid: {width: 152, height: 154},
  container_img: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#F5F6F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -16,
  },
  containerBus: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 4,
  },
  containerPosition: {height: 44, justifyContent: 'center'},
  rootPosition: {
    position: 'absolute',
    backgroundColor: 'white',
    left: windowWidth / 3,
    top: 275,
    right: 24,
    borderRadius: 10,
    zIndex: 10,
    borderWidth: 0.5,
    borderColor: '#E1E2E5',
    overflow: 'hidden',

    shadowColor: '#A3A5AE',
    shadowRadius: 10,
    shadowOpacity: 0.6,
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  labelDropdown: {
    textAlign: 'center',
    color: 'black',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
});

export default HomeScreen;
