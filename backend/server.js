// Import des packages
const http = require('http');
const app = require('./app');

// Port par défaut ou port 3000
const PORT = process.env.PORT || 3000;

app.set('port', PORT);

// Création du serveur 
const server = http.createServer(app);

server.listen(PORT, (error) => {
	if (error) {
		console.log(error);
	} else {
		console.log('Server is listening on port ' + PORT);
	}
});