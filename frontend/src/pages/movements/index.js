import { faArrowsRotate, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import Button from '../../components/Button'
import Table from '../../components/Table'
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
	const { dataBase } = useContext(ConfigContext)

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

	return (
		<MovementStyle>
			<div className={'commands'}>
				<Button
					onClick={() =>
						create('movement', {
                            dueDate: new Date().getDate() + '/' + DateUtils.stringJustDate(dataBase).substring(3),
							description: getText('pages.movement.new_movement.description'),
                            status: 'PENDENT',
                            account: aditionalInformation.account[0],
                            value: 1.0
						})
					}
				>
					<FontAwesomeIcon icon={faPlus} /> {getText('commons.create')}
				</Button>
				<Button onClick={() => find({ entity: 'movement' })}>
					<FontAwesomeIcon icon={faArrowsRotate} /> {getText('commons.refresh')}
				</Button>
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
						return movement.description
					},
					account: (value, movement) => {
						return movement.account.name
					},
					value: (value, movement) => {
						return CurrencyUtils.format(movement.value)
					},
					status: (value, movement) => {
						return movement.status
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
                            id: value
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
