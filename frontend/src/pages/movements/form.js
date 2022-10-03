import Field from '../../components/Field'
import useLocalization from '../../hook/useLocalization'
import DisplayRowStyle from '../../components/DisplayRow.style'
import { useContext } from 'react'
import { TableContext } from '../../hook/Table.context'
import CurrencyUtils from '../../utils/CurrencyUtils'
import styled from 'styled-components'
import Form from '../../components/Form'
import Button from '../../components/Button'
import { ConfigContext } from '../../hook/Config.context'
import { MessageContext } from '../../hook/Message.context'
import PageSettings from '../../assets/page.settings'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

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
`

export default function MovementForm() {
	const { loc: locCommons } = useLocalization('commons')
	const { loc } = useLocalization('pages.movement')
	const { aditionalInformation, create, update, refresh } = useContext(TableContext)
	const { setShowForm, showForm } = useContext(ConfigContext)
	const { errorMessage } = useContext(MessageContext)

	const movement = showForm.movement

	return (
		<Form
			icon={<FontAwesomeIcon icon={PageSettings.movement.icon} />}
			header={loc.form_header}
			commands={
				<Button
					onClick={() => {
						let entity = {
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
										text: error.response.data[0]
											? error.response.data[0]
											: error.response.data.message,
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
										text: error.response.data[0]
											? error.response.data[0]
											: error.response.data.message,
									})
								}
							)
						}
					}}
				>
					<FontAwesomeIcon icon={faSave} /> {locCommons.save}
				</Button>
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
			</FormStyle>
		</Form>
	)
}
