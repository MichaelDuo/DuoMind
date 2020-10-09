type Commands = {[key: string]: (data: any) => any};

class CommandService {
	commands: Commands;
	delegate: CommandService | null = null;

	constructor(commands?: Commands) {
		this.commands = commands || {};
	}

	updateCommands(commands: Commands) {
		this.commands = commands;
	}

	exec(command: string, data?: any) {
		if (!this.delegate || this.delegate.exec(command, data)) {
			if (this.commands[command]) {
				return this.commands[command](data) === true;
			} else {
				return true; // bubble up
			}
		}
	}

	setDelegate(delegate: CommandService | null) {
		this.delegate = delegate;
	}

	clearDelegate() {
		this.delegate = null;
	}
}

export default CommandService;
