import { createContext, useContext, useEffect, useState } from 'react'
import API from '../config/API'
import { UserContext } from './User.context'
import { useMediaQuery } from 'react-responsive'

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
	const [loadingDataBase, setLoadingDataBase] = useState(false)
	const [showForm, setShowForm] = useState(initialShowForm)
	const isMobile = useMediaQuery({ query: '(max-width: 1000px)' })
	const [ux, setUx] = useState({
		reduced: isMobile ? true : false,
	})
	const [balance, setBalance] = useState()
	const [adjustAccountBalance, setAdjustAccountBalance] = useState(null)
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
			setLoadingDataBase(true)
			setBalance({
				current: null,
				future: null,
			})
			API.get(
				'/movement/balance?dataBase=' + dataBase.toLocaleDateString('pt-BR').replaceAll('/', ''),
				{
					headers: {
						Authorization: localStorage.getItem('authHeader'),
					},
				}
			).then((response) => {
				setBalance(response.data)
				setLoadingDataBase(false)
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
				adjustAccountBalance,
				setAdjustAccountBalance,
				loadingDataBase,
			}}
		>
			{children}
		</ConfigContext.Provider>
	)
}

export { ConfigContext, initialShowForm }
