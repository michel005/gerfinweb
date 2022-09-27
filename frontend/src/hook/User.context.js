import { createContext, useEffect, useState } from 'react'
import API from '../config/API'

const UserContext = createContext({})

export default function UserProvider({ children }) {
	const [user, setUser] = useState(undefined)
	const [loading, setLoading] = useState(false)

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
			setLoading(true)
			API.get('/user/me', {
				headers: {
					Authorization: localStorage.getItem('authHeader'),
				},
			})
				.then((response) => {
					defineCurrentUser({
						currentUser: response.data,
						authHeader: localStorage.getItem('authHeader'),
					})
					setLoading(false)
				})
				.catch(() => {
					clearCurrentUser()
					setLoading(false)
				})
		}
	}, [user])

	return (
		<UserContext.Provider
			value={{
				user,
				defineCurrentUser,
				clearCurrentUser,
				loading,
				setLoading,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export { UserContext }
