module.exports = {
	apps: [
		{ name: "shared", script: "yarn shared start" },
		{ name: "shared:types", script: "yarn shared build:types --watch" },
		{ name: "app", script: "yarn app start" }
	]
};
