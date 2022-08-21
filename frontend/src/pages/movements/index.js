import { faArrowsRotate, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState } from 'react'
import PageSettings from '../../assets/page.settings'
import Button from '../../components/Button'
import Table from '../../components/Table'
import API from '../../config/API'
import { ConfigContext } from '../../hook/Config.context'
import { LocalizationContext } from '../../hook/Localization.context'
import { MessageContext } from '../../hook/Message.context'
import { TableContext } from '../../hook/Table.context'
import CurrencyUtils from '../../utils/CurrencyUtils'
import DateUtils from '../../utils/DateUtils'
import MovementStyle from './index.style'

export default function Movements() {
	const { getText } = useContext(LocalizationContext)
	const { updateField, find, create, remove, aditionalInformation } = useContext(TableContext)
	const { choiceMessage, setMessage } = useContext(MessageContext)
	const { dataBase, setDataBase, formatedDataBaseForURL } = useContext(ConfigContext)
	const [showTemplates, setShowTemplates] = useState(false)

	function deleteMovement(movement) {
		choiceMessage({
			header: getText('pages.movement.delete.header'),
			text: getText('pages.movement.delete.text'),
			option1: {
				text: getText('commons.yes'),
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
					title={
						aditionalInformation.account.length === 0
							? getText('pages.movement.create_no_account')
							: ''
					}
					onClick={() =>
						create('movement', {
							dueDate: new Date().getDate() + '/' + DateUtils.stringJustDate(dataBase).substring(3),
							description: getText('pages.movement.new_movement.description'),
							status: 'PENDENT',
							account: aditionalInformation.account[0],
							value: 1.0,
						})
					}
				>
					<FontAwesomeIcon icon={faPlus} /> {getText('commons.create')}
				</Button>
				<Button onClick={() => find({ entity: 'movement' })}>
					<FontAwesomeIcon icon={faArrowsRotate} /> {getText('commons.refresh')}
				</Button>
				<Button
					onClick={() => setShowTemplates(!showTemplates)}
					disabled={aditionalInformation.template.length === 0 || aditionalInformation.account.length === 0}
					title={
						aditionalInformation.account.length === 0
							? getText('pages.movement.create_no_account')
							: (aditionalInformation.template.length === 0 ? getText('pages.movement.create_no_template') : '')
					}
				>
					<FontAwesomeIcon icon={PageSettings.template.icon} />{' '}
					{getText('pages.template.header.text')}
				</Button>
				{showTemplates && (
					<>
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
					</>
				)}
			</div>
			<Table
				entity={'movement'}
				header={{
					dueDate: getText('pages.movement.table.dueDate'),
					description: getText('pages.movement.table.description'),
					account: getText('pages.movement.table.account'),
					value: getText('pages.movement.table.value'),
					status: getText('pages.movement.table.status'),
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
								{movement.description}{' '}
								{movement.template && (
									<div className={'templateLabel'}>Template</div>
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
						return getText('pages.movement.types.' + movement.status)
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
										{getText('pages.movement.types.' + movementType)}
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
					status: (movement, value) => {
						updateField('movement', movement, 'status', value)
					},
				}}
			/>
		</MovementStyle>
	)
}
