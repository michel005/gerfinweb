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
	const { setShowForm, adjustAccountBalance, setAdjustAccountBalance } = useContext(ConfigContext)

	return (
		<Form
			header={loc.header}
			commands={
				<Button
					onClick={() => {
						API.post(
							'/movement/adjustAccountBalance',
							{
								date: DateUtils.stringJustDate(new Date()),
								description: document.getElementById('descriptionBalance').value,
								value: parseFloat(
									document.getElementById('newAccountBalance').value.replaceAll(',', '.')
								),
								account: adjustAccountBalance,
							},
							{
								headers: {
									Authorization: localStorage.getItem('authHeader'),
								},
							}
						).then(() => {
							refresh({ entity: 'account' })
							setAdjustAccountBalance(undefined)
							setShowForm((sf) => {
								return { ...sf, adjustBalance: false }
							})
						})
					}}
				>
					{locCommons.save}
				</Button>
			}
			onClose={() => {
				setAdjustAccountBalance(undefined)
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
					<Field id={'newAccountBalance'} label={loc.new_balance_label} defaultValue={'0,00'} />
				</DisplayRowStyle>
			</FormStyle>
		</Form>
	)
}
