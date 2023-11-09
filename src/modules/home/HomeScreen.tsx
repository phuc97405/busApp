import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import icons from '../../assets/icons';
import {TextInput} from 'react-native-gesture-handler';
import PickerBus from '../../assets/components/pickerBus';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Option {
  title: string;
  type: React.JSX.Element;
  isEdit: boolean;
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const [count, setCount] = useState(0);
  const [busName, setBusName] = useState('');
  const [indexCheck, setIndexCheck] = useState<null | number>(null);
  const [poor, setPoor] = useState(0);
  const peopleView = () => (
    <Pressable
      style={
        indexCheck === 0 ? styles.containerFormEditAc : styles.containerFormEdit
      }>
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
    </Pressable>
  );

  const busView = () => (
    <Pressable
      onPress={() => {
        setIndexCheck(1);
      }}
      style={
        indexCheck === 1 ? styles.containerFormEditAc : styles.containerFormEdit
      }>
      <Text
        style={styles.labelPlaceholder}
        numberOfLines={1}
        ellipsizeMode="tail">
        {`${busName ? busName : '버스 노선 번호를 선택해 주세요.'} `}
      </Text>
      <Image
        source={icons.ic_down}
        resizeMode="contain"
        style={indexCheck === 1 ? styles.ic_top : styles.ic_down}
      />
    </Pressable>
  );

  const stationView = () => (
    <Pressable
      onPress={() => setIndexCheck(2)}
      style={
        indexCheck === 2 ? styles.containerFormEditAc : styles.containerFormEdit
      }>
      <Text style={styles.labelPlaceholder}>선택</Text>
      <Image
        source={indexCheck === 2 ? icons.ic_detail_active : icons.ic_detail}
        resizeMode="contain"
        style={styles.detail}
      />
    </Pressable>
  );

  const poorView = () => (
    <>
      <Pressable
        onPress={() => setIndexCheck(3)}
        style={
          indexCheck === 3
            ? styles.containerFormEditAc
            : styles.containerFormEdit
        }>
        <Text style={styles.labelValue}>{`${
          poor === 0 ? '예' : '아니요'
        }`}</Text>
        <Image
          source={icons.ic_down}
          resizeMode="contain"
          style={styles.ic_down}
        />
      </Pressable>
    </>
  );

  const paymentView = () => (
    <Pressable
      onPress={() => setIndexCheck(4)}
      style={
        indexCheck === 4 ? styles.containerFormEditAc : styles.containerFormEdit
      }>
      <Text style={styles.labelValue}>---</Text>
      <Image
        source={icons.ic_down}
        resizeMode="contain"
        style={styles.ic_down}
      />
    </Pressable>
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
  };

  return (
    <View style={[styles.container, {marginTop: insets.top || 0}]}>
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
            <Text style={styles.labelTopTabInActive}>설정</Text>
          </View>
        </View>

        <View style={styles.listOptions}>
          {data.map((item: Option, index: number) => (
            <TouchableOpacity key={index} style={styles.containerItem}>
              <Text style={styles.labelOptions}>{item.title}</Text>
              {item.type}
            </TouchableOpacity>
          ))}
          {indexCheck === 3 && (
            <View
              style={{
                position: 'absolute',
                backgroundColor: 'white',
                left: windowWidth / 3,
                top: 275,
                right: 24,
                borderRadius: 10,
                zIndex: 10,
                borderWidth: 1,
                overflow: 'hidden',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setPoor(0);
                  setIndexCheck(null);
                }}
                style={{
                  height: 44,
                  justifyContent: 'center',
                  backgroundColor: poor === 0 ? '#F5F6F7' : '#fff',
                }}>
                <Text style={{textAlign: 'center', color: 'black'}}>예</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPoor(1);
                  setIndexCheck(null);
                }}
                style={{
                  height: 44,
                  justifyContent: 'center',
                  backgroundColor: poor === 1 ? '#F5F6F7' : '#fff',
                }}>
                <Text style={{textAlign: 'center', color: 'black'}}>
                  아니요
                </Text>
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
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 4,
          }}>
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
    width: windowWidth / 2,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
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
  },
});

export default HomeScreen;
