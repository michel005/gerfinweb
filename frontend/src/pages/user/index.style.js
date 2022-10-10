import styled from 'styled-components'

const UserStyle = styled.div`
	display: flex;
	flex-direction: row;

	.field {
		margin-top: 14px;
	}

	.group {
		margin-right: 14px;
	}

	.group {
		.profile {
			display: flex;
			flex-direction: row;
			justify-content: center;
			padding: 14px 0;
			width: 100%;
			transition: all 0.25s;

			& > .profPic {
				display: flex;
				flex-direction: row;
				height: 120px;

				&.disabled {
					opacity: 0.4;
					pointer-events: none;
				}

				& > .deleteImageButtonContainer {
					display: flex;
					flex-direction: column;
					justify-content: center;
					height: 120px;
					width: 120px;
					margin-right: -120px;
					z-index: 100;

					& > .innerButtonContainer {
						display: flex;
						flex-direction: row;
						justify-content: center;

						& > .button {
							background-color: #3339;
							opacity: 0;
							transition: all 0.25s;
							font-size: 36px;
							height: 120px;
							width: 120px;
						}
					}
				}

				& > img {
					background-color: #3f96ae;
					border-radius: 10px !important;
					box-shadow: #666 0 0 7px;
					transition: all 0.25s;
					height: 120px;
					width: 120px;
				}

				&:hover {
					.deleteImageButtonContainer {
						.innerButtonContainer {
							.button {
								opacity: 1;
							}
						}
					}
				}
			}
		}

		.iconTransferContainer {
			display: flex;
			flex-direction: column;
			justify-content: center;
			width: 100%;

			.iconTransfer {
				padding: 14px;
			}
		}
	}

	.passwordAlert {
		margin-top: 14px;
		margin-bottom: 0;
		max-width: 400px;
	}

	.passwordWarning {
		color: #ccc;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	@media only screen and (max-width: 700px) {
		display: flex;
		flex-direction: column;

		.group {
			margin-right: 0;
			margin-bottom: 14px;
		}
	}
`

export default UserStyle
