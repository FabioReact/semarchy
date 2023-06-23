import axios from "axios";

export type User = {
	email: string;
	password: string;
};

const fetcher = {
	post<T>(url: string, data: unknown) {
		return axios.post<T>(url, data);
	},
	get() {
		return null;
	},
};

export const registerUser = async (
	user: User,
): Promise<{
	accessToken: string;
	user: User;
}> => {
	const response = await fetch("http://localhost:4000/register", {
		method: "POST",
		body: JSON.stringify(user),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await response.json();
	return data;
};

export const loginUser = async (
	user: User,
): Promise<{
	accessToken: string;
	user: User;
}> => {
	const response = await fetch("http://localhost:4000/login", {
		method: "POST",
		body: JSON.stringify(user),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await response.json();
	return data;
};
