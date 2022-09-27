import Field from '../../components/Field'
import useLocalization from '../../hook/useLocalization'
import DisplayRowStyle from '../../components/DisplayRow.style'
import { useContext, useEffect, useState } from 'react'
import Button from '../../components/Button'
import { TableContext } from '../../hook/Table.context'
import { ConfigContext } from '../../hook/Config.context'
import Form from '../../components/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo, faSave } from '@fortawesome/free-solid-svg-icons'
import Alert from '../../components/Alert'
import { MessageContext } from '../../hook/Message.context'

export default function AccountForm({ account }) {
	const { loc: locCommons } = useLocalization('commons')
	const { loc } = useLocalization('pages.account')
	const { create } = useContext(TableContext)
	const { setShowForm } = useContext(ConfigContext)
	const { simpleMessage } = useContext(MessageContext)
	const [description, setDescription] = useState()

	function changeDescription(event) {
		setDescription(loc.types_description[event.target.value])
	}

	useEffect(() => {
		setDescription(loc.types_description[document.getElementById('accountType').value])
	}, [loc.types_description])

	return (
		<Form
			header={'Formulário de Conta'}
			commands={
				<DisplayRowStyle>
					<Button
						onClick={() => {
							create(
								'account',
								{
									name: document.getElementById('accountName').value,
									bank: document.getElementById('accountBank').value,
									type: document.getElementById('accountType').value,
								},
								() => {
									setShowForm((sf) => {
										return { ...sf, account: false }
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
						<FontAwesomeIcon icon={faSave} /> {locCommons.save}
					</Button>
				</DisplayRowStyle>
			}
			onClose={() => {
				setShowForm((sf) => {
					return { ...sf, account: false }
				})
			}}
		>
			<div style={{ maxWidth: '472px' }}>
				<DisplayRowStyle>
					<Field id={'accountName'} label={'Nome'} defaultValue={account.name} />
					<Field id={'accountBank'} label={'Banco'} defaultValue={account.bank} />
				</DisplayRowStyle>
				<Field
					id={'accountType'}
					label={'Tipo'}
					type={'select'}
					list={loc.types}
					nullable={false}
					onChange={changeDescription}
					defaultValue={account.type}
				/>
				{description && <Alert alert={description} icon={faInfo} />}
			</div>
		</Form>
	)
}
