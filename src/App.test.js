import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import configureStore from "../src/store/configureStore";
import { render, screen } from "@testing-library/react";
import App from "./App";

const store = configureStore();

test("renders app title element", () => {
  render(
      <Provider store={store}>
        <App />
      </Provider>
  );
  const titleElement = screen.getByText(/Google Books API App/i);
  expect(titleElement).toBeInTheDocument();
});
reportWebVitals();
