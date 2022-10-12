import styled from 'styled-components'

const UserStyle = styled.div`
	display: flex;
	flex-direction: row;
	gap: 14px;

	.group {
		& > .groupContent {
			gap: 14px;

			& > .profile {
				display: flex;
				flex-direction: row;
				justify-content: center;
				padding: 14px 0;
				width: 100%;
				transition: all 0.25s;

				& > .iconTransferContainer {
					display: flex;
					flex-direction: column;
					justify-content: center;
					width: 100%;

					& > .iconTransfer {
						display: flex;
						flex-direction: column;
						justify-content: center;
						padding: 14px;
					}
				}

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
						object-fit: cover;
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
		}
	}

	.passwordAlert {
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
	}
`

export default UserStyle
