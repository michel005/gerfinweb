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
import { MessageContext } from '../../hook/Message.context'
import Alert from '../../components/Alert'

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

export default function TemplateForm({ template }) {
	const { loc: locCommons } = useLocalization('commons')
	const { loc } = useLocalization('pages.template')
	const { aditionalInformation, create } = useContext(TableContext)
	const { setShowForm } = useContext(ConfigContext)
	const { simpleMessage } = useContext(MessageContext)
	const [recurrency, setRecurrency] = useState()
	const [help, setHelp] = useState(false)

	useEffect(() => {
		setRecurrency(loc.recurrency_description[document.getElementById('templateRecurrency').value])
	})

	return (
		<Form
			header={'Formulário de Modelos'}
			commands={
				<>
					<Button
						onClick={() => {
							create(
								'template',
								{
									dueDay: parseInt(document.getElementById('templateDueDay').value),
									description: document.getElementById('templateDescription').value,
									recurrency: document.getElementById('templateRecurrency').value,
									account:
										document.getElementById('templateAccount').value === ''
											? null
											: {
													id: document.getElementById('templateAccount').value,
											  },
									value: parseFloat(
										document.getElementById('templateValue').value.replace(',', '.')
									),
								},
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
						}}
					>
						{locCommons.save}
					</Button>
					<Button className={'transparent'} onClick={() => setHelp(!help)}>
						{locCommons.help}
					</Button>
				</>
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
				{help && <Alert convertHtml={true} alert={loc.dueDay_description} />}
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
				{recurrency && help && <Alert convertHtml={true} alert={recurrency} />}
				<DisplayRowStyle className={'templateContainer'}>
					<Field
						id={'templateValue'}
						label={loc.table.value}
						defaultValue={CurrencyUtils.format(template.value).replace('R$', '').trim()}
					/>
				</DisplayRowStyle>
				{help && (
					<Alert
						alert={'Quanto mais campos você preencher, mais rápido fica para criar um lançamento.'}
					/>
				)}
			</FormStyle>
		</Form>
	)
}
