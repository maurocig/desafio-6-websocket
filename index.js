const express = require('express');
const path = require('path');
const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io');
const { formatMessage } = require('./utils/utils');
const handlebars = require('express-handlebars');

// const data = './data.json';
const Products = require('./models/Products');

const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);
const PORT = 8080 || process.env.PORT;

// // Handlebars config
// const { engine } = require('express-handlebars');
// app.engine('hbs', engine({
// 	extname: 'hbs',
// 	defaultLayout: 'main.hbs',
// 	layoutsDir: path.resolve(__dirname, './views/layouts'),
// 	partialsDir: path.resolve(__dirname, './views/partials'),
// }))
// app.set('views', './views');
// app.set('view engine', 'hbs');


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

// const products = new Products('data.json');

const products = [
	{
		id: 0,
		title: 'Perro',
		price: 200,
		thumbnail: 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg'
	},
	{
		id: 1,
		title: 'Gato',
		price: 100,
		thumbnail: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg'
	}
]

const messages = [];

// Listen
httpServer.listen(PORT, () => {
	console.log('Server running on port', PORT);
});

// Socket events
io.on('connection', (socket) => {
	console.log('nuevo cliente conectado');
	console.log(socket.id);

	socket.emit('products', [...products]);
	socket.emit('messages', [...messages]);

	socket.on('new-product', (data) => {
		const lastIndex = products.length - 1;
		data.id = lastIndex + 1;
		products.push(data);
		io.emit('products', products);
	})

	socket.on('new-message', (data) => {
		messages.push(data);
		io.emit('messages', messages);
	})
});


// Routes
app.get('/', async (req, res) => {
	res.render('index.html');
});

// app.get('/productos', async (req, res) => {
// 	res.render('index', { mostrarProductos: true, products: await products.getAll() });
// })

// app.get('/productos/:id', async (req, res) => {
// 	const { id } = req.params;
// 	const product = await products.getById(id);
// 	res.render('index', ({ mostrarDetalle: true, product }));
// })

// app.post('/productos', async (req, res) => {
// 	const { title, price, thumbnail } = req.body;
// 	if (!title || !price || !thumbnail) {
// 		req.send('Error: invalid body format');
// 	}
// 	const newProduct = {
// 		title,
// 		price,
// 		thumbnail
// 	};
// 	await products.save(newProduct);
// 	res.redirect('/');
// })

// const connectedServer = app.listen(PORT, () => {
// 	console.log(`Server is up and running on port ${PORT}`);
// })
// connectedServer.on('error', (error) => {
// 	console.log(error);
// })