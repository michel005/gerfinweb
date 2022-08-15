import {
	faBank,
	faIdCard,
	faCog,
	faDoorOpen,
	faHome,
	faList,
	faTarp,
	faUser,
} from '@fortawesome/free-solid-svg-icons'

const PageSettings = {
	dashboard: {
		text: 'Dashboard',
		lead: 'A quick relation of your finance life',
		path: '/',
		icon: faHome,
	},
	accounts: {
		text: 'Accounts',
		lead: 'See the current balance of all your bank accounts',
		path: '/accounts',
		icon: faBank,
	},
	movements: {
		text: 'Movements',
		lead: 'Register all the movement of your finance life',
		path: '/movements',
		icon: faList,
	},
	templates: {
		text: 'Templates',
		lead: 'Made movements more quickly',
		path: '/templates',
		icon: faIdCard,
	},
	targets: {
		text: 'Targets',
		lead: 'Define how you are gonna complete your targets',
		path: '/targets',
		icon: faTarp,
	},
	settings: {
		text: 'Settings',
		lead: 'Customize your GerFinWEB',
		path: '/settings',
		icon: faCog,
	},
	user: {
		text: 'User',
		lead: 'Modify your full name and the current password',
		path: '/user',
		icon: faUser,
	},
	logout: {
		text: 'Logout',
		lead: '',
		path: '',
		icon: faDoorOpen,
	},
}

export default PageSettings
