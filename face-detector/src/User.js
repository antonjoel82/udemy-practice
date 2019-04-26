class User {
	constructor(id, name, email, entries, joined) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.entries = entries;
		this.joined = joined;
	}

	prettyString() {
		return `${this.name}, your current score is...`;
	}

	setEntries(entries) {
		this.entries = entries;
		return this;
	}
}

const fromDbUser = (user) => {
	return new User(user.id, user.name, user.email, user.entries, user.joined);
}

export {User, fromDbUser}