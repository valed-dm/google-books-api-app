export function bookDetailsRequested(bool) {
  return {
    type: "BOOK_DETAILS",
    detailsRequested: bool,
  };
}
export function booksPagination(input) {
  return {
    type: "PAG",
    pagination: input,
  };
}
export function booksVault(items) {
  return {
    type: "BOOKS_DATA",
    itemsExtended: items,
  };
}
export function fetchData(url) {
  return (dispatch) => {
    dispatch(itemsIsLoading(true));
    dispatch(startNewSearch(false)); //stops google api request
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(itemsIsLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((items) => dispatch(fetchDataSuccess(items)))
      .catch(() => dispatch(itemsHasErrored(true)));
  };
}
export function fetchDataSuccess(items) {
  let booksArr = []; //api response processed data
  if (items.items.length > 0) { //condition to reset items to default
    items.items.forEach((item) => {
      let bookObj = {};
      bookObj.id = item.id;
      bookObj.bookImgs = item.volumeInfo.imageLinks;
      bookObj.bookCats = item.volumeInfo.categories;
      bookObj.bookTitle = item.volumeInfo.title;
      bookObj.bookAuthors = item.volumeInfo.authors;
      bookObj.bookDescription = item.volumeInfo.description;
      bookObj.dateIssued = item.volumeInfo.publishedDate;
      booksArr.push(bookObj);
      return booksArr;
    });
  }
  return {
    type: "ITEMS_LOADED",
    items: booksArr,
    itemsTotal: items.totalItems,
  };
}
export function itemsHasErrored(bool) {
  return {
    type: "ITEMS_HAS_ERRORED",
    hasErrored: bool,
  };
}
export function itemsIsLoading(bool) {
  return {
    type: "ITEMS_LOADING",
    isLoading: bool,
  };
}
export function startNewSearch(bool) {
  return {
    type: "NEW_SEARCH",
    newSearch: bool,
  };
}
export function userCategory(category) {
  return {
    type: "USER_CATEGORY",
    category: category,
  };
}
export function userInput(input) {
  return {
    type: "USER_INPUT",
    input: input,
  };
}
export function userSearchRequest(input, category, sort) {
  return {
    type: "USER_REQUEST",
    userSearchRequest: [input, category, sort],
  };
}
export function userSort(sort) {
  return {
    type: "USER_SORT",
    sort: sort,
  };
}

export function bookDetails(input) {
  return (dispatch) => {
    dispatch(bookDetailsRequested(input));
  };
}
export function booksExtraVault(items) {
  return (dispatch) => {
    dispatch(booksVault(items));
  };
}
export function booksOnPage(input) {
  return (dispatch) => {
    dispatch(booksPagination(input));
  };
}
export function clearItems(items) {
  return (dispatch) => {
    dispatch(fetchDataSuccess(items));
  };
}
export function handleChangeCategory(input) {
  return (dispatch) => {
    dispatch(userCategory(input));
  };
}
export function handleChangeSort(input) {
  return (dispatch) => {
    dispatch(userSort(input));
  };
}
export function handleChangeSubstring(input) {
  return (dispatch) => {
    dispatch(userInput(input));
  };
}
export function handleSubmit(event, input, category, sort) {
  event.preventDefault();
  return (dispatch) => {
    dispatch(userSearchRequest(input, category, sort));
  };
}
export function newSearch(bool) {
  return (dispatch) => {
    dispatch(startNewSearch(bool));
  };
}
