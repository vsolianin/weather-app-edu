const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather', 
		name: 'Volodymyr Solianin',
		someName: 'VSolianin'
	});
});

app.get('/about', (req, res) => {
	console.log(__dirname, 'dirname');
	res.render('about', {
		title: 'About', 
		name: 'Katy Solianina',
		someName: 'VSolianin'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help', 
		someName: 'VSolianin'
	});
});

 app.get('/weather', (req, res) => {
	
	if (!req.query.address) {
		return res.send({
			error: 'Please type the correct location',
		});
	} else {
		geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

			if (error) {
				console.log(error);
				return res.send({
					error
				});
			}

			forecast(latitude, longitude, (error, { weather_description, temperature, feelslike } = {}) => {

				if (error) {
					return res.send({
						error
					})					
				}
				
				res.send({
					address: req.query.address,	
					location, 
					weather_description,
					temperature,
					feelslike
				});

			});
		});
	}
 });

 app.get('/products', (req, res) => {

	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term!',
		});
	}

	console.log(req.query, 'reqQuery');
	res.send({
		products: [],
	});
 });

 app.get('/help/*', (req, res) => {
	res.render('404', {
		errorMessage: 'The help article not found!',
		someName: 'VSolianin'
	});
 });


 app.get('*', (req, res) => {
	res.render('404', {
		errorMessage: '404 page error!',
		someName: 'VSolianin'
	});
 });

app.listen(port, () => {
	console.log(`Server start listening on port ${port}`);
});