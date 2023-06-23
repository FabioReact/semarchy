import { z } from "zod";

export type RegisterFields = {
	email: string
	password: string
	passwordConfirmation: string
}

export const registerValidation = (fields: RegisterFields) => {
	const schema = z.object({
		email: z.string().email({
			message: 'Email not valid'
		}),
		password: z.string().min(6).max(20),
		passwordConfirmation: z.string().min(6).max(20),
	}).refine(schema => schema.password === schema.passwordConfirmation)
	const result = schema.safeParse(fields)
	const error = result.success ? null : result.error[0]?.message
	return {
		success: result.success,
		error,
	}
}