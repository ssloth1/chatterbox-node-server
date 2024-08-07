export default function Test(app) {
	app.get('/test', (req, res) => {
		res.send('Welcome to Chatterbox!')
	});
}