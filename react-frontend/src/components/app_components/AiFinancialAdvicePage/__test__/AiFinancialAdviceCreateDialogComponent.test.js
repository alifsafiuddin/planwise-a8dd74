import React from "react";
import { render, screen } from "@testing-library/react";

import AiFinancialAdviceCreateDialogComponent from "../AiFinancialAdviceCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders aiFinancialAdvice create dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <AiFinancialAdviceCreateDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("aiFinancialAdvice-create-dialog-component"),
  ).toBeInTheDocument();
});
