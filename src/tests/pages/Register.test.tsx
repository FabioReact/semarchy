import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "../../pages/Register";
import { renderWithRouter } from "./utils-wrapper";
import { server } from "../utils/setup-server";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../context/auth-context";

// establish API mocking before all tests
beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());

describe("Register Page", () => {
	it("should have an email input", () => {
		const validateForm = vi.fn();
		renderWithRouter(<Register validateForm={validateForm} />, {
			route: "/register",
		});

		const form = screen.getByRole("form", {
			name: "registerform",
		});

		const emailInput: HTMLInputElement = within(form).getByLabelText(/email/i);
		expect(emailInput.type).toBe("email");
		expect(emailInput).toBeRequired();
	});

	it("should have two password inputs", () => {
		const validateForm = vi.fn();
		renderWithRouter(<Register validateForm={validateForm} />, {
			route: "/register",
		});

		const form = screen.getByRole("form", {
			name: "registerform",
		});

		// screen.logTestingPlaygroundURL()
		const passwordInputs: HTMLInputElement[] =
			within(form).getAllByLabelText(/password/i);
		expect(passwordInputs.length).toBe(2);
		expect(passwordInputs[0].type).toBe("password");
		expect(passwordInputs[1].type).toBe("password");
		expect(passwordInputs[0]).toBeRequired();
		expect(passwordInputs[1]).toBeRequired();
	});

	it("should display error message if password do not match", async () => {
		const validateForm = vi.fn().mockReturnValueOnce({
			success: false,
			error: "Custom error Message",
		});
		render(
			<AuthProvider>
				<BrowserRouter>
					<Register validateForm={validateForm} />
				</BrowserRouter>
			</AuthProvider>,
		);
		const user = userEvent.setup();

		// arrange
		const form = screen.getByRole("form", {
			name: "registerform",
		});
		const button = screen.getByRole("button", { name: /register/i });
		const passwordInputs: HTMLInputElement[] =
			within(form).getAllByLabelText(/password/i);
		const emailInput: HTMLInputElement = within(form).getByRole("textbox", {
			name: /email:/i,
		});

		await user.type(emailInput, "test@email.com");
		await user.type(passwordInputs[0], "secret");
		await user.type(passwordInputs[1], "not_matching");
		await user.click(button);
		expect(button).toBeEnabled();
		expect(emailInput.value).toBe("test@email.com");
		const errorMessage = screen.getByText(/error: /i);
	});

	it("should not display error message if password match", async () => {
		const validateForm = vi.fn();
		renderWithRouter(<Register validateForm={validateForm} />, {
			route: "/register",
		});
		const user = userEvent.setup();

		const form = screen.getByRole("form", {
			name: "registerform",
		});

		// screen.logTestingPlaygroundURL()
		const passwordInputs: HTMLInputElement[] =
			within(form).getAllByLabelText(/password/i);

		await user.type(passwordInputs[0], "secret");
		await user.type(passwordInputs[1], "secret");

		const errorMessage = screen.queryByText(/error:/i);
		expect(errorMessage).toBeNull();
	});

	it("should redirect if there is no errors", async () => {
		const validateForm = vi.fn();
		renderWithRouter(<Register validateForm={validateForm} />, {
			route: "/register",
		});
		const user = userEvent.setup();

		// arrange
		const form = screen.getByRole("form", {
			name: "registerform",
		});
		const passwordInputs: HTMLInputElement[] =
			within(form).getAllByLabelText(/password/i);
		const emailInput: HTMLInputElement = within(form).getByLabelText(/email/i);

		await user.type(emailInput, "test2@email.com");
		await user.type(passwordInputs[0], "secret");
		await user.type(passwordInputs[1], "secret");

		const errorMessage = screen.queryByText(/error:/i);
		expect(errorMessage).toBeNull();

		const button: HTMLButtonElement = within(form).getByRole("button");

		// act
		await user.click(button);

		// assert
		screen.getByRole("heading", { name: /profile/i });
	});
});
