import { faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons'
import { faCheck, faExclamation, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState } from 'react'
import PageSettings from '../../assets/page.settings'
import Button from '../../components/Button'
import Table from '../../components/Table'
import API from '../../config/API'
import { ConfigContext } from '../../hook/Config.context'
import { MessageContext } from '../../hook/Message.context'
import { TableContext } from '../../hook/Table.context'
import CurrencyUtils from '../../utils/CurrencyUtils'
import MovementStyle from './index.style'
import useLocalization from '../../hook/useLocalization'
import DateUtils from '../../utils/DateUtils'
import DataBasePicker from '../../components/DataBasePicker'
import CommandBar from '../../components/CommandBar'
import ButtonMultipleOption from '../../components/ButtonMultipleOption'

export default function Movements() {
	const { updateField, find, remove, aditionalInformation } = useContext(TableContext)
	const { choiceMessage, setMessage, simpleMessage } = useContext(MessageContext)
	const { dataBase, setDataBase, formatedDataBaseForURL, setShowForm } = useContext(ConfigContext)
	const [showTemplates, setShowTemplates] = useState(false)
	const { loc } = useLocalization('pages.movement')
	const { loc: locTemplate } = useLocalization('pages.template')
	const { loc: locCommons } = useLocalization('commons')

	function deleteMovement(movement) {
		choiceMessage({
			icon: <FontAwesomeIcon icon={faTrash} />,
			header: loc.delete.header,
			text: loc.delete.text,
			option1: {
				text: locCommons.yes,
				icon: faCheck,
				event: () => {
					remove('movement', movement.id, () => {
						setMessage(undefined)
					})
				},
			},
			config: {
				style: 'red',
				withoutClose: true,
			},
		})
	}

	function addMovementBasedOnTemplate(template) {
		setShowTemplates(false)
		API.post(
			'/movement/createBasedOnTemplate?id=' + template.id + '&dataBase=' + formatedDataBaseForURL(),
			{},
			{
				headers: {
					Authorization: localStorage.getItem('authHeader'),
				},
			}
		).then(() => {
			find({ entity: 'movement' })
			setDataBase(new Date(dataBase))
		})
	}

	function createMovementEvent() {
		setShowTemplates(false)
		setShowForm((sf) => {
			return {
				...sf,
				movement: {
					dueDate: DateUtils.stringJustDate(new Date()),
					description: loc.new_movement.description,
					status: 'PENDENT',
					value: 0.0,
				},
			}
		})
	}

	return (
		<MovementStyle showTemplates={showTemplates}>
			<CommandBar>
				<ButtonMultipleOption
					icon={<FontAwesomeIcon icon={faPlus} />}
					label={locCommons.create}
					event={createMovementEvent}
					options={[
						{
							icon: <FontAwesomeIcon icon={faArrowAltCircleDown} />,
							label: locCommons.transfer,
							event: () => {
								setShowTemplates(false)
								setShowForm((sf) => {
									return { ...sf, transfer: true }
								})
							},
						},
					]}
				/>
				<ButtonMultipleOption
					icon={<FontAwesomeIcon icon={PageSettings.template.icon} />}
					label={locTemplate.header.text}
					options={aditionalInformation.template.map((template) => {
						return {
							label: template.description,
							event: () => addMovementBasedOnTemplate(template),
						}
					})}
				/>
				<div style={{ display: 'flex', flexGrow: 1 }}></div>
				<DataBasePicker />
			</CommandBar>
			<Table
				entity={'movement'}
				header={{
					dueDate: loc.table.dueDate,
					description: loc.table.description,
					account: loc.table.account,
					value: loc.table.value,
					status: loc.table.status,
					movementDate: loc.table.movementDate,
					commands: '',
				}}
				responsiveColumns={{
					account: true,
					status: true,
					movementDate: true,
				}}
				responsiveLayout={(movement) => (
					<div className={'responsiveLayout'}>
						<div className={'layoutDate'}>
							{movement.date}
							<div className={`statusLabel ${movement.status}`}>
								{loc.types[movement.status]}{' '}
								<FontAwesomeIcon icon={movement.status === 'PENDENT' ? faExclamation : faCheck} />
							</div>
							{movement.template && (
								<div className={`statusLabel template`}>
									{loc.label.template} <FontAwesomeIcon icon={PageSettings.template.icon} />
								</div>
							)}
						</div>
						<div className={'descriptionAccountGroup'}>
							<div className={'layoutDescription'}>{movement.description}</div>
							<div className={'layoutAccountName'}>{movement.account.name}</div>
						</div>
						<div className={'layoutValue'}>
							<div className={'mainValue'}>
								<div className={'currency'}>R$</div>
								<div className={'value'}>{CurrencyUtils.format(movement.value)}</div>
							</div>
						</div>
					</div>
				)}
				responsiveAction={(movement) => {
					setShowTemplates(false)
					setShowForm((sf) => {
						return {
							...sf,
							movement: movement,
						}
					})
				}}
				enableOrderBy={{
					commands: false,
				}}
				valueMapper={{
					id: (movement) => {
						return movement.id
					},
					dueDate: (movement) => {
						return movement.dueDate
					},
					description: (movement) => {
						return movement.description
					},
					account: (movement) => {
						return movement.account.name
					},
					value: (movement) => {
						return movement.value
					},
					status: (movement) => {
						return movement.status
					},
					movementDate: (movement) => {
						return movement.movementDate
					},
				}}
				valueModifier={{
					id: (value, movement) => {
						return movement.id
					},
					dueDate: (value, movement) => {
						return movement.dueDate
					},
					description: (value, movement) => {
						return movement.description
					},
					account: (value, movement) => {
						return movement.account.name
					},
					value: (value, movement) => {
						return CurrencyUtils.format(movement.value)
					},
					status: (value, movement) => {
						return loc.types[movement.status]
					},
					movementDate: (value, movement) => {
						return movement.movementDate
					},
					commands: (value, movement) => {
						return (
							<button
								className="transparent"
								title="Remove"
								onClick={() => deleteMovement(movement)}
							>
								<FontAwesomeIcon icon={faTrash} />
							</button>
						)
					},
				}}
				editModifier={{
					status: (movement, field, event) => (
						<select
							defaultValue={movement.status}
							onChange={(ev) => {
								ev.code = 'Enter'
								event(ev, movement, field)
							}}
							onKeyDown={(ev) => event(ev, movement, field)}
						>
							{['PENDENT', 'APPROVED'].map((movementType, movementTypeIndex) => {
								return (
									<option key={movementTypeIndex} value={movementType}>
										{loc.types[movementType]}
									</option>
								)
							})}
						</select>
					),
					account: (movement, field, event) => (
						<select
							defaultValue={movement.account.id}
							onChange={(ev) => {
								ev.code = 'Enter'
								event(ev, movement, field)
							}}
							onKeyDown={(ev) => event(ev, movement, field)}
						>
							{aditionalInformation.account.map((account, accountIndex) => {
								return (
									<option key={accountIndex} value={account.id}>
										{account.name}
									</option>
								)
							})}
						</select>
					),
					movementDate: (movement, field, event, defaultEditor, noEditEvent) => {
						if (movement.status !== 'APPROVED') {
							simpleMessage({
								header: loc.movement_date_error.header,
								text: loc.movement_date_error.text,
								config: {
									style: 'red',
								},
							})
							noEditEvent()
							return <></>
						} else {
							return defaultEditor
						}
					},
				}}
				columnAction={{
					dueDate: (movement, value) => {
						updateField('movement', movement, 'dueDate', value)
					},
					description: (movement, value) => {
						updateField('movement', movement, 'description', value)
					},
					account: (movement, value) => {
						updateField('movement', movement, 'account', {
							id: value,
						})
					},
					value: (movement, value) => {
						updateField('movement', movement, 'value', value)
					},
					movementDate: (movement, value) => {
						if (movement.status !== 'APPROVED' && value !== null) {
							simpleMessage({
								header: loc.movement_date_error.header,
								text: loc.movement_date_error.text,
								config: {
									style: 'red',
								},
							})
						} else {
							updateField('movement', movement, 'movementDate', value)
						}
					},
					status: (movement, value) => {
						updateField('movement', movement, 'status', value)
					},
				}}
			/>
		</MovementStyle>
	)
}
