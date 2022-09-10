import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect } from 'react'
import { ConfigContext } from '../hook/Config.context'
import Button from './Button'
import DataBasePickerStyle from './DataBasePicker.style'

export default function DataBasePicker({ reduced }) {
	const { formatedForUX, nextMonth, previewMonth } = useContext(ConfigContext)

	useEffect(() => {
		const close = (e) => {
			if (e.ctrlKey === true) {
				if (e.key === 'ArrowLeft') {
					previewMonth()
				} else if (e.key === 'ArrowRight') {
					nextMonth()
				}
			}
		}
		window.addEventListener('keydown', close)
		return () => window.removeEventListener('keydown', close)
	}, [])

	return (
		<DataBasePickerStyle reduced={reduced}>
			<div>
				<Button onClick={previewMonth} className="transparent" title={'CTRL + Esquerda'}>
					<FontAwesomeIcon icon={faArrowLeft} />
				</Button>
			</div>
			<div className="label">{formatedForUX()}</div>
			<div>
				<Button onClick={nextMonth} className="transparent" title={'CTRL + Direita'}>
					<FontAwesomeIcon icon={faArrowRight} />
				</Button>
			</div>
		</DataBasePickerStyle>
	)
}
