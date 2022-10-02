const socket = io();

const div = document.querySelector('#container-table');
const form = document.querySelector('#container-form');

// form.addEventListener('submit', () => {
// 	form.preventDefault();
// })

// const handlebars = require('handlebars');


async function renderForm(file, obj) {
	try {
		const data = await fetch(`http://localhost:8080/${file}`);
		const parsedData = await data.text();
		template = await Handlebars.compile(parsedData);
		const html = await template(obj);
		console.log(html)
		form.innerHTML = html;
	} catch (error) {
		console.error(error.message);
	}
}

async function render(file, obj, target) {
	// try {
	const data = await fetch(`http://localhost:8080/${file}`);
	const parsedData = await data.text();
	template = await Handlebars.compile(parsedData);
	const html = await template(obj);
	target.innerHTML = html;
	// } catch (error) {
	// console.error(error.message);
	// }
}


render('form.hbs', { title: 'Ingresar nuevo producto' }, form)

form.addEventListener('submit', (e) => {
	const inputName = document.querySelector('#input-name');
	const inputPrice = document.querySelector('#input-price');
	const inputThumbnail = document.querySelector('#input-thumbnail');

	e.preventDefault();
	console.log(e.target)
	const newProduct = {
		title: inputName.value,
		price: inputPrice.value,
		thumbnail: inputThumbnail.value
	}
	socket.emit('new-product', newProduct)
})

socket.on('products', async (products) => {
	await render('products.hbs', { products }, div);
})


// fetch('http://localhost:8080/products.hbs')
// 	.then((data) => data.text())
// 	.then((template) => {
// 		const html = Handlebars.compile(template, { products });
// 		div.innerHtml = html;
// 	})
// const template = Handlebars