import React from "react";
import { render, screen } from "@testing-library/react";

import DebtsPage from "../DebtsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders debts page", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <DebtsPage />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByRole("debts-datatable")).toBeInTheDocument();
  expect(screen.getByRole("debts-add-button")).toBeInTheDocument();
});
