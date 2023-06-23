import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { server } from "../utils/setup-server";
import { AuthContext } from "../../context/auth-context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../../pages/Login";
import PrivateRoute from "../../hoc/PrivateRoute";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderWithRouter = (
	ui: React.ReactElement,
	{
		route = "/",
		token = undefined,
	}: { token?: string | undefined; route?: string } = {} as any,
) => {
	window.history.pushState({}, "Test page", route);

	const Wrapper = () => (
		<AuthContext.Provider
			value={{
				token,
				login: () => null,
				logout: () => null,
			}}
		>
			<BrowserRouter>
				<Routes>
					<Route path="/">
						<Route path="/login" element={<Login />} />
						<Route
							path="/protected"
							element={
								<PrivateRoute>
									<p>Protected</p>
								</PrivateRoute>
							}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthContext.Provider>
	);

	return {
		user: userEvent.setup(),
		...render(ui, { wrapper: Wrapper }),
	};
};

describe("PrivateRoute Component - Display or redirection", () => {
	it("should redirect if user is not logged in / no accessToken", () => {
		renderWithRouter(<></>, { route: "/protected" });

		const result = screen.queryByText(/Protected/i);
		expect(result).not.toBeInTheDocument();
	});

	it("should show protected page if user is logged in / has a token", () => {
		renderWithRouter(<></>, { route: "/protected", token: "xxx.xxx.xxx" });

		const result = screen.queryByText(/Protected/i);
		expect(result).toBeInTheDocument();
	});
});
