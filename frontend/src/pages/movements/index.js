import { faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons'
import { faArrowsRotate, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
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
			header: loc.delete.header,
			text: loc.delete.text,
			option1: {
				text: locCommons.yes,
				icon: faTrash,
				event: () => {
					remove('movement', movement.id, () => {
						setMessage(undefined)
					})
				},
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

	return (
		<MovementStyle>
			<div className={'commands'}>
				<Button
					disabled={aditionalInformation.account.length === 0}
					title={aditionalInformation.account.length === 0 ? loc.create_no_account : ''}
					onClick={() => {
						setShowForm((sf) => {
							return { ...sf, movement: true }
						})
					}}
				>
					<FontAwesomeIcon icon={faPlus} /> {locCommons.create}
				</Button>
				<Button onClick={() => find({ entity: 'movement' })}>
					<FontAwesomeIcon icon={faArrowsRotate} /> {locCommons.refresh}
				</Button>
				<Button
					onClick={() => {
						setShowTemplates(!showTemplates)
					}}
					disabled={
						aditionalInformation.template.length === 0 || aditionalInformation.account.length === 0
					}
					title={
						aditionalInformation.account.length === 0
							? loc.create_no_account
							: aditionalInformation.template.length === 0
							? loc.create_no_template
							: locTemplate.header.text
					}
				>
					<FontAwesomeIcon icon={PageSettings.template.icon} /> {locTemplate.header.text}
				</Button>
				{showTemplates && (
					<div className={'templateList'}>
						{aditionalInformation.template.map((template) => {
							return (
								<div
									key={template.id}
									className={'templateItem'}
									onClick={() => addMovementBasedOnTemplate(template)}
								>
									<div className={'dueDay'}>{template.dueDay}</div>
									<div className={'description'}>{template.description}</div>
								</div>
							)
						})}
					</div>
				)}
				<Button
					disabled={aditionalInformation.account.length === 0}
					title={aditionalInformation.account.length === 0 ? loc.create_no_account : ''}
					onClick={() => {
						setShowForm((sf) => {
							return { ...sf, transfer: true }
						})
					}}
				>
					<FontAwesomeIcon icon={faArrowAltCircleDown} /> {locCommons.transfer}
				</Button>
			</div>
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
						return (
							<>
								{movement.description
									.replaceAll('(IN)', '')
									.replaceAll('(OUT)', '')
									.replaceAll('(ALERT)', '')
									.trim()}{' '}
								{movement.template && (
									<div>
										<div className={'label template'}>{loc.label.template}</div>
									</div>
								)}{' '}
								{movement.description.indexOf('(IN)') !== -1 && (
									<div>
										<div className={'label transferDestiny'}>{loc.label.destiny_transfer}</div>
									</div>
								)}{' '}
								{movement.description.indexOf('(OUT)') !== -1 && (
									<div>
										<div className={'label transferOrigin'}>{loc.label.origin_transfer}</div>
									</div>
								)}{' '}
								{movement.description.indexOf('(ALERT)') !== -1 && (
									<div>
										<div className={'label alertMovement'}>{loc.label.alert}</div>
									</div>
								)}
							</>
						)
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
