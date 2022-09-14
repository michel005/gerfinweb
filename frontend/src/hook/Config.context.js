import { createContext, useContext, useEffect, useState } from 'react'
import API from '../config/API'
import { UserContext } from './User.context'
import DateUtils from '../utils/DateUtils'

const ConfigContext = createContext({})

const initialShowForm = {
	account: false,
	movement: false,
	transfer: false,
	template: false,
	target: false,
}

export default function ConfigProvider({ children }) {
	const [dataBase, setDataBase] = useState(new Date())
	const [showForm, setShowForm] = useState(initialShowForm)
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
		setDataBase((d) => {
			let dt = new Date(d)
			dt.setMonth(dt.getMonth() - 1)
			return dt
		})
	}

	function nextMonth() {
		setDataBase((d) => {
			let dt = new Date(d)
			dt.setMonth(dt.getMonth() + 1)
			return dt
		})
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
				showForm,
				setShowForm,
			}}
		>
			{children}
		</ConfigContext.Provider>
	)
}

export { ConfigContext, initialShowForm }
