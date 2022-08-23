import {
	faArrowDownShortWide,
	faArrowUpShortWide,
	faBackward,
	faBackwardFast,
	faForward,
	faForwardFast,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { LocalizationContext } from '../hook/Localization.context'
import { TableContext } from '../hook/Table.context'
import Button from './Button'
import TableStyle from './Table.styled'

export default function Table({
	entity = null,
	header = {},
	valueModifier = {},
	valueMapper = {},
	columnAction = {},
	editModifier = {},
	enableOrderBy = {},
}) {
	const table = useContext(TableContext)
	const { getText } = useContext(LocalizationContext)

	function orderBy(field) {
		if (enableOrderBy[field] === true || enableOrderBy[field] === undefined) {
			table.updateOrderBy({
				entity,
				field,
				direction: table.orderBy[entity].direction === 'ASC' ? 'DESC' : 'ASC',
			})
		}
	}

	function mouseEnterEvent(columnName, enter) {
		let values = document.getElementsByClassName('column_' + columnName)
		for (let x = 0; x < values.length; x++) {
			if (enter) {
				values.item(x).classList.add('hovered')
			} else {
				values.item(x).classList.remove('hovered')
			}
		}
	}

	function actionEditField(event, row, field) {
		if (event.code === 'Escape') {
			table.setEditEvent(null)
		} else if (event.code === 'Enter' && columnAction[field]) {
			try {
				columnAction[field]
					.then(() => {
						table.setEditEvent(null)
					})
					.catch(() => {})
			} catch {
				if (columnAction[field](row, event.target.value)) {
					table.setEditEvent(null)
				}
			}
		}
	}

	function enableEditEvent(row, field) {
		if (columnAction[field]) {
			table.setEditEvent({
				id: valueMapper.id ? valueMapper.id(row) : row.id,
				field: field,
			})
		}
	}

	function editField(row, field) {
		return editModifier[field] ? (
			editModifier[field](row, field, actionEditField)
		) : (
			<input
				type={'text'}
				id={'edit_field_' + field}
				defaultValue={valueMapper[field] ? valueMapper[field](row) : row[field]}
				onKeyDown={(event) => actionEditField(event, row, field)}
			/>
		)
	}

	return (
		<TableStyle empty={table.content[entity].length === 0}>
			<div className={'table'}>
				<div className={'header'}>
					{Object.keys(header).map((field) => {
						return (
							<div
								key={field}
								className={'column column_' + field}
								onClick={() => orderBy(field)}
								onMouseOver={() => mouseEnterEvent(field, true)}
								onMouseOut={() => mouseEnterEvent(field, false)}
							>
								{header[field]}
								{table.orderBy[entity].field === field &&
									(table.orderBy[entity].direction === 'DESC' ? (
										<FontAwesomeIcon icon={faArrowUpShortWide} />
									) : (
										<FontAwesomeIcon icon={faArrowDownShortWide} />
									))}
							</div>
						)
					})}
				</div>
				<div className={'body'}>
					{table.content[entity].map((row) => {
						return (
							<div key={JSON.stringify(row)} className={'line'}>
								{Object.keys(header).map((field) => {
									return (
										<div
											key={field}
											className={'column column_' + field}
											onDoubleClick={() => enableEditEvent(row, field)}
										>
											<>
												{table.editEvent &&
												table.editEvent.id === (valueMapper.id ? valueMapper.id(row) : row.id) &&
												table.editEvent.field === field ? (
													editField(row, field)
												) : (
													<div className={'columnContent'}>
														{valueModifier[field]
															? valueModifier[field](row[field], row)
															: row[field]}
													</div>
												)}
											</>
										</div>
									)
								})}
							</div>
						)
					})}
					{table.content[entity].length === 0 && (
						<div className={'line emptyTable'}>{getText('componnents.table.empty')}</div>
					)}
				</div>
				<div className={'page'}>
					<div className={'currentPageDisplay'}>
						{getText('componnents.table.row_counter')
							.replace('@#PAGE@#', `${table.pageController[entity].currentPageLength}`)
							.replace('@#TOTAL@#', `${table.pageController[entity].totalRows}`)}
					</div>
					<div className={'pageController'}>
						<Button
							disabled={table.pageController[entity].currentPage === 0}
							onClick={() => table.find({ entity: entity, page: 0 })}
						>
							<FontAwesomeIcon icon={faBackwardFast} />
						</Button>
						<Button
							disabled={table.pageController[entity].currentPage === 0}
							onClick={() =>
								table.find({ entity: entity, page: table.pageController[entity].currentPage - 1 })
							}
						>
							<FontAwesomeIcon icon={faBackward} />
						</Button>
						<div className={'currentPage'}>
							{getText('componnents.table.page_counter')
								.replace('@#CURRENT@#', `${table.pageController[entity].currentPage + 1}`)
								.replace(
									'@#TOTAL@#',
									`${
										table.pageController[entity].totalPages === 0
											? 1
											: table.pageController[entity].totalPages
									}`
								)}
						</div>
						<Button
							disabled={
								table.pageController[entity].currentPage ===
									table.pageController[entity].totalPages - 1 || table.content[entity].length === 0
							}
							onClick={() =>
								table.find({ entity: entity, page: table.pageController[entity].currentPage + 1 })
							}
						>
							<FontAwesomeIcon icon={faForward} />
						</Button>
						<Button
							disabled={
								table.pageController[entity].currentPage ===
									table.pageController[entity].totalPages - 1 || table.content[entity].length === 0
							}
							onClick={() =>
								table.find({ entity: entity, page: table.pageController[entity].totalPages - 1 })
							}
						>
							<FontAwesomeIcon icon={faForwardFast} />
						</Button>
					</div>
				</div>
			</div>
		</TableStyle>
	)
}
