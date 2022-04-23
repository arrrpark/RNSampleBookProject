import axios from 'axios';
import {Book} from '../types/Book';
import {BookDetail} from '../types/BookDetail';

const baseURL = 'https://api.itbook.store';

export const getNewBooks = (): Promise<Book[]> => {
  return new Promise<Book[]>((resolve, reject) => {
    axios
      .get(`${baseURL}/1.0/new`)
      .then(res => {
        resolve(res.data.books);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getBookDetail = (isbn13: string): Promise<BookDetail> => {
  return new Promise<BookDetail>((resolve, reject) => {
    axios
      .get(`${baseURL}/1.0/books/${isbn13}`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const searchBook = (word: string): Promise<Book[]> => {
  return new Promise<Book[]>((resolve, reject) => {
    axios
      .get(`${baseURL}/1.0/search/${word}`)
      .then(res => {
        resolve(res.data.books);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const searchMoreBook = (word: string, page: number): Promise<Book[]> => {
  return new Promise<Book[]>((resolve, reject) => {
    axios
      .get(`${baseURL}/1.0/search/${word}/${page}`)
      .then(res => {
        resolve(res.data.books);
      })
      .catch(err => {
        reject(err);
      });
  });
};
