import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, Routes } from "react-router-dom";
import { AppRoutes } from '../../routes'
import { AuthProvider } from '../../context/auth-context'

export const renderWithRouter = (
	ui: React.ReactElement,
	{ route = "/" } = {},
) => {
	window.history.pushState({}, "Test page", route);

	const Wrapper = () => (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					{AppRoutes()}
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	)

	return {
		user: userEvent.setup(),
		...render(ui, { wrapper: Wrapper }),
	};
};
