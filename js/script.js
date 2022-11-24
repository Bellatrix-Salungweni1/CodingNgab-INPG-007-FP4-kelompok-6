const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'df3290403emsh34ec8f658bae599p14a18bjsn0f4c1f835c51',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'}};

      var myForm = document.getElementById('myform')
      myForm.addEventListener('submit', function(event){
        event.preventDefault()
      var inputNegara = document.querySelector('#inputnegara').value
      var inputTanggal = document.querySelector('#inputtanggal').value
      fetch(`https://weatherapi-com.p.rapidapi.com/history.json?q=${inputNegara}&dt=${inputTanggal}`, options)	        
      .then(res => res.json())
      .then((response) =>{
            document.querySelector('#Negara').innerHTML = response.location.name
            document.querySelector('#tanggal').innerHTML = response.forecast.forecastday[0].date
            document.querySelector('#condition').innerHTML = response.forecast.forecastday[0].hour[23].condition.text
            document.querySelector('#temprature').innerHTML = response.forecast.forecastday[0].hour[23].temp_c

      })
    .catch(err => console.error(err));
      })