import { registerValidation } from '../../utils/form-validation'

describe('form-validation', () => {
	describe('registerValidation', () => {
		it('should return false if fields are empty', () => {
			const params = {
				email: '',
				password: '',
				passwordConfirmation: '',
			}
			const result = registerValidation(params)
			expect(result.success).toBe(false)
		})
	
		it('should return false if password do not match', () => {
			const params = {
				email: 'test@email.com',
				password: 'secret',
				passwordConfirmation: 'not-match',
			}
			const result = registerValidation(params)
			expect(result.success).toBe(false)
		})
	
		it('should return false if email is not correct', () => {
			const params = {
				email: 'test@email',
				password: 'secret',
				passwordConfirmation: 'not-match',
			}
			expect(registerValidation(params).success).toBe(false)
			params.email = 'test'
			expect(registerValidation(params).success).toBe(false)
			params.email = 'test.com'
			expect(registerValidation(params).success).toBe(false)
		})
	
		it('should return success true if fields are correct', () => {
			const params = {
				email: 'test@email.com',
				password: 'secret',
				passwordConfirmation: 'secret',
			}
			const result = registerValidation(params)
			expect(result.success).toBe(true)
		})
	})
})