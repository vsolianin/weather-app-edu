
const request = require('request');

const forecast = (latitude, longitude, callback) => {

	const url = `http://api.weatherstack.com/current?access_key=6c20d995a1e2bf5f1054a1fdc6506dca&query=${latitude},${longitude}`;
	
	request({ url, json: true }, (error, { body } = {}) => {

		if (error) {
			callback('Unable to connect the weather service!', undefined);
		} else if (body.error) {
			callback('Unable to find location!', undefined);
		} else {
			callback(null, {
				weather_description: body.current.weather_descriptions[0],
				temperature: body.current.temperature,
				feelslike: body.current.feelslike
			});
		}		
	});
};

module.exports = forecast;