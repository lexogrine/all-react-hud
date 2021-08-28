import React from 'react';
import { Layout } from './HUD/Layout/Layout';
import { port, isDev } from './api/api';
import ActionManager, { ConfigManager } from './api/actionManager';
import io from "socket.io-client";
const socket = io(isDev ? `localhost:${port}` : '/');
export { socket };

socket.on("update", (data: any) => {
	console.log(data);
})

export const actions = new ActionManager();
export const configs = new ConfigManager();

export const hudIdentity = {
	name: '',
	isDev: false
};


class App extends React.Component<{}, { show: boolean }> {
	constructor(props: {}) {
		super(props);
		this.state = {
			show: true
		}
	}


	componentDidMount() {
		const href = window.location.href;
		socket.emit("started");
		let isDev = false;
		let name = '';
		if (href.indexOf('/huds/') === -1) {
			isDev = true;
			name = (Math.random() * 1000 + 1).toString(36).replace(/[^a-z]+/g, '').substr(0, 15);
			hudIdentity.isDev = true;
		} else {
			const segment = href.substr(href.indexOf('/huds/') + 6);
			name = segment.substr(0, segment.lastIndexOf('/'));
			hudIdentity.name = name;
		}

		socket.on("readyToRegister", () => {
			socket.emit("register", name, isDev, 'all');
		});
		socket.on(`hud_config`, (data: any) => {
			configs.save(data);
		});
		socket.on(`hud_action`, (data: any) => {
			actions.execute(data.action, data.data);
		});
		socket.on('keybindAction', (action: string) => {
			actions.execute(action);
		});

		socket.on("refreshHUD", () => {
			window.top.location.reload();
		});

		actions.on("toggleVisibility", () => {
			this.setState({ show: !this.state.show });
		});
	}

	render() {
		return (
			<Layout show={this.state.show} />
		);
	}

}
export default App;
