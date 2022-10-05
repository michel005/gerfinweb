import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { ConfigContext } from '../hook/Config.context'
import Button from './Button'
import DataBasePickerStyle from './DataBasePicker.style'

export default function DataBasePicker({ reduced }) {
	const { formatedForUX, nextMonth, previewMonth } = useContext(ConfigContext)

	return (
		<DataBasePickerStyle reduced={reduced}>
			<div>
				<button onClick={previewMonth} className="transparent" title={'CTRL + Esquerda'}>
					<FontAwesomeIcon icon={faChevronLeft} title={'CTRL + Esquerda'} />
				</button>
			</div>
			<div className="label">{formatedForUX()}</div>
			<div>
				<button onClick={nextMonth} className="transparent" title={'CTRL + Direita'}>
					<FontAwesomeIcon icon={faChevronRight} title={'CTRL + Direita'} />
				</button>
			</div>
		</DataBasePickerStyle>
	)
}
