import Field from '../../components/Field'
import useLocalization from '../../hook/useLocalization'
import DisplayRowStyle from '../../components/DisplayRow.style'
import { useContext, useEffect, useState } from 'react'
import { TableContext } from '../../hook/Table.context'
import CurrencyUtils from '../../utils/CurrencyUtils'
import styled from 'styled-components'
import Form from '../../components/Form'
import Button from '../../components/Button'
import { ConfigContext } from '../../hook/Config.context'
import Alert from '../../components/Alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageSettings from '../../assets/page.settings'
import { faSave } from '@fortawesome/free-solid-svg-icons'

const FormStyle = styled.div`
	display: flex;
	flex-direction: column;

	.targetDate {
		width: 90px;
	}

	#targetValue {
		text-align: right;
	}
`

export default function TargetForm() {
	const { loc: locCommons } = useLocalization('commons')
	const { loc } = useLocalization('pages.target')
	const { aditionalInformation, create, update } = useContext(TableContext)
	const { setShowForm, showForm } = useContext(ConfigContext)
	const [alert, setAlert] = useState()
	const target = showForm.target

	useEffect(() => {
		setAlert(
			document.getElementById('targetAccount').value === ''
				? 'Recomendamos que uma meta seja atrelada a uma conta. Desta forma você tem uma noção mais realista se esta próximo ou não de atingila.'
				: undefined
		)
	})

	return (
		<Form
			icon={<FontAwesomeIcon icon={PageSettings.target.icon} />}
			header={'Formulário de Metas'}
			commands={
				<Button
					onClick={() => {
						const entity = {
							targetDate: document.getElementById('targetDate').value,
							description: document.getElementById('targetDescription').value,
							account:
								document.getElementById('targetAccount').value === ''
									? null
									: {
											id: document.getElementById('targetAccount').value,
									  },
							targetValue: document.getElementById('targetValue').value.replace(',', '.'),
						}
						if (target.id) {
							update('target', target.id, entity)
						} else {
							create('target', entity)
						}
						setShowForm((sf) => {
							return { ...sf, target: false }
						})
					}}
				>
					<FontAwesomeIcon icon={faSave} /> {locCommons.save}
				</Button>
			}
			onClose={() => {
				setShowForm((sf) => {
					return { ...sf, target: false }
				})
			}}
		>
			<FormStyle>
				<DisplayRowStyle>
					<Field id={'targetDate'} label={loc.table.targetDate} defaultValue={target.targetDate} />
					<Field
						id={'targetDescription'}
						label={loc.table.description}
						defaultValue={target.description}
					/>
				</DisplayRowStyle>
				<Field
					id={'targetAccount'}
					type={'select'}
					label={loc.table.account}
					defaultValue={target.account?.id}
					list={aditionalInformation.account}
					nullableText={'Todas as Contas'}
					idModifier={(value) => {
						return value.id
					}}
					valueModifier={(value) => {
						return value.name
					}}
					onChange={(event) => {
						setAlert(
							event.target.value === ''
								? 'Recomendamos que uma meta seja atrelada a uma conta. Desta forma você tem uma noção mais realista se esta próximo ou não de atingila.'
								: undefined
						)
					}}
				/>
				{alert && <Alert alert={alert} />}
				<Field id={'targetValue'} label={loc.table.targetValue} defaultValue={target.targetValue} />
			</FormStyle>
		</Form>
	)
}
