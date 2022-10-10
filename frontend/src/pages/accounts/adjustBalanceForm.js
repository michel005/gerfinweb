import styled from 'styled-components'
import useLocalization from '../../hook/useLocalization'
import { useContext } from 'react'
import { TableContext } from '../../hook/Table.context'
import { ConfigContext } from '../../hook/Config.context'
import Button from '../../components/Button'
import Field from '../../components/Field'
import Form from '../../components/Form'
import API from '../../config/API'
import DateUtils from '../../utils/DateUtils'
import DisplayRowStyle from '../../components/DisplayRow.style'
import url from '../../assets/url_settings.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollar, faSave } from '@fortawesome/free-solid-svg-icons'
import { MessageContext } from '../../hook/Message.context'
import CommandBar from '../../components/CommandBar'

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

export default function AdjustBalanceForm() {
	const { loc: locCommons } = useLocalization('commons')
	const { loc } = useLocalization('pages.account.adjust_balance')
	const { refresh } = useContext(TableContext)
	const { errorMessage } = useContext(MessageContext)
	const { setShowForm, showForm } = useContext(ConfigContext)

	return (
		<Form
			icon={<FontAwesomeIcon icon={faDollar} />}
			header={loc.header}
			commands={
				<CommandBar fixedInBottom={true}>
					<Button
						icon={<FontAwesomeIcon icon={faSave} />}
						onClick={() => {
							API.post(
								url.movement.ajustBalance,
								{
									date: DateUtils.stringJustDate(new Date()),
									description: document.getElementById('descriptionBalance').value,
									value: parseFloat(
										document.getElementById('newAccountBalance').value.replaceAll(',', '.')
									),
									account: showForm.adjustBalance,
								},
								{
									headers: {
										Authorization: localStorage.getItem('authHeader'),
									},
								}
							)
								.then(() => {
									refresh({ entity: 'account' })
									setShowForm((sf) => {
										return { ...sf, adjustBalance: false }
									})
								})
								.catch((error) => {
									errorMessage({
										header: loc.save_error,
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
					return { ...sf, adjustBalance: false }
				})
			}}
		>
			<FormStyle>
				<DisplayRowStyle>
					<Field
						id={'descriptionBalance'}
						label={loc.description_label}
						defaultValue={loc.description_value}
					/>
					<Field
						id={'newAccountBalance'}
						label={loc.new_balance_label}
						defaultValue={showForm.adjustBalance.current}
					/>
				</DisplayRowStyle>
			</FormStyle>
		</Form>
	)
}
