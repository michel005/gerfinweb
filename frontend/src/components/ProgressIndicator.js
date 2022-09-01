import ProgressIndicatorStyled from './ProgressIndicator.styled'

export default function ProgressIndicator({ label, value, maximum = 1, formatter }) {
	return (
		<ProgressIndicatorStyled className={value < 0.0 ? 'negative' : ''} value={value} maximum={maximum}>
			<div className={'label'}>{label}</div>
			<div className={'background'}></div>
			<div className={'progresso'}></div>
			<div className={'value'}>
				{((value * 100) / maximum).toFixed(2)}% ({formatter ? formatter(value) : value.toFixed(2)})
			</div>
		</ProgressIndicatorStyled>
	)
}
