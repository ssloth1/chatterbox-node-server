export default function Test(app) {

	app.get('/', (req, res) => {
		res.send('Welcome to Chatterbox!, please use /test to test the server')
	});

	app.get('/test', (req, res) => {
		res.send('Welcome to Chatterbox!')
	});
}