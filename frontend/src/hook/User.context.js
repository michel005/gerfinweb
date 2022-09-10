import { createContext, useEffect, useState } from 'react'
import API from '../config/API'

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
			API.get('/user/me', {
				headers: {
					Authorization: localStorage.getItem('authHeader'),
				},
			})
				.then((response) => {
					setUser({
						currentUser: response.data,
						authHeader: localStorage.getItem('authHeader'),
					})
				})
				.catch(() => {
					setUser(undefined)
					localStorage.clear()
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
