import {
	faCalendar,
	faCalendarAlt,
	faChevronLeft,
	faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState } from 'react'
import { ConfigContext } from '../hook/Config.context'
import DataBasePickerStyle from './DataBasePicker.style'
import Button from './Button'
import DateUtils from '../utils/DateUtils'
import Field from './Field'
import styled from 'styled-components'
import CommandBar from './CommandBar'

const DropDownMonthYearPanel = styled.div`
	border-radius: 7px;
	display: flex;
	flex-direction: column;
	transition: all 0.25s;

	.monthOptions {
		border-radius: 7px;
		display: flex;
		flex-direction: column;
		margin-bottom: 7px;
		flex-grow: 1;
		overflow: hidden;

		::-webkit-scrollbar {
			width: 10px;
		}

		::-webkit-scrollbar-track {
			border-top-right-radius: 5px;
			border-bottom-right-radius: 5px;
			background: #3333;
		}

		::-webkit-scrollbar-thumb {
			border-radius: 5px;
			background: #888;

			&:hover {
				background: #fff3;
			}
		}

		.button {
			border-radius: 0;
			text-transform: capitalize;
			width: 100%;
		}
	}

	.dataBaseYear {
		width: 100%;

		input {
			width: 100%;
		}
	}

	.defineButton {
		margin-top: 7px;
		margin-bottom: 7px;
		height: auto;
		flex-grow: 1;
		width: 100%;
	}
`

export default function DataBasePicker({ style, align = 'flex-end' }) {
	const { setDetail, formatedForUX, nextMonth, previewMonth, reduced, setDataBase, dataBase } =
		useContext(ConfigContext)

	function MonthYearPanel() {
		const months = DateUtils.allMonthValues()
		setDetail({
			header: 'Data Base',
			content: (
				<DropDownMonthYearPanel>
					<div className={'monthOptions'}>
						{Object.keys(months).map((value, index) => {
							return (
								<Button
									className={
										parseInt(dataBase?.getMonth()) + 1 === parseInt(value) ? 'primary' : 'secondary'
									}
									onClick={() => {
										setDetail(undefined)
										setDataBase(new Date(dataBase?.getFullYear(), parseInt(value) - 1, 1))
									}}
									key={index}
								>
									{months[value]}
								</Button>
							)
						})}
					</div>
					<Field
						label={'Ano'}
						type={'number'}
						id={'dataBaseYear'}
						defaultValue={dataBase?.getFullYear()}
					/>
					<CommandBar padding={'7px 0 0 0'}>
						<Button
							icon={<FontAwesomeIcon icon={faCalendarAlt} />}
							className={'defineButton'}
							onClick={() => {
								setDataBase(
									new Date(
										parseInt(document.getElementById('dataBaseYear').value),
										dataBase?.getMonth(),
										1
									)
								)
								setDetail(undefined)
							}}
						>
							Definir
						</Button>
					</CommandBar>
				</DropDownMonthYearPanel>
			),
		})
	}

	return (
		<DataBasePickerStyle reduced={reduced} align={align} style={style}>
			<div>
				<Button
					icon={<FontAwesomeIcon icon={faChevronLeft} />}
					onClick={() => {
						previewMonth()
					}}
					className="transparent left"
				/>
			</div>
			<Button onClick={MonthYearPanel} className="transparent label">
				{formatedForUX()}
			</Button>
			<div>
				<Button
					icon={<FontAwesomeIcon icon={faChevronRight} />}
					onClick={() => {
						nextMonth()
					}}
					className="transparent right"
				/>
			</div>
		</DataBasePickerStyle>
	)
}
