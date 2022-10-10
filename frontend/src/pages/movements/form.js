import Field from '../../components/Field'
import useLocalization from '../../hook/useLocalization'
import DisplayRowStyle from '../../components/DisplayRow.style'
import { useContext } from 'react'
import { TableContext } from '../../hook/Table.context'
import styled from 'styled-components'
import Form from '../../components/Form'
import Button from '../../components/Button'
import { ConfigContext } from '../../hook/Config.context'
import { MessageContext } from '../../hook/Message.context'
import PageSettings from '../../assets/page.settings'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faArrowDown,
	faArrowUp,
	faCheck,
	faClose,
	faSave,
	faTrash,
} from '@fortawesome/free-solid-svg-icons'
import CommandBar from '../../components/CommandBar'
import Alert from '../../components/Alert'

const FormStyle = styled.div`
	display: flex;
	flex-direction: column;

	.movementDueDate,
	.movementMovementDate {
		width: 90px;
	}

	.movementStatus {
		width: 150px;
	}

	#movementValue {
		text-align: right;
	}

	.alert {
		margin-bottom: 10px;
	}
`

export default function MovementForm() {
	const { loc: locCommons } = useLocalization('commons')
	const { loc } = useLocalization('pages.movement')
	const { aditionalInformation, create, update, refresh, remove } = useContext(TableContext)
	const { setShowForm, showForm } = useContext(ConfigContext)
	const { errorMessage, choiceMessage, setMessage } = useContext(MessageContext)

	const movement = showForm.movement

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
					setShowForm((sf) => {
						return { ...sf, movement: false }
					})
				},
			},
			config: {
				style: 'red',
				withoutClose: true,
			},
		})
	}

	function saveMovement() {
		let entity = {
			...movement,
			dueDate: document.getElementById('movementDueDate').value,
			description: document.getElementById('movementDescription').value,
			status: document.getElementById('movementStatus').value,
			account:
				document.getElementById('movementAccount').value === ''
					? null
					: {
							id: document.getElementById('movementAccount').value,
					  },
			value: parseFloat(document.getElementById('movementValue').value),
		}
		if (movement.id) {
			update(
				'movement',
				movement.id,
				entity,
				() => {
					setShowForm((sf) => {
						return { ...sf, movement: false }
					})
					refresh({ entity: 'movement' })
				},
				(error) => {
					errorMessage({
						header: loc.save_error,
						text: error,
					})
				}
			)
		} else {
			create(
				'movement',
				entity,
				() => {
					setShowForm((sf) => {
						return { ...sf, movement: false }
					})
				},
				(error) => {
					errorMessage({
						header: loc.save_error,
						text: error,
					})
				}
			)
		}
	}

	return (
		<Form
			icon={<FontAwesomeIcon icon={PageSettings.movement.icon} />}
			header={loc.form_header}
			commands={
				<CommandBar noPaddingBottom={true} fixedInBottom={true}>
					{movement.id && (
						<Button
							icon={<FontAwesomeIcon icon={faClose} />}
							className={'alert'}
							onClick={() => deleteMovement(movement)}
						>
							{locCommons.delete}
						</Button>
					)}
					<Button icon={<FontAwesomeIcon icon={faSave} />} onClick={saveMovement}>
						{locCommons.save}
					</Button>
				</CommandBar>
			}
			onClose={() => {
				setShowForm((sf) => {
					return { ...sf, movement: false }
				})
			}}
		>
			<FormStyle>
				<DisplayRowStyle forceResponsive={true}>
					<Field id={'movementDueDate'} label={loc.table.dueDate} defaultValue={movement.dueDate} />
					<Field
						id={'movementMovementDate'}
						label={loc.table.movementDate}
						defaultValue={movement.movementDate}
					/>
				</DisplayRowStyle>
				<Field
					id={'movementDescription'}
					label={loc.table.description}
					defaultValue={movement.description}
				/>
				<DisplayRowStyle>
					<Field
						id={'movementStatus'}
						type={'select'}
						label={loc.table.status}
						defaultValue={movement.status}
						nullable={false}
						list={loc.types}
					/>
					<Field
						id={'movementAccount'}
						type={'select'}
						label={loc.table.account}
						defaultValue={movement.account?.id}
						list={aditionalInformation.account}
						idModifier={(value) => {
							return value.id
						}}
						valueModifier={(value) => {
							return value.name
						}}
					/>
				</DisplayRowStyle>
				<Field id={'movementValue'} label={loc.table.value} defaultValue={movement.value} />
				{movement.template && (
					<Alert
						alert={'<b>Modelo de Lançamento:</b> ' + movement.template.description}
						convertHtml={true}
					/>
				)}
				{movement.description.indexOf('(IN)') !== -1 && (
					<Alert icon={faArrowUp} alert={'<b>Transferência de Origem</b>'} convertHtml={true} />
				)}
				{movement.description.indexOf('(OUT)') !== -1 && (
					<Alert icon={faArrowDown} alert={'<b>Transferência de Destino</b>'} convertHtml={true} />
				)}
				{movement.description.indexOf('(ALERT)') !== -1 && (
					<Alert className={'error'} alert={'<b>Prioritário!</b>'} convertHtml={true} />
				)}
			</FormStyle>
		</Form>
	)
}
