import { createContext, useContext, useEffect, useState } from 'react'
import url from '../assets/url_settings.json'
import API from '../config/API'
import { ConfigContext } from './Config.context'
import { PageContext } from './Page.context'
import { UserContext } from './User.context'

export const TableContext = createContext({})
const PAGE_SIZE = 20

function TableProvider({ children }) {
	const { formatedDataBaseForURL, dataBase, setDataBase } = useContext(ConfigContext)
	const { user } = useContext(UserContext)
	const { currentPage } = useContext(PageContext)
	const [editEvent, setEditEvent] = useState(null)
	const initialOrderBy = {
		account: {
			field: 'name',
			direction: 'ASC',
		},
		movement: {
			field: 'dueDate',
			direction: 'DESC',
		},
		template: {
			field: 'dueDay',
			direction: 'ASC',
		},
		target: {
			field: 'description',
			direction: 'ASC',
		},
	}
	const initialContent = {
		account: [],
		movement: [],
		template: [],
		target: [],
	}
	const initialPageController = {
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
		target: {
			currentPage: 0,
			currentPageLength: 0,
			totalPages: 0,
			totalRows: 0,
		},
	}
	const initialAditionalInformation = {
		account: [],
		template: [],
		target: [],
		dashboard: {
			targets: [],
			pendentMovements: {
				content: [],
				totalElements: 0,
			},
		},
	}
	const initialAllExtraValues = {
		account: {},
		movement: {},
		template: {},
		target: {},
	}
	const [orderBy, setOrderBy] = useState({ ...initialOrderBy })
	const [content, setContent] = useState(initialContent)
	const [pageController, setPageController] = useState(initialPageController)
	const [aditionalInformation, setAditionalInformation] = useState(initialAditionalInformation)
	const [allExtraValues, setAllExtraValues] = useState(initialAllExtraValues)
	const [loadingMenuOptions, setLoadingMenuOptions] = useState({})

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
		update(entity, entityValue.id, entityCopy, () => {
			find({
				entity: entity,
				page: pageController[entity].currentPage,
				after: () => {
					setEditEvent(null)
				},
			})
		})
	}

	function create(entity, value, onSuccess = () => {}, onError = () => {}) {
		API.post(url[entity].create, value, {
			headers: {
				Authorization: localStorage.getItem('authHeader'),
			},
		})
			.then((response) => {
				onSuccess(response)
				find({ entity })
				setDataBase(new Date(dataBase))
			})
			.catch(onError)
	}

	function update(entity, id, value, after = () => {}, error) {
		value.id = id
		API.post(url[entity].update, value, {
			headers: {
				Authorization: localStorage.getItem('authHeader'),
			},
		})
			.then(() => {
				if (after) {
					after()
				} else {
					setDataBase(new Date(dataBase))
				}
			})
			.catch(error)
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

	function find({
		entity,
		page = 0,
		size = PAGE_SIZE,
		extraValues = allExtraValues[entity],
		after = () => null,
	}) {
		API.post(
			url[entity].find.replaceAll('@#DATA_BASE@#', formatedDataBaseForURL()),
			{
				...extraValues,
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
			setAllExtraValues((x) => {
				x[entity] = extraValues
				return x
			})
			after()
		})
	}

	function updateOrderBy({ entity, field, direction }) {
		API.post(
			url[entity].find.replaceAll('@#DATA_BASE@#', formatedDataBaseForURL()),
			{
				page: 0,
				size: PAGE_SIZE,
				sortField: field,
				sortDirection: direction,
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
			localStorage.setItem('orderBy', JSON.stringify(tempOrderBy))

			updateContent({
				entity: entity,
				newContent: response.data.content,
			})
		})
	}

	useEffect(() => {
		if (user && currentPage) {
			if (currentPage.path === '/') {
				setLoadingMenuOptions((l) => {
					return {
						...l,
						dashboard: true,
					}
				})
				API.get('/dashboard?dataBase=' + formatedDataBaseForURL(), {
					headers: {
						Authorization: localStorage.getItem('authHeader'),
					},
				}).then((targetResponse) => {
					setAditionalInformation((value) => {
						return {
							...value,
							dashboard: targetResponse.data,
						}
					})
					setLoadingMenuOptions((l) => {
						return {
							...l,
							dashboard: false,
						}
					})
				})
			}
			if (currentPage.path === '/account') {
				setLoadingMenuOptions((l) => {
					return {
						...l,
						account: true,
					}
				})
				find({
					entity: 'account',
					page: 0,
					after: () => {
						setLoadingMenuOptions((l) => {
							return {
								...l,
								account: false,
							}
						})
					},
				})
			}
			if (currentPage.path === '/movement') {
				setLoadingMenuOptions((l) => {
					return {
						...l,
						movement: true,
					}
				})
				find({
					entity: 'movement',
					page: 0,
					after: () => {
						setLoadingMenuOptions((l) => {
							return {
								...l,
								movement: false,
							}
						})
					},
				})
				API.get('/account/findAllSimple', {
					headers: {
						Authorization: localStorage.getItem('authHeader'),
					},
				}).then((accountResponse) => {
					setAditionalInformation((value) => {
						return { ...value, account: accountResponse.data }
					})
				})
				API.get('/template/findAllSimple?dataBase=' + formatedDataBaseForURL(), {
					headers: {
						Authorization: localStorage.getItem('authHeader'),
					},
				}).then((response) => {
					setAditionalInformation((value) => {
						return { ...value, template: response.data }
					})
				})
			}
			if (currentPage.path === '/template') {
				setLoadingMenuOptions((l) => {
					return {
						...l,
						template: true,
					}
				})
				find({
					entity: 'template',
					page: 0,
					after: () => {
						setLoadingMenuOptions((l) => {
							return {
								...l,
								template: false,
							}
						})
					},
				})
				API.get('/account/findAllSimple', {
					headers: {
						Authorization: localStorage.getItem('authHeader'),
					},
				}).then((response) => {
					setAditionalInformation((value) => {
						return {
							...value,
							account: response.data,
						}
					})
				})
			}
			if (currentPage.path === '/target') {
				setLoadingMenuOptions((l) => {
					return {
						...l,
						target: true,
					}
				})
				find({
					entity: 'target',
					page: 0,
					after: () => {
						setLoadingMenuOptions((l) => {
							return {
								...l,
								target: false,
							}
						})
					},
				})
				API.get('/account/findAllSimple', {
					headers: {
						Authorization: localStorage.getItem('authHeader'),
					},
				}).then((response) => {
					setAditionalInformation((value) => {
						return {
							...value,
							account: response.data,
						}
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
				update,
				remove,
				content,
				updateField,
				refresh,
				pageController,
				aditionalInformation,
				allExtraValues,
				loadingMenuOptions,
				setLoadingMenuOptions,
			}}
		>
			{children}
		</TableContext.Provider>
	)
}

export default TableProvider
