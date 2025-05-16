import React from "react";
import { render, screen } from "@testing-library/react";

import AlertsPage from "../AlertsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders alerts page", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <AlertsPage />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByRole("alerts-datatable")).toBeInTheDocument();
  expect(screen.getByRole("alerts-add-button")).toBeInTheDocument();
});
