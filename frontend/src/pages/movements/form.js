import Field from '../../components/Field'
import useLocalization from '../../hook/useLocalization'
import DisplayRowStyle from '../../components/DisplayRow.style'
import FieldStyle from '../../components/Field.style'
import { useContext } from 'react'
import { TableContext } from '../../hook/Table.context'
import DisplayColumnStyle from '../../components/DisplayColumn.style'
import CurrencyUtils from '../../utils/CurrencyUtils'
import styled from 'styled-components'
import Form from '../../components/Form'
import Button from '../../components/Button'
import { ConfigContext } from '../../hook/Config.context'
import { LocalizationContext } from '../../hook/Localization.context'
import { MessageContext } from '../../hook/Message.context'

const FormStyle = styled.div`
	display: flex;
	flex-direction: column;

	.movementDueDate {
		width: 90px;
	}

	.movementStatus {
		width: 150px;
	}

	#movementValue {
		text-align: right;
	}
`

export default function MovementForm({ movement }) {
	const { loc: locCommons } = useLocalization('commons')
	const { loc } = useLocalization('pages.movement')
	const { aditionalInformation, create } = useContext(TableContext)
	const { setShowForm } = useContext(ConfigContext)
	const { getText } = useContext(LocalizationContext)
	const { simpleMessage } = useContext(MessageContext)

	return (
		<Form
			header={'Formulário de Lançamentos'}
			commands={
				<Button
					onClick={() => {
						create(
							'movement',
							{
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
							},
							() => {
								setShowForm((sf) => {
									return { ...sf, movement: false }
								})
							},
							(error) => {
								simpleMessage({
									header: 'Erro ao salvar conta',
									text: error.response.data[0]
										? error.response.data[0]
										: error.response.data.message,
								})
							}
						)
					}}
				>
					{locCommons.save}
				</Button>
			}
			onClose={() => {
				setShowForm((sf) => {
					return { ...sf, movement: false }
				})
			}}
		>
			<FormStyle>
				<DisplayRowStyle style={{}}>
					<Field id={'movementDueDate'} label={loc.table.dueDate} defaultValue={movement.dueDate} />
					<Field
						id={'movementDescription'}
						label={'Descrição'}
						defaultValue={movement.description}
					/>
				</DisplayRowStyle>
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
				<Field
					id={'movementValue'}
					label={loc.table.value}
					defaultValue={CurrencyUtils.format(movement.value).replace('R$', '').trim()}
				/>
			</FormStyle>
		</Form>
	)
}
