import { createContext, ReactElement, useState } from "react";

export const AuthContext = createContext<{
	token: string | undefined;
	login: (accessToken: string) => void;
	logout: () => void;
}>(null as any);

export const AuthProvider = ({ children }: { children: ReactElement }) => {
	const [token, setToken] = useState<string | undefined>(undefined);
	const login = (accessToken: string) => {
		setToken(accessToken);
	};
	const logout = () => {
		setToken(undefined);
	};
	return (
		<AuthContext.Provider
			value={{
				token,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

