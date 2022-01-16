export function category(state = "all", action) {
  switch (action.type) {
    case "USER_CATEGORY":
      return action.category;

    default:
      return state;
  }
}
export function detailsRequested(state = false, action) {
  switch (action.type) {
    case "BOOK_DETAILS":
      return action.detailsRequested;

    default:
      return state;
  }
}
export function input(state = "", action) {
  switch (action.type) {
    case "USER_INPUT":
      return action.input;

    default:
      return state;
  }
}
export function items(state = [], action) {
  switch (action.type) {
    case "ITEMS_LOADED":
      return action.items;

    default:
      return state;
  }
}
export function itemsExtended(state = [], action) {
  switch (action.type) {
    case "BOOKS_DATA":
      return action.itemsExtended;

    default:
      return state;
  }
}
export function itemsHasErrored(state = false, action) {
  switch (action.type) {
    case "ITEMS_HAS_ERRORED":
      return action.hasErrored;

    default:
      return state;
  }
}
export function itemsIsLoading(state = false, action) {
  switch (action.type) {
    case "ITEMS_LOADING":
      return action.isLoading;

    default:
      return state;
  }
}
export function itemsTotal(state = 0, action) {
  switch (action.type) {
    case "ITEMS_LOADED":
      return action.itemsTotal;

    default:
      return state;
  }
}
export function newSearch(state = false, action) {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.newSearch;

    default:
      return state;
  }
}
export function pagination(state = 30, action) {
  switch (action.type) {
    case "PAG":
      return action.pagination;

    default:
      return state;
  }
}
export function sort(state = "relevance", action) {
  switch (action.type) {
    case "USER_SORT":
      return action.sort;

    default:
      return state;
  }
}
export function userSearchRequest(state = [], action) {
  switch (action.type) {
    case "USER_REQUEST":
      return action.userSearchRequest;

    default:
      return state;
  }
}
