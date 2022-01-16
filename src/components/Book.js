import React from "react";
import { connect } from "react-redux";
import { useParams, Navigate } from "react-router-dom";

const bookDetailsCard = {
  backgroundColor: "rgba(248, 248, 255, 0.8)",
  border: "none",
  borderRadius: "5px",
  boxShadow: "5px 5px 5px gray",
  margin: "20vh auto 0 auto",
  maxWidth: "700px",
  minHeight: "26vh",
  padding: "10px",
  width: "80vw",
};

const bookImage = {
  boxShadow: "5px 5px 5px gray",
  borderRadius: "5px",
  float: "left",
  height: "20vh",
  margin: "10px 25px 15px 10px",
};

const BookDescription = (props) => {
  let bookCard,
    books = [],
    bookData = {};
  //recieves book id from Books for details view
  const { id } = useParams();
  //combines all books data
  books = [...props.items, ...props.itemsExtended];
  //returns data for a single book selected by user
  bookData = books ? books.filter((item) => item.id === id)[0] : {};

  if (props.bookDetailsRequested) {
    bookCard = (
      <div style={bookDetailsCard}>
        <div style={{ height: "1vh" }}>
          <img
            style={bookImage}
            src={
              bookData.bookImgs
                ? bookData.bookImgs["thumbnail"]
                : "/no_cover.webp"
            }
            alt="cover is not available"
          />
        </div>
        <div>
          <h3>
            {bookData.bookTitle ? bookData.bookTitle : "no title"}
            <br /> -{" "}
            {!isNaN(new Date(bookData.dateIssued).getFullYear())
              ? new Date(bookData.dateIssued).getFullYear()
              : "no year"}{" "}
            -
          </h3>
          <p style={{ textAlign: "left" }}>
            {bookData.bookCats ? bookData.bookCats.join(", ") : "no category"}
          </p>
          <article>
            {bookData.bookDescription
              ? bookData.bookDescription
              : "no description available"}
          </article>
          <p style={{ textAlign: "right", paddingRight: "10vw" }}>
            <strong>
              {bookData.bookAuthors
                ? bookData.bookAuthors.join("/")
                : "no author name"}
            </strong>
          </p>
        </div>
      </div>
    );
  } else {
    return (bookCard = <Navigate to={"/"} />);
  }
  return bookCard;
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
    itemsExtended: state.itemsExtended,
    bookDetailsRequested: state.detailsRequested,
  };
};

export default connect(mapStateToProps, null)(BookDescription);
