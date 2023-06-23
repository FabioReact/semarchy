import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../hooks/useAuth'
import { loginUser } from '../api/user'

const Login = () => {
	const [email, setemail] = useState("");
	const [password, setpassword] = useState("");
	const navigate = useNavigate();
	const { login } = useAuth()
	const validation = () => email.length && password.length;
	const onSubmitHandler = async (event: React.FormEvent) => {
		event.preventDefault();
		// validation des champs
		// login - appel http
		const tokenObj = await loginUser({
			email,
			password,
		})
		login(tokenObj.accessToken)
		navigate("/profile");
	};
	return (
		<section>
			<h1>Login</h1>
			<form aria-label="loginform" onSubmit={onSubmitHandler}>
				<label htmlFor="email">Email:</label>
				<input
					type="email"
					id="email"
					name="email"
					required
					value={email}
					onChange={(e) => setemail(e.target.value)}
				/>
				<label htmlFor="password">Password:</label>
				<input
					type="password"
					id="password"
					name="password"
					value={password}
					onChange={(e) => setpassword(e.target.value)}
					required
				/>
				<button disabled={!validation()} type="submit">
					Submit
				</button>
			</form>
		</section>
	);
};

export default Login;
