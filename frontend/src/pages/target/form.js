import Field from '../../components/Field'
import useLocalization from '../../hook/useLocalization'
import DisplayRowStyle from '../../components/DisplayRow.style'
import { useContext, useEffect, useState } from 'react'
import { TableContext } from '../../hook/Table.context'
import styled from 'styled-components'
import Form from '../../components/Form'
import Button from '../../components/Button'
import { ConfigContext } from '../../hook/Config.context'
import Alert from '../../components/Alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageSettings from '../../assets/page.settings'
import { faCheck, faSave, faTrash } from '@fortawesome/free-solid-svg-icons'
import CommandBar from '../../components/CommandBar'
import { MessageContext } from '../../hook/Message.context'

const FormStyle = styled.div`
	display: flex;
	flex-direction: column;

	#targetValue {
		text-align: right;
	}
`

export default function TargetForm() {
	const { loc: locCommons } = useLocalization('commons')
	const { loc } = useLocalization('pages.target')
	const { aditionalInformation, create, update, remove } = useContext(TableContext)
	const { choiceMessage, setMessage } = useContext(MessageContext)
	const { setShowForm, showForm } = useContext(ConfigContext)
	const [alert, setAlert] = useState()
	const target = showForm.target

	function deleteTarget() {
		choiceMessage({
			icon: <FontAwesomeIcon icon={faTrash} />,
			header: loc.delete.header,
			text: loc.delete.text,
			option1: {
				text: locCommons.yes,
				icon: faCheck,
				event: () => {
					remove('target', target.id, () => {
						setMessage(undefined)
						setShowForm({
							...showForm,
							target: false,
						})
					})
				},
			},
			config: {
				style: 'red',
				withoutClose: true,
			},
		})
	}

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
				<CommandBar>
					<Button
						icon={<FontAwesomeIcon icon={faSave} />}
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
						{locCommons.save}
					</Button>
					{target.id && (
						<Button
							icon={<FontAwesomeIcon icon={faTrash} />}
							className="alert"
							onClick={() => deleteTarget(target)}
						>
							{locCommons.delete}
						</Button>
					)}
				</CommandBar>
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
