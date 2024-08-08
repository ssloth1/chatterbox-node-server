export default function Test(app) {

	app.get('/', (req, res) => {
		console.log('Received request at /');
		res.send('Welcome to Chatterbox!, please use /test to test the server')
	});

	app.get('/test', (req, res) => {
		console.log('Received request at /test');
		res.send('Welcome to Chatterbox!');
	});
}