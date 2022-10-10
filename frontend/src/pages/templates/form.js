import Field from '../../components/Field'
import useLocalization from '../../hook/useLocalization'
import DisplayRowStyle from '../../components/DisplayRow.style'
import { useContext, useEffect, useState } from 'react'
import { TableContext } from '../../hook/Table.context'
import styled from 'styled-components'
import Form from '../../components/Form'
import Button from '../../components/Button'
import { ConfigContext } from '../../hook/Config.context'
import { MessageContext } from '../../hook/Message.context'
import Alert from '../../components/Alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageSettings from '../../assets/page.settings'
import { faCheck, faSave, faTrash } from '@fortawesome/free-solid-svg-icons'
import CommandBar from '../../components/CommandBar'

const FormStyle = styled.div`
	display: flex;
	flex-direction: column;

	.templateDueDay {
		width: 90px;
	}

	.templateContainer {
		justify-content: right;
	}

	.templateValue {
		max-width: 200px;
	}

	#templateValue {
		text-align: right;
	}
`

export default function TemplateForm() {
	const { loc: locCommons } = useLocalization('commons')
	const { loc } = useLocalization('pages.template')
	const { aditionalInformation, create, update, refresh, remove } = useContext(TableContext)
	const { setShowForm, showForm } = useContext(ConfigContext)
	const { simpleMessage, setMessage, choiceMessage } = useContext(MessageContext)
	const [recurrency, setRecurrency] = useState()
	const template = showForm.template

	function deleteTemplate() {
		choiceMessage({
			icon: <FontAwesomeIcon icon={faTrash} />,
			header: loc.delete.header,
			text: loc.delete.text,
			option1: {
				text: locCommons.yes,
				icon: faCheck,
				event: () => {
					remove('template', template.id, () => {
						setMessage(undefined)
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
		setRecurrency(loc.recurrency_description[document.getElementById('templateRecurrency').value])
	})

	return (
		<Form
			icon={<FontAwesomeIcon icon={PageSettings.template.icon} />}
			header={'Formulário de Modelos'}
			commands={
				<CommandBar noPaddingBottom={true} fixedInBottom={true}>
					<Button
						icon={<FontAwesomeIcon icon={faTrash} />}
						className="alert"
						onClick={() => deleteTemplate(template)}
					>
						{locCommons.delete}
					</Button>
					<Button
						icon={<FontAwesomeIcon icon={faSave} />}
						onClick={() => {
							const entity = {
								dueDay: parseInt(document.getElementById('templateDueDay').value),
								description: document.getElementById('templateDescription').value,
								recurrency: document.getElementById('templateRecurrency').value,
								account:
									document.getElementById('templateAccount').value === ''
										? null
										: {
												id: document.getElementById('templateAccount').value,
										  },
								value: parseFloat(document.getElementById('templateValue').value.replace(',', '.')),
							}
							if (template.id) {
								update(
									'template',
									template.id,
									entity,
									() => {
										setShowForm((sf) => {
											return { ...sf, template: false }
										})
										refresh({ entity: 'template' })
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
							} else {
								create(
									'template',
									entity,
									() => {
										setShowForm((sf) => {
											return { ...sf, template: false }
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
							}
						}}
					>
						{locCommons.save}
					</Button>
				</CommandBar>
			}
			onClose={() => {
				setShowForm((sf) => {
					return { ...sf, template: false }
				})
			}}
		>
			<FormStyle>
				<DisplayRowStyle style={{}}>
					<Field id={'templateDueDay'} label={loc.table.dueDay} defaultValue={template.dueDay} />
					<Field
						id={'templateDescription'}
						label={'Descrição'}
						defaultValue={template.description}
					/>
				</DisplayRowStyle>
				<DisplayRowStyle>
					<Field
						id={'templateRecurrency'}
						type={'select'}
						label={loc.table.recurrency}
						defaultValue={template.recurrency}
						nullable={false}
						list={loc.recurrency}
						onChange={(event) => {
							setRecurrency(loc.recurrency_description[event.target.value])
						}}
					/>
					<Field
						id={'templateAccount'}
						type={'select'}
						label={loc.table.account}
						defaultValue={template.account?.id}
						list={aditionalInformation.account}
						idModifier={(value) => {
							return value.id
						}}
						valueModifier={(value) => {
							return value.name
						}}
					/>
				</DisplayRowStyle>
				<DisplayRowStyle className={'templateContainer'}>
					<Field id={'templateValue'} label={loc.table.value} defaultValue={template.value} />
				</DisplayRowStyle>
			</FormStyle>
		</Form>
	)
}
