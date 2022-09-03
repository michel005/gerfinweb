import { createContext, useContext, useEffect, useState } from 'react'
import API from '../config/API'
import { UserContext } from './User.context'

const ConfigContext = createContext({})

const FORM = {
	ACCOUNT: 'account',
	MOVEMENT: 'movement',
	TEMPLATE: 'template',
	TARGET: 'target',
}

export default function ConfigProvider({ children }) {
	const [dataBase, setDataBase] = useState(new Date())
	const [ux, setUx] = useState({
		reduced: false,
	})
	const [balance, setBalance] = useState()
	const { user } = useContext(UserContext)

	function formatedDataBase() {
		return dataBase.toLocaleDateString('pt-BR')
	}

	function formatedForUX() {
		return dataBase.toLocaleDateString('pt-BR').substring(3)
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
                formatedForUX,
				formatedDataBaseForURL,
				balance,
				previewMonth,
				nextMonth,
				ux,
				setUx,
			}}
		>
			{children}
		</ConfigContext.Provider>
	)
}

export { ConfigContext, FORM }

