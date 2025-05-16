import React from "react";
import { render, screen } from "@testing-library/react";

import SavingsGoalPage from "../SavingsGoalPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders savingsGoal page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SavingsGoalPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("savingsGoal-datatable")).toBeInTheDocument();
    expect(screen.getByRole("savingsGoal-add-button")).toBeInTheDocument();
});
