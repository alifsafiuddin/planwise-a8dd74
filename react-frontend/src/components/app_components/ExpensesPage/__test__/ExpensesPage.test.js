import React from "react";
import { render, screen } from "@testing-library/react";

import ExpensesPage from "../ExpensesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders expenses page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ExpensesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("expenses-datatable")).toBeInTheDocument();
    expect(screen.getByRole("expenses-add-button")).toBeInTheDocument();
});
