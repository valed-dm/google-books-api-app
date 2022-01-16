import React, { /*Suspense*/ } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Books from "../src/components/Books";
import BookDescription from "../src/components/Book";
import SearchForBooks from "../src/components/SearchForBooks";
//const Books = React.lazy(() => import("../src/components/Books"));
//const BookDescription = React.lazy(() => import("../src/components/Book"));

function App(props) {
  return (
    <div>
      {/*<Suspense fallback={<div>Loading ...</div>}>*/}
        <SearchForBooks key={1} />
        <Router>
          <Routes>
            <Route path="/book/:id/" element={[<BookDescription key={3} />]} />
            <Route path="/" element={[<Books key={2} />]} />
          </Routes>
        </Router>
      {/*</Suspense>*/}
    </div>
  );
}

export default App;
