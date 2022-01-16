import { combineReducers } from "redux";
import {
  category,
  detailsRequested,
  input,
  items,
  itemsExtended,
  itemsHasErrored,
  itemsIsLoading,
  itemsTotal,
  newSearch,
  pagination,
  sort,
  userSearchRequest,
} from "./items";

export default combineReducers({
  category,
  detailsRequested,
  input,
  items,
  itemsExtended,
  itemsHasErrored,
  itemsIsLoading,
  itemsTotal,
  newSearch,
  pagination,
  sort,
  userSearchRequest,
});//these keys names are equal to state keys names!
