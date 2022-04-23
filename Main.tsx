import React from 'react';
import {StyleSheet} from 'react-native';
import {ActivityIndicator, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NewBookScreen from './screens/NewBookScreen';
import DetailScreen from './screens/DetailBookScreen';
import BookmarkScreen from './screens/BookmarkScreen';
import SearchBookScreen from './screens/SearchBookScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootStackParamList} from './types/RootStackParams';
import {loadingSelector} from './reducers/loading';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarIcon: () => {
          return undefined;
        },
      }}>
      <Tab.Screen name="New" component={NewBookScreen} />
      <Tab.Screen name="Search" component={SearchBookScreen} />
      <Tab.Screen name="Bookmark" component={BookmarkScreen} />
    </Tab.Navigator>
  );
};

const Main = () => {
  const {loading} = loadingSelector(state => {
    return state.loadingReducer;
  });

  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="Tab">
            <Stack.Screen name="Tab" component={TabScreen} />
            <Stack.Screen
              name="Detail"
              component={DetailScreen}
              initialParams={{isbn13: ''}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
      {loading && (
        <View style={styles.loadingViewContainer}>
          <ActivityIndicator style={styles.activityIndicator} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loadingViewContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
  },
  activityIndicator: {
    alignSelf: 'center',
  },
});

export default Main;
