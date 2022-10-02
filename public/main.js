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

async function renderProducts(file, obj, target) {
	// try {
	const data = await fetch(`http://localhost:8080/${file}`);
	const parsedData = await data.text();
	template = await Handlebars.compile(parsedData);
	const html = await template(obj);
	console.log(html)
	target.innerHTML = html;
	// } catch (error) {
	// console.error(error.message);
	// }
}



socket.on('products', async (products) => {
	// render('products.hbs', { data: products })
	renderForm('form.hbs', { title: 'Ingresar nuevo producto', form })
	await renderProducts('products.hbs', { products: products }, div)
})

// fetch('http://localhost:8080/products.hbs')
// 	.then((data) => data.text())
// 	.then((template) => {
// 		const html = Handlebars.compile(template, { products });
// 		div.innerHtml = html;
// 	})
// const template = Handlebars