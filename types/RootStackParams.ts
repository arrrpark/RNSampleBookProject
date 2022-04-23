import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {Tab: undefined; Detail: {isbn13: string}};

export type StackProps = NativeStackScreenProps<RootStackParamList>;

export type StackNavigationProps = StackProps['navigation'];

export type DetailRouteProps = RouteProp<RootStackParamList, 'Detail'>;
