import Field from '../../components/Field'
import useLocalization from '../../hook/useLocalization'
import DisplayRowStyle from '../../components/DisplayRow.style'
import { useContext, useState } from 'react'
import { TableContext } from '../../hook/Table.context'
import CurrencyUtils from '../../utils/CurrencyUtils'
import styled from 'styled-components'
import DateUtils from '../../utils/DateUtils'
import Form from '../../components/Form'
import { ConfigContext } from '../../hook/Config.context'
import Button from '../../components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import API from '../../config/API'
import { LocalizationContext } from '../../hook/Localization.context'
import { MessageContext } from '../../hook/Message.context'
import Alert from '../../components/Alert'
import { faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons'

const FormStyle = styled.div`
	display: flex;
	flex-direction: column;

	.transferDueDate {
		width: 90px;
	}

	.transferDescription {
		width: 150px;
	}

	#transferValue {
		text-align: right;
	}
`

export default function TransferForm() {
	const { loc: locCommons } = useLocalization('commons')
	const { loc } = useLocalization('pages.movement')
	const { aditionalInformation, find } = useContext(TableContext)
	const { setShowForm, dataBase, setDataBase } = useContext(ConfigContext)
	const { getText } = useContext(LocalizationContext)
	const { simpleMessage } = useContext(MessageContext)
	const [accountAlert, setAccountAlert] = useState()

	function defineAccountAlert() {
		let dueDate = document.getElementById('transferDueDate').value
		let value = parseFloat(document.getElementById('transferValue').value.replace(',', '.'))
		if (CurrencyUtils.format(value) === 'R$ NaN') {
			value = 0
		}
		let targetAccount =
			document.getElementById('targetAccount').value === ''
				? null
				: aditionalInformation.account.filter(
						(value) => value.id === parseInt(document.getElementById('targetAccount').value)
				  )[0]
		let originAccount =
			document.getElementById('originAccount').value === ''
				? null
				: aditionalInformation.account.filter(
						(value) => value.id === parseInt(document.getElementById('originAccount').value)
				  )[0]
		if (originAccount && targetAccount) {
			setAccountAlert(
				<div
					dangerouslySetInnerHTML={{
						__html: loc.transfer_account_description
							.replaceAll('@#VALUE@#', CurrencyUtils.format(value))
							.replaceAll('@#DATE@#', dueDate)
							.replaceAll('@#ORIGIN@#', originAccount.name)
							.replaceAll('@#TARGET@#', targetAccount.name),
					}}
				></div>
			)
		} else {
			setAccountAlert(undefined)
		}
	}

	return (
		<Form
			icon={<FontAwesomeIcon icon={faArrowAltCircleDown} />}
			header={'Formulário de Transferência'}
			commands={
				<Button
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
								value: parseFloat(document.getElementById('transferValue').value.replace(',', '.')),
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
								simpleMessage({
									header: getText('componnents.table.update_field.header'),
									text: error.response.data[0]
										? error.response.data[0]
										: error.response.data.message,
								})
							})
					}}
				>
					<FontAwesomeIcon icon={faSave} /> {locCommons.save}
				</Button>
			}
			onClose={() => {
				setShowForm((sf) => {
					return { ...sf, transfer: false }
				})
			}}
		>
			<FormStyle>
				<DisplayRowStyle>
					<Field
						id={'transferDueDate'}
						label={'Data de Vencimento'}
						defaultValue={DateUtils.stringJustDate(new Date())}
						onChange={() => defineAccountAlert()}
					/>
					<Field
						id={'transferDescription'}
						label={'Descrição'}
						defaultValue={'Transferência Padrão'}
					/>
				</DisplayRowStyle>
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
						onChange={() => defineAccountAlert()}
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
						onChange={() => defineAccountAlert()}
					/>
				</DisplayRowStyle>
				<Field
					id={'transferStatus'}
					type={'select'}
					label={loc.table.status}
					defaultValue={'PENDENT'}
					nullable={false}
					list={{ PENDENT: loc.types.PENDENT, APPROVED: loc.types.APPROVED }}
				/>
				<Field
					id={'transferValue'}
					label={loc.table.value}
					defaultValue={'0,00'}
					onChange={() => defineAccountAlert()}
				/>
				{accountAlert && <Alert alert={accountAlert} />}
			</FormStyle>
		</Form>
	)
}
