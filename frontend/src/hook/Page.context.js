import { createContext, useContext, useEffect, useState } from 'react'
import PageSettings from '../assets/page.settings'
import { UserContext } from './User.context'

const PageContext = createContext({})

export default function PageProvider({ children }) {
	const [currentPage, setCurrentPage] = useState(undefined)
	const { user } = useContext(UserContext)

	function defineCurrentPage(current) {
		window.history.pushState('', '', current.path)
		setCurrentPage(current)
	}

	useEffect(() => {
		if (!localStorage.getItem('authHeader') && window.location.pathname !== '/') {
            window.history.pushState('', '', '/')
		}
	}, [user, window.location.pathname])

	useEffect(() => {
		if (!currentPage && user) {
			Object.keys(PageSettings).map((value) => {
				if (window.location.pathname === PageSettings[value].path) {
					setCurrentPage(PageSettings[value])
				}
				return value
			})
		}
	}, [currentPage, user])

	return (
		<PageContext.Provider
			value={{
				currentPage,
				defineCurrentPage,
			}}
		>
			{children}
		</PageContext.Provider>
	)
}

export { PageContext }
