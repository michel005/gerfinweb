import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ConfigProvider from './hook/Config.context'
import MessageProvider from './hook/Message.context'
import PageProvider from './hook/Page.context'
import UserProvider from './hook/User.context'
import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<MessageProvider>
			<UserProvider>
				<ConfigProvider>
					<PageProvider>
						<App />
					</PageProvider>
				</ConfigProvider>
			</UserProvider>
		</MessageProvider>
	</React.StrictMode>
)

