import ModalStyle from './Modal.styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { ConfigContext } from '../hook/Config.context'

export default function Modal({ header, children, width = '600px', height = '400px' }) {
	const { setForm } = useContext(ConfigContext)

	return (
		<ModalStyle width={width} height={height}>
			<div className={'content'}>
				<div className={'header'}>
					<div className={'text'}>{header}</div>
					<div className={'close'}>
						<button onClick={() => setForm(undefined)}>
							<FontAwesomeIcon icon={faPlus} />
						</button>
					</div>
				</div>
				<div className={'text'}>{children}</div>
			</div>
		</ModalStyle>
	)
}
