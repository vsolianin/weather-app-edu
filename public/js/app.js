window.onload = function() {

  const weatherForm = document.querySelector('form');
  const search = document.querySelector('input');

  const message = document.querySelector('#message-1');


  weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    message.textContent = 'Loading...';

    fetch(`/weather?address=${location}`)
      .then(response => response.json())
      .then(data => {

        if (data.error) {
          message.textContent = data.error;
        } else {
          message.textContent = `In ${data.address} it is ${data.weather_description}. The temperature is ${data.temperature} and feelslike ${data.feelslike}`; 
        }
      });   

  });
}

