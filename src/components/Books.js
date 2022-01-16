import React from "react";
import { connect } from "react-redux";
import {
  bookDetails,
  booksExtraVault,
  booksOnPage,
  fetchData,
  newSearch,
} from "../actions/items";
import { Link } from "react-router-dom";
import "../App.css";
require("dotenv").config();

const smallText = {
  fontSize: "0.7em",
  fontStyle: "italic",
  marginBottom: "5px",
};

const roseText = {
  color: "DarkOrchid",
  fontStyle: "italic",
};

const searchInfo = {
  backgroundColor: "rgba(248, 248, 255, 0.8)",
  borderRadius: "5px",
  boxShadow: "5px 5px 5px gray",
  width: "300px",
  padding: "5px",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "40px",
};

const bookImage = {
  border: "none",
  borderRadius: "5px",
  boxShadow: "5px 5px 5px gray",
  height: "auto",
  maxWidth: "100%",
  marginTop: "10px",
};

class Books extends React.Component {
  componentDidUpdate() {
    const url = "https://www.googleapis.com/books/v1/volumes?q="
      .concat(this.props.userSearchRequest[0])
      .concat("&key=")
      .concat(process.env.REACT_APP_GOOGLE_API_KEY)
      .concat("&maxResults=30&startIndex=")
      .concat(this.props.pagination - 30); //user params prepared for API request
    if (this.props.newSearch) {
      return this.props.fetchData(url); //google API request fulfills
    }
  }

  render() {
    if (
      this.props.items.length === 0 &&
      !this.props.isLoading &&
      !this.props.hasErrored
    ) {
      return (
        <div className="container">
          <div style={searchInfo}>
            <p className="info">
              No search string entered.
              {/*error message when no search string entered*/}
              <br />
              Please enter a <span style={roseText}>search string</span>.
            </p>
          </div>
        </div>
      );
    }
    if (this.props.isLoading && !this.props.hasErrored) {
      return (
        <div className="container">
          <div style={searchInfo}>
            <p className="info">Loading...</p>
            {/*data loading message*/}
          </div>
        </div>
      );
    }
    if (this.props.isLoading && this.props.hasErrored) {
      return (
        <div className="container">
          <div style={searchInfo}>
            <p className="info">
              You've got an error while loading.{" "}
              {/*error message while data loading*/}
              <br />
              <span style={roseText}>Try a new search</span>, please
            </p>
          </div>
        </div>
      );
    }

    //combines saved and newly loaded data from new start index (this.props.pagination - 30)
    let booksCombined = [...this.props.itemsExtended, ...this.props.items];
    let booksByCategory = []; //for combined data filtered by category
    //checks if any search option choosen:
    const filterByCategory =
      this.props.userSearchRequest[1] !== "all" ? true : false; //filter by category yes/no
    const category = this.props.userSearchRequest[1];
    const sortByDate =
      this.props.userSearchRequest[2] !== "relevance" ? true : false; //sort by date yes/no
    //sorts by date:
    function sortingByDate(arr) {
      arr.sort(function (a, b) {
        let dateA = a.dateIssued
          ? new Date(a.dateIssued)
          : new Date("1900-01-01");
        let dateB = b.dateIssued
          ? new Date(b.dateIssued)
          : new Date("1900-01-01");
        return dateB - dateA;
      });
      return arr;
    }
    //booksCombined sorted by date
    if (sortByDate) {
      sortingByDate(booksCombined);
    }
    //filters by category after data has been sorted/unsorted by date
    let inputFiltered = booksCombined.filter(
      (item) => item.bookCats !== undefined
    );
    booksByCategory =
      filterByCategory && inputFiltered.length > 0
        ? inputFiltered.filter((item) => item.bookCats.indexOf(category) !== -1)
        : []; //booksCombined filtered by category

    //error "search result does not match any category"
    if (booksByCategory.length === 0 && filterByCategory) {
      return (
        <div className="container">
          <div style={searchInfo}>
            <p className="info">
              No matches with{" "}
              <span style={roseText}>"{this.props.userSearchRequest[0]}"</span>{" "}
              search when{" "}
              <span style={roseText}>"{this.props.userSearchRequest[1]}"</span>{" "}
              category is requested.
              <br />
              Please, search using another option.
            </p>
          </div>
        </div>
      );
    }

    //books cards are created here:
    const books = (filterByCategory ? booksByCategory : booksCombined).map(
      (item, index) => (
        <div className="column" key={index}>
          <Link to={`/book/${item.id}`}>
            <img
              className="imgClickable"
              style={bookImage}
              src={
                item.bookImgs
                  ? item.bookImgs["smallThumbnail"]
                  : "/no_cover.webp"
              }
              alt="cover is not available"
              onClick={() => {
                return this.props.bookDetails(true); //switches view to BookDescription ("/book/:id/")
              }}
            />
          </Link>
          <p style={smallText}>
            {item.bookCats ? item.bookCats[0] : "no category"}
          </p>
          <p>
            <strong>
              {item.bookTitle ? item.bookTitle : "no title"}
              <br />-{" "}
              {!isNaN(new Date(item.dateIssued).getFullYear())
                ? new Date(item.dateIssued).getFullYear()
                : "no year"}{" "}
              -
            </strong>
          </p>
          <p style={smallText}>
            {item.bookAuthors ? item.bookAuthors.join(", ") : "no author name"}
          </p>
        </div>
      )
    );
    return (
      <div className="container" style={{ borderRadius: "5px" }}>
        <div style={searchInfo}>
          <p className="info" style={{ textAlign: "center" }}>
            {filterByCategory ? booksByCategory.length : booksCombined.length}{" "}
            of <span style={roseText}>{this.props.pagination} top</span> results
            are on screen.
          </p>
          <div>
            <p className="info">
              search string:{" "}
              <span style={roseText}>{this.props.userSearchRequest[0]}</span>
              <br />
              category:{" "}
              <span style={roseText}>{this.props.userSearchRequest[1]}</span>
              <br />
              sorting by:{" "}
              <span style={roseText}>{this.props.userSearchRequest[2]}</span>
            </p>
          </div>
          <p className="info">
            all in all{" "}
            <span style={roseText}>{this.props.itemsTotal} books</span> found.
          </p>
        </div>

        {/*books cards are rendered here*/}
        <div className="row">{books}</div>
        {/*pagination button*/}
        <div className="row">
          <button
            style={{ border: "0.5px solid black" }}
            type="button"
            aria-label="Show More Books"
            onClick={(event) => {
              return (
                this.props.showMoreBooks(this.props.pagination + 30), //pagination step = 30
                this.props.booksExtraVault([
                  ...(filterByCategory ? booksByCategory : booksCombined),
                ]), //saves newly loaded and filtered data in itemsExtended
                this.props.startNewSearch(true)
              );
            }}
          >
            show more books ...
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    input: state.input,
    isLoading: state.itemsIsLoading,
    items: state.items,
    itemsTotal: state.itemsTotal,
    itemsExtended: state.itemsExtended,
    hasErrored: state.itemsHasErrored,
    newSearch: state.newSearch,
    pagination: state.pagination,
    userSearchRequest: state.userSearchRequest,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    bookDetails: (input) => dispatch(bookDetails(input)), //view switcher
    booksExtraVault: (items) => dispatch(booksExtraVault(items)),
    fetchData: (url) => dispatch(fetchData(url)),
    showMoreBooks: (input) => dispatch(booksOnPage(input)), //pagination switcher
    startNewSearch: (bool) => dispatch(newSearch(bool)), //search start switcher
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Books);
