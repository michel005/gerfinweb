import { createContext, useContext, useEffect, useState } from 'react'
import API from '../config/API'
import { UserContext } from './User.context'

const ConfigContext = createContext({})

export default function ConfigProvider({ children }) {
	const [dataBase, setDataBase] = useState(new Date())
	const [balance, setBalance] = useState()
	const { user } = useContext(UserContext)

	function formatedDataBase() {
		return dataBase.toLocaleDateString('pt-BR')
	}

	function formatedDataBaseForURL() {
		return dataBase.toLocaleDateString('pt-BR').replaceAll('/', '')
	}

	function previewMonth() {
		var dt = new Date(dataBase)
		dt.setMonth(dt.getMonth() - 1)
		setDataBase(dt)
	}

	function nextMonth() {
		var dt = new Date(dataBase)
		dt.setMonth(dt.getMonth() + 1)
		setDataBase(dt)
	}

	useEffect(() => {
		if (user) {
			API.get(
				'/movement/balance?dataBase=' + dataBase.toLocaleDateString('pt-BR').replaceAll('/', ''),
				{
					headers: {
						Authorization: localStorage.getItem('authHeader'),
					},
				}
			).then((response) => {
				setBalance(response.data)
			})
		}
	}, [dataBase, user])

	return (
		<ConfigContext.Provider
			value={{
				dataBase,
				setDataBase,
				formatedDataBase,
				formatedDataBaseForURL,
				balance,
				previewMonth,
				nextMonth,
			}}
		>
			{children}
		</ConfigContext.Provider>
	)
}

export { ConfigContext }

