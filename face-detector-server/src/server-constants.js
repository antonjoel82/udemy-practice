const PORT = 3000;

const database = {
	users : [
		{
			id: "123",
			name: "Sally",
			email: "a@a.com",
			password: "aaa",
			entries: 0,
			joined: new Date()
		},
		{
			id: "124",
			name: "Jimmy",
			email: "b@b.com",
			password: "bananas",
			entries: 0,
			joined: new Date()
		}
	]
}

module.exports = {
	PORT : PORT,
	database: database
}