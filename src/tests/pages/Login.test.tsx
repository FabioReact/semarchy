import { screen, within } from "@testing-library/react";
import Login from "../../pages/Login";
import { renderWithRouter } from "./utils-wrapper";
import { server } from '../utils/setup-server'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("Login Component", () => {
	it('should have form with password and email types', () => {
		renderWithRouter(<Login />, { route: '/login' });
		const form = screen.getByRole("form", {
			name: /loginform/i,
		});
		const emailInput: HTMLInputElement = within(form).getByLabelText(/email/i);
		const passwordInput: HTMLInputElement =
			within(form).getByLabelText(/password/i);

					// assert
		expect(emailInput.type).toBe("email");
		expect(passwordInput.type).toBe("password");
		expect(emailInput).toBeRequired();
		expect(passwordInput).toBeRequired();
	})

	it("should submit form and redirect to /profile", async () => {
		// arrange
		const { user } = renderWithRouter(<Login />, { route: "/login" });
		const form = screen.getByRole("form", {
			name: /loginform/i,
		});
		const emailInput: HTMLInputElement = within(form).getByLabelText(/email/i);
		const passwordInput: HTMLInputElement =
			within(form).getByLabelText(/password/i);
		const button: HTMLButtonElement = within(form).getByRole("button");

		// act
		await user.type(emailInput, "test@email.com");
		await user.type(passwordInput, "secret_password");

		// assert
		expect(button).toBeEnabled();

		// act
		await user.click(button);

		// assert
		screen.getByRole('heading', { name: /profile/i })

		// tester le comportement lors du clique
		// screen.logTestingPlaygroundURL()
	});
});
