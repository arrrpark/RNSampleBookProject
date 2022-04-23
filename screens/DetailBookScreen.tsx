import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {getBookDetail} from '../remoteRepository/BooksRepository';
import {BookDetail} from '../types/BookDetail';
import {Images} from '../images';
import {useDispatch} from 'react-redux';
import {ActionTypes} from '../actions';
import {bookmarkSelector} from '../reducers/bookmark';
import {loadingSelector} from '../reducers/loading';
import {DetailRouteProps} from '../types/RootStackParams';
import {useNavigation, useRoute} from '@react-navigation/native';

const DetailScreen = () => {
  const stackNavigation = useNavigation();
  const detailRoute = useRoute<DetailRouteProps>();

  const [bookDetail, setBookDetail] = useState<BookDetail>();
  const {books} = bookmarkSelector(state => {
    return state.bookmarkReducer;
  });
  const {loading} = loadingSelector(state => {
    return state.loadingReducer;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: ActionTypes.IS_LOADING, loading: true});
    getBookDetail(detailRoute.params.isbn13)
      .then(response => {
        setBookDetail(response);
      })
      .finally(() => {
        dispatch({type: ActionTypes.IS_LOADING, loading: false});
      });
  }, [dispatch, detailRoute.params.isbn13]);

  const book = {
    title: bookDetail?.title,
    subTitle: bookDetail?.subTitle,
    isbn13: bookDetail?.isbn13,
    price: bookDetail?.price,
    image: bookDetail?.image,
    url: bookDetail?.url,
  };

  const addBookmark = () => {
    dispatch({type: ActionTypes.ADD_BOOKMARK, book});
  };

  const cancelBookmark = () => {
    dispatch({type: ActionTypes.CANCEL_BOOKMARK, book});
  };

  const isBookmarked = books.get(bookDetail?.isbn13 ?? '') !== undefined;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.marginView}>
        <TouchableOpacity
          style={styles.optionBar}
          onPress={() => {
            console.log('here');
            stackNavigation.goBack();
          }}>
          <Image
            style={styles.backArrow}
            resizeMode="contain"
            source={Images.back}
          />
        </TouchableOpacity>
        <Image
          style={styles.bookImage}
          source={{uri: bookDetail?.image}}
          resizeMode="contain"
        />
        <Text style={styles.bookInfo}>{bookDetail?.title}</Text>
        {bookDetail?.subTitle && (
          <Text style={styles.bookInfo}>{bookDetail?.subTitle}</Text>
        )}
        {bookDetail?.authors && (
          <Text style={styles.bookInfo}>{bookDetail?.authors}</Text>
        )}
        {bookDetail?.publisher && (
          <Text style={styles.bookInfo}>{bookDetail?.publisher}</Text>
        )}
        {bookDetail?.language && (
          <Text style={styles.bookInfo}>{bookDetail?.language}</Text>
        )}
        {bookDetail?.isbn10 && (
          <Text style={styles.bookInfo}>{bookDetail?.isbn10}</Text>
        )}
        {bookDetail?.isbn13 && (
          <Text style={styles.bookInfo}>{bookDetail?.isbn13}</Text>
        )}
        {bookDetail?.pages && (
          <Text style={styles.bookInfo}>{bookDetail?.pages}</Text>
        )}
        {bookDetail?.year && (
          <Text style={styles.bookInfo}>{bookDetail?.year}</Text>
        )}
        {bookDetail?.desc && (
          <Text style={styles.bookInfo}>{bookDetail?.desc}</Text>
        )}
        {bookDetail?.price && (
          <Text style={styles.bookInfo}>{bookDetail?.price}</Text>
        )}
        {bookDetail?.subTitle && (
          <Text style={styles.bookInfo}>{bookDetail?.subTitle}</Text>
        )}
        {!loading && (
          <Button
            title={isBookmarked ? 'Calcel Bookmark' : 'Bookmark'}
            onPress={isBookmarked ? cancelBookmark : addBookmark}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  marginView: {
    flex: 1,
    marginHorizontal: 20,
  },
  optionBar: {
    marginTop: 10,
    justifyContent: 'center',
  },
  backArrow: {
    width: 30,
    height: 30,
  },
  bookImage: {
    width: 200,
    height: 200,
  },
  bookInfo: {
    fontSize: 12,
    marginTop: 5,
  },
});

export default DetailScreen;
