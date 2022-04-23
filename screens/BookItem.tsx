import React from 'react';
import {
  Dimensions,
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {Book} from '../types/Book';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProps} from '../types/RootStackParams';

const BookItem = ({item}: {item: Book}) => {
  const stackNavigation = useNavigation<StackNavigationProps>();

  return (
    <TouchableOpacity
      style={styles.touchableOpacityContainer}
      onPress={() => {
        stackNavigation.navigate('Detail', {isbn13: item.isbn13});
      }}>
      <Image
        source={{uri: item.image}}
        style={styles.bookImage}
        resizeMode="contain"
      />
      <View style={styles.bookInfoContainer}>
        <Text style={styles.title} numberOfLines={0} ellipsizeMode="tail">
          {item.title}
        </Text>
        <Text style={styles.bookInfo}>{item.isbn13}</Text>
        <Text style={styles.bookInfo}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableOpacityContainer: {
    flex: 1,
    height: 80,
    flexDirection: 'row',
    marginHorizontal: 15,
  },
  bookImage: {
    width: 80,
    height: 80,
  },
  bookInfoContainer: {
    flexDirection: 'column',
  },
  title: {
    width: Dimensions.get('window').width - 110,
    marginEnd: 0,
    fontSize: 12,
    fontStyle: 'italic',
  },
  bookInfo: {fontSize: 12, marginTop: 5},
});

export default BookItem;
