import { createContext, useEffect, useState } from 'react'

const UserContext = createContext({})

export default function UserProvider({ children }) {
	const [user, setUser] = useState(undefined)

	function defineCurrentUser({ currentUser, authHeader }) {
		setUser({ currentUser, authHeader })
		localStorage.setItem('currentUser', JSON.stringify(currentUser))
		localStorage.setItem('authHeader', authHeader)
	}

	function clearCurrentUser() {
		setUser(undefined)
		localStorage.clear()
	}

	useEffect(() => {
		if (localStorage.getItem('authHeader') && !user) {
			setUser({
				currentUser: JSON.parse(localStorage.getItem('currentUser')),
				authHeader: localStorage.getItem('authHeader'),
			})
		}
	}, [user])

	return (
		<UserContext.Provider
			value={{
				user,
				defineCurrentUser,
				clearCurrentUser,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export { UserContext }
