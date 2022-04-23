import React from 'react';
import {FlatList, SafeAreaView, ListRenderItem, StyleSheet} from 'react-native';
import {Book} from '../types/Book';
import {bookmarkSelector} from '../reducers/bookmark';
import BookItem from './BookItem';

const BookmarkScreen = () => {
  const books = bookmarkSelector(state => {
    return state.bookmarkReducer.books;
  });

  const renderBook: ListRenderItem<Book> = ({item}) => <BookItem item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.item}
        data={[...books.values()]}
        renderItem={renderBook}
        keyExtractor={(item: Book) => item.isbn13}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    marginTop: 10,
  },
});

export default BookmarkScreen;
