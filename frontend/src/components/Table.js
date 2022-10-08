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
import { useMediaQuery } from 'react-responsive'

export default function Table({
	entity = null,
	header = {},
	valueModifier = {},
	enableOrderBy = {},
	responsiveLayout = () => <h3>Responsive Layout</h3>,
	responsiveAction = () => null,
}) {
	const table = useContext(TableContext)
	const { getText } = useContext(LocalizationContext)

	const isMobile = useMediaQuery({ query: '(max-width: 1000px)' })

	function orderBy(field) {
		if (enableOrderBy[field] === true || enableOrderBy[field] === undefined) {
			table.updateOrderBy({
				entity,
				field,
				direction:
					table.orderBy[entity].field !== field
						? 'ASC'
						: table.orderBy[entity].direction === 'ASC'
						? 'DESC'
						: 'ASC',
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

	return (
		<TableStyle empty={table.content[entity].length === 0}>
			<div className={'table'}>
				{!isMobile && (
					<div className={'header'}>
						{Object.keys(header).map((field) => {
							return (
								<div
									key={field}
									className={`column column_${field}`}
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
				)}
				<div className={'body'}>
					<div className={'rowsContainer'}>
						{table.content[entity].map((row, index) => {
							if (isMobile === true && responsiveLayout) {
								return (
									<div key={index} onDoubleClick={() => responsiveAction(row)}>
										{responsiveLayout(row)}
									</div>
								)
							} else {
								return (
									<div key={JSON.stringify(row)} className={'line'}>
										{Object.keys(header).map((field) => {
											return (
												<div
													key={field}
													className={`column column_${field} ${
														parseFloat(row[field]) < 0 ? 'negative' : ''
													}`}
													onDoubleClick={() => responsiveAction(row)}
												>
													<div className={'columnContent'}>
														{valueModifier[field]
															? valueModifier[field](row[field], row)
															: row[field]}
													</div>
												</div>
											)
										})}
									</div>
								)
							}
						})}
						{table.content[entity].length === 0 && (
							<div className={'line emptyTable'}>{getText('componnents.table.empty')}</div>
						)}
					</div>
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
							icon={<FontAwesomeIcon icon={faBackwardFast} />}
						/>
						<Button
							disabled={table.pageController[entity].currentPage === 0}
							onClick={() =>
								table.find({ entity: entity, page: table.pageController[entity].currentPage - 1 })
							}
							icon={<FontAwesomeIcon icon={faBackward} />}
						/>
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
							icon={<FontAwesomeIcon icon={faForward} />}
						/>
						<Button
							disabled={
								table.pageController[entity].currentPage ===
									table.pageController[entity].totalPages - 1 || table.content[entity].length === 0
							}
							onClick={() =>
								table.find({ entity: entity, page: table.pageController[entity].totalPages - 1 })
							}
							icon={<FontAwesomeIcon icon={faForwardFast} />}
						/>
					</div>
				</div>
			</div>
		</TableStyle>
	)
}
