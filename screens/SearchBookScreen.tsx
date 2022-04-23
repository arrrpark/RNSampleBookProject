import React, {useState, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ListRenderItem,
  FlatList,
  StyleSheet,
  Keyboard,
} from 'react-native';
import {searchBook, searchMoreBook} from '../remoteRepository/BooksRepository';
import {Book} from '../types/Book';
import {ActionTypes} from '../actions';
import BookItem from './BookItem';

const SearchBookScreen = () => {
  const [word, setWord] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const dispatch = useDispatch();

  const searchedWord = useRef('');
  const pageIndex = useRef(0);
  const noMoreResult = useRef(false);
  const isFetching = useRef(false);

  const search = (searchWord: string) => {
    setBooks([]);
    if (!isFetching.current) {
      Keyboard.dismiss();
      isFetching.current = true;
      dispatch({type: ActionTypes.IS_LOADING, loading: true});
      searchBook(searchWord)
        .then(response => {
          setBooks(response);
          searchedWord.current = searchWord;
          pageIndex.current = 1;
          noMoreResult.current = false;
        })
        .finally(() => {
          dispatch({type: ActionTypes.IS_LOADING, loading: false});
          isFetching.current = false;
        });
    }
  };

  const searchMore = () => {
    if (!isFetching.current && !noMoreResult.current) {
      isFetching.current = true;
      dispatch({type: ActionTypes.IS_LOADING, loading: true});
      searchMoreBook(searchedWord.current, pageIndex.current + 1)
        .then(response => {
          if (response.length < 10) {
            noMoreResult.current = true;
          }
          setBooks(prev => [...prev, ...response]);
        })
        .finally(() => {
          dispatch({type: ActionTypes.IS_LOADING, loading: false});
          pageIndex.current += 1;
          isFetching.current = false;
        });
    }
  };

  const onSearchWordChange = (searchWord: string) => {
    setWord(searchWord);
  };

  const renderBook: ListRenderItem<Book> = ({item}) => <BookItem item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.inputContainer}
          onChangeText={onSearchWordChange}
          value={word}
        />
        <TouchableOpacity
          style={styles.seachTouchable}
          onPress={() => search(word)}>
          <Text style={styles.searchText}>Search</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.bookList}
        data={books}
        renderItem={renderBook}
        keyExtractor={(item: Book) => item.isbn13}
        onEndReached={() => {
          searchMore();
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  seachTouchable: {
    width: 60,
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  inputContainer: {
    width: Dimensions.get('window').width - 120,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 20,
  },
  searchText: {
    textAlign: 'center',
  },
  bookList: {
    marginTop: 10,
  },
});

export default SearchBookScreen;
