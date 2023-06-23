import Posts from '../../pages/Posts'
// import { setupStore } from '../../redux/store'
import { renderWithReduxProviders } from '../utils/test-utils-redux'
import { screen } from '@testing-library/react'

describe('Posts Page', () => {
	it('should show posts in the page', () => {
		// const store = setupStore()
		// store.dispatch()
		renderWithReduxProviders(<Posts />, {
			preloadedState: {
				posts: [{
					id: 422,
					title: 'Post under test',
					author: 'testingUser',
				}]
			}
		})

		const postTitle = screen.queryByText(/Post under test/)
		expect(postTitle).toBeInTheDocument()
	})
})