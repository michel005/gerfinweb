import { createContext, useEffect, useState } from 'react'
import PageSettings from '../assets/page.settings'

const PageContext = createContext({})

export default function PageProvider({ children }) {
	const [currentPage, setCurrentPage] = useState(undefined)

	function defineCurrentPage(current) {
		window.history.pushState('', '', current.path)
        setCurrentPage(current)
	}

	useEffect(() => {
		if (!currentPage) {
            Object.keys(PageSettings).map((value) => {
                if (window.location.pathname === PageSettings[value].path) {
                    setCurrentPage(PageSettings[value])
                }
                return value
            })
		}
	}, [currentPage])

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
