// import API mocking utilities from Mock Service Worker
import { rest } from "msw";
import { setupServer } from "msw/node";

// declare which API requests to mock
export const server = setupServer(
	// capture "GET /greeting" requests
	rest.post("http://localhost:4000/register", (req, res, ctx) => {
		return res(
			ctx.json({
				accessToken: "xxx.xxx.xxx",
				user: {
					email: "test@email.com",
					password: "hashedPassword",
					id: 1,
				},
			}),
		);
	}),
	rest.post("http://localhost:4000/login", (req, res, ctx) => {
		return res(
			ctx.json({
				accessToken: "xxx.xxx.xxx",
				user: {
					email: "test@email.com",
					password: "hashedPassword",
					id: 1,
				},
			}),
		);
	}),
);
