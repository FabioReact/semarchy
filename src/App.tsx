import {
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements
} from "react-router-dom";
import "./App.css";
import { Suspense } from 'react'
import { AppRoutes } from './routes'
import { AuthProvider } from './context/auth-context'
import { Provider } from 'react-redux'
import { setupStore } from './redux/store'

const router = createBrowserRouter(createRoutesFromElements(AppRoutes()));

function App() {
	return (
		<Provider store={setupStore()}>
			<AuthProvider>
				<Suspense fallback={<div>Loading...</div>}>
					<RouterProvider router={router} />
				</Suspense>
			</AuthProvider>
		</Provider>
	);
}

export default App;
