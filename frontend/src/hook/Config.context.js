import { createContext, useEffect, useState } from 'react'
import API from '../config/API'

const ConfigContext = createContext({})

export default function ConfigProvider({ children }) {
	const [dataBase, setDataBase] = useState(new Date())
	const [balance, setBalance] = useState()

	function formatedDataBase() {
		return dataBase.toLocaleDateString('pt-BR')
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
		API.get('/movement/balance?dataBase=' + dataBase.toLocaleDateString('pt-BR').replaceAll('/', ''), {
			headers: {
				Authorization: localStorage.getItem('authHeader'),
			},
		}).then((response) => {
			setBalance(response.data)
		})
	}, [dataBase])

	return (
		<ConfigContext.Provider
			value={{ dataBase, setDataBase, formatedDataBase, balance, previewMonth, nextMonth }}
		>
			{children}
		</ConfigContext.Provider>
	)
}

export { ConfigContext }
