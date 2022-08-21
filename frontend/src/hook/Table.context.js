import { createContext, useContext, useEffect, useState } from 'react'
import url from '../assets/url.settions.json'
import API from '../config/API'
import { ConfigContext } from './Config.context'
import { LocalizationContext } from './Localization.context'
import { MessageContext } from './Message.context'
import { PageContext } from './Page.context'
import { UserContext } from './User.context'

export const TableContext = createContext({})

function TableProvider({ children }) {
	const { formatedDataBaseForURL, dataBase, setDataBase } = useContext(ConfigContext)
	const { simpleMessage } = useContext(MessageContext)
	const { getText } = useContext(LocalizationContext)
	const { user } = useContext(UserContext)
	const { currentPage } = useContext(PageContext)
	const [editEvent, setEditEvent] = useState(null)
	const [orderBy, setOrderBy] = useState({
		account: {
			field: 'name',
			direction: 'ASC',
		},
		movement: {
			field: 'dueDate',
			direction: 'ASC',
		},
        template: {
			field: 'dueDay',
			direction: 'ASC',
		},
	})
	const [content, setContent] = useState({
		account: [],
		movement: [],
		template: [],
	})
	const [pageController, setPageController] = useState({
		account: {
			currentPage: 0,
			currentPageLength: 0,
			totalPages: 0,
			totalRows: 0,
		},
		movement: {
			currentPage: 0,
			currentPageLength: 0,
			totalPages: 0,
			totalRows: 0,
		},
		template: {
			currentPage: 0,
			currentPageLength: 0,
			totalPages: 0,
			totalRows: 0,
		},
	})
	const [aditionalInformation, setAditionalInformation] = useState({
		account: [],
		template: [],
	})

	function updateContent({ entity, newContent }) {
		let tempResults = { ...content }
		tempResults[entity] = newContent
		setContent(tempResults)
	}

	function updatePageController({ entity, currentPage, currentPageLength, totalPages, totalRows }) {
		let tempPageInfo = { ...pageController }
		tempPageInfo[entity] = {
			currentPage,
			currentPageLength,
			totalPages,
			totalRows,
		}
		setPageController(tempPageInfo)
	}

	function updateField(entity, entityValue, field, value) {
		let entityCopy = { ...entityValue }
		entityCopy[field] = value
		update(entity, entityValue.id, entityCopy)
		setEditEvent(null)
	}

	function create(entity, value) {
		API.post(url[entity].create, value, {
			headers: {
				Authorization: localStorage.getItem('authHeader'),
			},
		}).then(() => {
			find({ entity })
			setDataBase(new Date(dataBase))
		})
	}

	function update(entity, id, value) {
		value.id = id
		API.post(url[entity].update, value, {
			headers: {
				Authorization: localStorage.getItem('authHeader'),
			},
		}).then(() => {
			refresh({ entity })
			setDataBase(new Date(dataBase))
		}).catch((error) => {
            simpleMessage({
                header: getText('componnents.table.update_field.header'),
                text: error.response.data[0] ? error.response.data[0] : JSON.stringify(error.response.data)
            })
        })
	}

	function remove(entity, id, after = () => {}) {
		API.post(
			url[entity].delete.replaceAll('@#ID@#', id),
			{},
			{
				headers: {
					Authorization: localStorage.getItem('authHeader'),
				},
			}
		).then(() => {
			after()
			refresh({ entity })
			setDataBase(new Date(dataBase))
		})
	}

	function refresh({ entity }) {
		API.post(
			url[entity].find.replaceAll('@#DATA_BASE@#', formatedDataBaseForURL()),
			{
				page: pageController[entity].currentPage,
				size: pageController[entity].currentPageLength,
				sortField: orderBy[entity].field,
				sortDirection: orderBy[entity].direction
			},
			{
				headers: {
					Authorization: localStorage.getItem('authHeader'),
				},
			}
		).then((response) => {
			updatePageController({
				entity,
				currentPage: response.data.pageable.pageNumber,
				currentPageLength: response.data.content.length,
				totalPages: response.data.totalPages,
				totalRows: response.data.totalElements,
			})

			updateContent({
				entity: entity,
				newContent: response.data.content,
			})
		})
	}

	function find({ entity, page = 0, size = 10 }) {
		API.post(
			url[entity].find.replaceAll('@#DATA_BASE@#', formatedDataBaseForURL()),
			{
				page: page,
				size: size,
				sortField: orderBy[entity].field,
				sortDirection: orderBy[entity].direction,
			},
			{
				headers: {
					Authorization: localStorage.getItem('authHeader'),
				},
			}
		).then((response) => {
			updatePageController({
				entity,
				currentPage: response.data.pageable.pageNumber,
				currentPageLength: response.data.content.length,
				totalPages: response.data.totalPages,
				totalRows: response.data.totalElements,
			})

			updateContent({
				entity: entity,
				newContent: response.data.content,
			})
		})
	}

	function updateOrderBy({ entity, field, direction }) {
		API.post(
			url[entity].find.replaceAll('@#DATA_BASE@#', formatedDataBaseForURL()),
			{
				page: 0,
				size: 10,
				sortField: field,
				sortDirection: direction
			},
			{
				headers: {
					Authorization: localStorage.getItem('authHeader'),
				},
			}
		).then((response) => {
			updatePageController({
				entity,
				currentPage: response.data.pageable.pageNumber,
				currentPageLength: response.data.content.length,
				totalPages: response.data.totalPages,
				totalRows: response.data.totalElements,
			})

			let tempOrderBy = { ...orderBy }
			tempOrderBy[entity] = {
				field: field,
				direction: direction,
			}
			setOrderBy(tempOrderBy)

			updateContent({
				entity: entity,
				newContent: response.data.content,
			})
		})
	}

	useEffect(() => {
		if (!user) {
            setOrderBy({
                account: {
                    field: 'name',
                    direction: 'ASC',
                },
                movement: {
                    field: 'dueDate',
                    direction: 'ASC',
                },
                template: {
                    field: 'dueDay',
                    direction: 'ASC',
                },
            })
            setContent({
                account: [],
                movement: [],
                template: [],
            })
            setPageController({
                account: {
                    currentPage: 0,
                    currentPageLength: 0,
                    totalPages: 0,
                    totalRows: 0,
                },
                movement: {
                    currentPage: 0,
                    currentPageLength: 0,
                    totalPages: 0,
                    totalRows: 0,
                },
                template: {
                    currentPage: 0,
                    currentPageLength: 0,
                    totalPages: 0,
                    totalRows: 0,
                },
            })
            setAditionalInformation({
                account: [],
                template: [],
            })
		}
	}, [user])

	useEffect(() => {
		if (user && currentPage) {
			if (currentPage.path === '/account') {
				find({ entity: 'account', page: 0 })
			}
			if (currentPage.path === '/movement') {
				find({ entity: 'movement', page: 0 })
				API.get('/account/findAllSimple', {
					headers: {
						Authorization: localStorage.getItem('authHeader'),
					},
				}).then((accountResponse) => {
                    API.get('/template/findAllSimple', {
                        headers: {
                            Authorization: localStorage.getItem('authHeader'),
                        },
                    }).then((templateResponse) => {
                        setAditionalInformation({
                            ...aditionalInformation,
                            template: templateResponse.data,
                            account: accountResponse.data,
                        })
                    })
				})
			}
			if (currentPage.path === '/template') {
				find({ entity: 'template', page: 0 })
				API.get('/account/findAllSimple', {
					headers: {
						Authorization: localStorage.getItem('authHeader'),
					},
				}).then((response) => {
					setAditionalInformation({
						...aditionalInformation,
						account: response.data,
					})
				})
			}
		}
	}, [dataBase, user, currentPage])

	return (
		<TableContext.Provider
			value={{
				editEvent,
				setEditEvent,
				orderBy,
				setOrderBy,
				updateOrderBy,
				find,
				create,
				remove,
				content,
				updateField,
				pageController,
				aditionalInformation,
			}}
		>
			{children}
		</TableContext.Provider>
	)
}

export default TableProvider
