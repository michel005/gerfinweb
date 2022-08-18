import {
	faBank,
	faCog,
	faHome,
	faIdCard,
	faList,
	faTarp,
	faUser,
} from '@fortawesome/free-solid-svg-icons'

const PageSettings = {
	dashboard: {
		name: 'dashboard',
		path: '/',
		icon: faHome,
	},
	account: {
		name: 'account',
		path: '/account',
		icon: faBank,
	},
	movement: {
		name: 'movement',
		path: '/movement',
		icon: faList,
	},
	template: {
		name: 'template',
		path: '/templates',
		icon: faIdCard,
	},
	target: {
		name: 'target',
		path: '/targets',
		icon: faTarp,
	},
	settings: {
		name: 'settings',
		path: '/settings',
		icon: faCog,
	},
	user: {
		name: 'user',
		path: '/user',
		icon: faUser,
	},
}

export default PageSettings
