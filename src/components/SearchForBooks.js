import React from "react";
import { connect } from "react-redux";
import {
  bookDetails,
  booksExtraVault,
  booksOnPage,
  clearItems,
  handleChangeSort,
  handleChangeCategory,
  handleChangeSubstring,
  handleSubmit,
  newSearch,
} from "../actions/items";

const header = {
  textAlign: "center",
  position: "fixed",
  width: "100%",
  top: "0px",
  left: "0px",
};
const leftSide = {
  borderTopLeftRadius: "0px",
  borderBottomLeftRadius: "0px",
};
const rightSide = {
  borderTopRightRadius: "0px",
  borderBottomRightRadius: "0px",
};
const search = {
  backgroundColor: "rgba(128, 128, 128, 0.8)",
  backgroundImage: "url(/header_back.webp)",
  backgroundPosition: "center",
  backgroundSize: "cover",
  fontSize: "1em",
  paddingBottom: "25px",
};

function SearchForBooks(props) {
  return (
    <div style={header}>
      <div className="header">
        <h1>Google Books API App</h1>
      </div>
      <div className="header" style={search}>
        <h2>search for books</h2>
        <form
          id="searchForm"
          onSubmit={(event) => {
            if (props.input !== "") {
              return (
                props.userSubmit(
                  event,
                  props.input,
                  props.category,
                  props.sort
                ), //saves search options choosen in userSearchRequest
                props.pagination !== 30 ? props.showMoreBooks(30) : null, //sets pagination to default
                props.itemsExtended.length !== 0 ? props.booksExtraStorage([]) : null, //sets itemsExtended to default
                props.userInput(""), //sets input to default
                props.category !== "all" ? props.userCategory("all") : null, //sets category to default
                props.sort !== "relevance" ? props.userSort("relevance") : null, //sets sort to default
                props.startNewSearch(true) //starts google api request
              );
            }
          }}
        >
          <div className="row">
            <input
              style={rightSide}
              type="search"
              value={props.input}
              placeholder={"enter book title"}
              onChange={(event) => {
                if (!props.bookDetailsRequested) {
                  return (props.userInput(event.target.value));
                }
                return (
                  props.userInput(event.target.value),
                  props.bookDetails(false),//switches view to Books ("/")
                  props.clearItems({
                    items: [],
                    totalItems: 0
                  })//sets items to default
                );
              }}
            />
            <button
              style={leftSide}
              type="submit"
              form="searchForm"
              className="fas fa-search"
              aria-label="New Search"
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ marginRight: "20px" }}>
              <div>
                <h2>categories</h2>
              </div>
              <div>
                <select
                  name="category"
                  value={props.category}
                  onChange={(event) => props.userCategory(event.target.value)}
                >
                  <option defaultValue="all" label="all" />
                  <option value="Art" label="art" />
                  <option value="Biography" label="biography" />
                  <option value="Computers" label="computers" />
                  <option value="Cooking" label="cooking" />
                  <option value="Education" label="education" />
                  <option value="Fiction" label="fiction" />
                  <option value="Foreign Language Study" label="foreign language study" />
                  <option value="Juvenile Nonfiction" label="juvenile nonfiction" />
                  <option value="History" label="history" />
                  <option value="Medical" label="medical" />
                  <option value="Performing Arts" label="performing arts" />
                  <option value="Poetry" label="poetry" />
                  <option value="Science" label="science" />
                </select>
              </div>
            </div>
            <div>
              <div>
                <h2>ranged by</h2>
              </div>
              <div>
                <select
                  name="sort"
                  value={props.sort}
                  onChange={(event) => props.userSort(event.target.value)}
                >
                  <option defaultValue="relevance" label="relevance" />
                  <option value="newest" label="newest" />
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    bookDetailsRequested: state.detailsRequested,
    category: state.category,
    input: state.input,
    items: state.items,
    itemsExtended: state.itemsExtended,
    pagination: state.pagination,
    sort: state.sort,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    bookDetails: (input) => dispatch(bookDetails(input)), //view switcher
    booksExtraStorage: (items) => dispatch(booksExtraVault(items)),
    clearItems: (items) => dispatch(clearItems(items)),
    showMoreBooks: (input) => dispatch(booksOnPage(input)), //pagination switcher
    startNewSearch: (bool) => dispatch(newSearch(bool)), //search start switcher
    userInput: (input) => dispatch(handleChangeSubstring(input)),
    userCategory: (input) => dispatch(handleChangeCategory(input)),
    userSort: (input) => dispatch(handleChangeSort(input)),
    userSubmit: (event, input, category, sort) =>
      dispatch(handleSubmit(event, input, category, sort)), //user search request data
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForBooks);
