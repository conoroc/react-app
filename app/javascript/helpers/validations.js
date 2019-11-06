export const isEmptyObject = obj => Object.keys(obj).length === 0;
import { error } from './notifications';
export const validateBook = book => {
  const errors = {};

  if (book.title === "") {
    errors.title = "You must enter a title";
  }
  if (book.description === "") {
    errors.title = "You must enter a description";
  }

  console.log(book);
  return errors;
};

export const handleAjaxError = (err) => {
  error('Something went wrong');
  console.warn(err);
};