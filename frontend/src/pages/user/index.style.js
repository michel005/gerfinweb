import styled from 'styled-components'

const UserStyle = styled.div`
	display: flex;
	flex-direction: column;

	.field {
		margin-top: 14px;
	}

	.group {
		margin-right: 14px;
	}

	.profilePictureGroup {
		.group {
			text-align: center;

			.title {
				text-align: left;
			}

			.profile {
				display: flex;
				flex-direction: row;
				width: 100%;
				transition: all 0.25s;
				height: 144px;
			}

			.iconTransferContainer {
				display: flex;
				flex-direction: column;
				justify-content: center;
				margin: 0 -10px;

				.iconTransfer {
					padding: 21px;
				}
			}

			.profPic {
				width: 100%;

				.deleteImageButtonContainer {
					display: flex;
					flex-direction: row;
					justify-content: center;
					margin-top: -96px;

					.deleteImageButton {
						cursor: pointer;
						background-color: #3339;
						backdrop-filter: blur(10px);
						border-radius: 80px;
						display: flex;
						flex-direction: column;
						justify-content: center;
						padding: 14px;
						width: 50px;
						height: 50px;
						overflow: hidden;
						transition: all 0.25s;
						opacity: 0;
						pointer-events: none;

						svg {
							color: #fff;
						}
					}
				}

				&:hover {
					.deleteImageButton {
						opacity: 1;
						pointer-events: auto;
					}
				}

				.profilePicture {
					background-color: #333;
					box-shadow: #666 0 0 7px;
					border-radius: 100px;
					display: flex;
					flex-direction: column;
					justify-content: center;
					color: #fff;
					width: 144px;
					height: 144px;
					overflow: hidden;
					margin: 0 auto;
					transition: all 0.25s;
				}

				img {
					transition: all 0.25s;
				}
			}
		}
	}

	.verticalGroup {
		margin-bottom: 14px;
	}

	.horizontalGroup {
		display: flex;
		flex-direction: row;
	}

	.passwordAlert {
		margin-top: 14px;
		margin-bottom: 0px;
		max-width: 400px;
	}

	.commands {
		display: flex;
		flex-direction: row;
		margin-top: 14px;

		button {
			margin-right: 14px;

			&:last-child {
				margin-right: 0;
			}
		}

		.alert {
			color: #ccc;
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
	}

	@media only screen and (max-width: 1000px) {
		.horizontalGroup {
			display: flex;
			flex-direction: column;
		}
	}
`

export default UserStyle
