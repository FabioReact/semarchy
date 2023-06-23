import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from '../api/user'
import { useAuth } from '../hooks/useAuth'
import { RegisterFields } from '../utils/form-validation'

const Register = ({ validateForm }: { validateForm: (fiels: RegisterFields) => {
	success: boolean,
	error: string,
} }) => {
	const navigate = useNavigate();
	const [formError, setFormError] = useState<string|null>(null)
	const emailRef = useRef<HTMLInputElement>(null)
	const { login } = useAuth()
	const [password, setpassword] = useState("");
	const [passwordConfirmation, setpasswordConfirmation] = useState("");
	const onSubmitHandler = async (e: React.FormEvent) => {
		e.preventDefault();
		const { error, success } = validateForm({
			email: emailRef.current?.value || '',
			password,
			passwordConfirmation,
		})
		if (error) setFormError(error)
		if (success) {
			const tokenObject = await registerUser({
				email: emailRef.current?.value || '',
				password,
			})
			login(tokenObject.accessToken)
			navigate("/profile");
		}
	};
	return (
		<section>
			<h1>Register</h1>
			{/* {accTok.length && <p>Access Token: {accTok}</p> } */}
			<form aria-label="registerform" onSubmit={onSubmitHandler}>
				<label htmlFor="email">Email:</label>
				<input type="email" id="email" name="email" required ref={emailRef} />
				<label htmlFor="password">Password:</label>
				<input
					type="password"
					id="password"
					name="password"
					value={password}
					onChange={(e) => setpassword(e.target.value)}
					required
				/>
				<label htmlFor="passwordConfirmation">Confirm Password:</label>
				<input
					type="password"
					id="passwordConfirmation"
					name="passwordConfirmation"
					value={passwordConfirmation}
					onChange={(e) => setpasswordConfirmation(e.target.value)}
					required
				/>
				{formError && <p>error: {formError}</p>}
				<button type="submit">Register</button>
			</form>
		</section>
	);
};

export default Register;
