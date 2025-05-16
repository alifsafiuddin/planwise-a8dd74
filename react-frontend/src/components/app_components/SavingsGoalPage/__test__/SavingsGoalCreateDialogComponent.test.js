import React from "react";
import { render, screen } from "@testing-library/react";

import SavingsGoalCreateDialogComponent from "../SavingsGoalCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders savingsGoal create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SavingsGoalCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("savingsGoal-create-dialog-component")).toBeInTheDocument();
});
