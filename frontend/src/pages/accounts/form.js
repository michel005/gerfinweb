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
import PageSettings from '../../assets/page.settings'

export default function AccountForm({ account }) {
	const { loc: locCommons } = useLocalization('commons')
	const { loc } = useLocalization('pages.account')
	const { create } = useContext(TableContext)
	const { setShowForm } = useContext(ConfigContext)
	const { errorMessage } = useContext(MessageContext)
	const [description, setDescription] = useState()

	function changeDescription(event) {
		setDescription(loc.types_description[event.target.value])
	}

	useEffect(() => {
		setDescription(loc.types_description[document.getElementById('accountType').value])
	}, [loc.types_description])

	return (
		<Form
			icon={<FontAwesomeIcon icon={PageSettings.account.icon} />}
			header={loc.form_header}
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
									errorMessage({
										header: loc.save_error,
										text: error.response.data[0]
											? error.response.data[0]
											: error.response.data.message.substr(0, 100),
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
					<Field id={'accountName'} label={loc.table.name} defaultValue={account.name} />
					<Field id={'accountBank'} label={loc.table.bank} defaultValue={account.bank} />
				</DisplayRowStyle>
				<Field
					id={'accountType'}
					label={loc.table.type}
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
