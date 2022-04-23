import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {FlatList, SafeAreaView, ListRenderItem, StyleSheet} from 'react-native';
import {getNewBooks} from '../remoteRepository/BooksRepository';
import {Book} from '../types/Book';
import {ActionTypes} from '../actions';
import BookItem from './BookItem';

const NewBookScreen = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: ActionTypes.IS_LOADING, loading: true});
    getNewBooks()
      .then(response => {
        setBooks(response);
      })
      .finally(() => {
        dispatch({type: ActionTypes.IS_LOADING, loading: false});
      });
  }, [dispatch]);

  const renderBook: ListRenderItem<Book> = ({item}) => <BookItem item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.item}
        data={books}
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

export default NewBookScreen;
