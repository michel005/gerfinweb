import Field from '../../components/Field'
import useLocalization from '../../hook/useLocalization'
import DisplayRowStyle from '../../components/DisplayRow.style'
import { useContext } from 'react'
import { TableContext } from '../../hook/Table.context'
import styled from 'styled-components'
import DateUtils from '../../utils/DateUtils'
import Form from '../../components/Form'
import { ConfigContext } from '../../hook/Config.context'
import Button from '../../components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import API from '../../config/API'
import { MessageContext } from '../../hook/Message.context'
import { faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons'
import CommandBar from '../../components/CommandBar'

const FormStyle = styled.div`
	display: flex;
	flex-direction: column;

	#transferValue {
		text-align: right;
	}
`

export default function TransferForm() {
	const { loc: locCommons } = useLocalization('commons')
	const { loc: locComponents } = useLocalization('componnents')
	const { loc } = useLocalization('pages.movement')
	const { aditionalInformation, find } = useContext(TableContext)
	const { setShowForm, dataBase, setDataBase } = useContext(ConfigContext)
	const { errorMessage } = useContext(MessageContext)

	return (
		<Form
			icon={<FontAwesomeIcon icon={faArrowAltCircleDown} />}
			header={'Formulário de Transferência'}
			commands={
				<CommandBar fixedInBottom={true} noPaddingBottom={true}>
					<Button
						icon={<FontAwesomeIcon icon={faSave} />}
						onClick={() => {
							API.post(
								'/movement/transfer',
								{
									date: document.getElementById('transferDueDate').value,
									accountOrigin:
										document.getElementById('originAccount').value === ''
											? null
											: {
													id: document.getElementById('originAccount').value,
											  },
									accountDestiny:
										document.getElementById('targetAccount').value === ''
											? null
											: {
													id: document.getElementById('targetAccount').value,
											  },
									description: document.getElementById('transferDescription').value,
									value: parseFloat(
										document.getElementById('transferValue').value.replace(',', '.')
									),
									status: document.getElementById('transferStatus').value,
								},
								{
									headers: {
										Authorization: localStorage.getItem('authHeader'),
									},
								}
							)
								.then(() => {
									find({ entity: 'movement' })
									setDataBase(new Date(dataBase))
									setShowForm((sf) => {
										return { ...sf, transfer: false }
									})
								})
								.catch((error) => {
									errorMessage({
										header: locComponents.table.update_field.header,
										text: error,
									})
								})
						}}
					>
						{locCommons.save}
					</Button>
				</CommandBar>
			}
			onClose={() => {
				setShowForm((sf) => {
					return { ...sf, transfer: false }
				})
			}}
		>
			<FormStyle>
				<Field
					id={'transferDueDate'}
					label={'Data de Vencimento'}
					defaultValue={DateUtils.stringJustDate(new Date())}
				/>
				<Field
					id={'transferDescription'}
					label={'Descrição'}
					defaultValue={'Transferência Padrão'}
				/>
				<DisplayRowStyle>
					<Field
						id={'originAccount'}
						type={'select'}
						label={'Conta de Origem'}
						defaultValue={null}
						list={aditionalInformation.account}
						idModifier={(value) => {
							return value.id
						}}
						valueModifier={(value) => {
							return value.name
						}}
					/>
					<Field
						id={'targetAccount'}
						type={'select'}
						label={'Conta de Destino'}
						defaultValue={null}
						list={aditionalInformation.account}
						idModifier={(value) => {
							return value.id
						}}
						valueModifier={(value) => {
							return value.name
						}}
					/>
				</DisplayRowStyle>
				<DisplayRowStyle>
					<Field
						id={'transferStatus'}
						type={'select'}
						label={loc.table.status}
						defaultValue={'PENDENT'}
						nullable={false}
						list={{ PENDENT: loc.types.PENDENT, APPROVED: loc.types.APPROVED }}
					/>
					<Field id={'transferValue'} label={loc.table.value} defaultValue={0} />
				</DisplayRowStyle>
			</FormStyle>
		</Form>
	)
}
