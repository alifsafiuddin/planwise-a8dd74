import React from "react";
import { render, screen } from "@testing-library/react";

import AiFinancialAdviceEditDialogComponent from "../AiFinancialAdviceEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders aiFinancialAdvice edit dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <AiFinancialAdviceEditDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("aiFinancialAdvice-edit-dialog-component"),
  ).toBeInTheDocument();
});
