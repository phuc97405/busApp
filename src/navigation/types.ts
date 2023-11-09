import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

export const PublicStack = createNativeStackNavigator<PublicStackParamList>();

export type PublicStackParamList = {
  splash: undefined;
  splash_next: undefined;
  home: undefined;
};

export type PublicStackScreenProps<T extends keyof PublicStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<PublicStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type RootStackParamList = {
  public: NavigatorScreenParams<PublicStackParamList>;
};
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
