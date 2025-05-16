import React from "react";
import { render, screen } from "@testing-library/react";

import IncomesPage from "../IncomesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders incomes page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IncomesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("incomes-datatable")).toBeInTheDocument();
    expect(screen.getByRole("incomes-add-button")).toBeInTheDocument();
});
