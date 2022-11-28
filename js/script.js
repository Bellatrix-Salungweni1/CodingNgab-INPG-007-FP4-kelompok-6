var dataSuccess = document.querySelector("#data-success");
var dataGagal = document.querySelector("#data-gagal");
var myForm = document.getElementById("myform");
var btnSubmit = document.querySelector('#btn-submit');
const chart = document.querySelector('#chart');
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "df3290403emsh34ec8f658bae599p14a18bjsn0f4c1f835c51",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};

myForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var inputNegara = document.querySelector("#inputnegara").value;
  var inputTanggal = document.querySelector("#inputtanggal").value;
  if (inputNegara == "" || inputTanggal == "") {
    Swal.fire({
      icon: "warning",
      title: "Perhatian",
      text: "Harap mengisi Nama kota dan tanggalnya dulu!!",
    });
    return false;
  } else {

    fetch(
      `https://weatherapi-com.p.rapidapi.com/history.json?q=${inputNegara}&dt=${inputTanggal}`,options)
      .then((res) => res.json())
      .then((response) => {
        hideLoading()
        showDataSuccess(response);
        const time = response.forecast.forecastday[0].hour.map(
          function(index){
              return index.time
          })
      const suhu = response.forecast.forecastday[0].hour.map(
          function(index){
              return index.temp_c
          })
      const kelembapan = response.forecast.forecastday[0].hour.map(
            function(index){
                return index.humidity
            })
      const kecepatanAngin = response.forecast.forecastday[0].hour.map(
            function(index){
                return index.wind_kph
            })
      const tekanan = response.forecast.forecastday[0].hour.map(
            function(index){
                return index.pressure_mb
            })
      
          chartSuhu.data.labels = time;
          chartSuhu.data.datasets[0].data = suhu;
          chartSuhu.data.datasets[1].data = kelembapan;
          chartSuhu.data.datasets[2].data = kecepatanAngin;
          chartSuhu.data.datasets[3].data = tekanan;
          chartSuhu.update()  
      })
      .catch((err) => {
        showDataGagal();
      });
  }
});

function showDataSuccess(response) {
  document.querySelector("#Negara").innerHTML = response.location.name;
  document.querySelector("#tanggal").innerHTML =
    response.forecast.forecastday[0].date;
  document.querySelector("#condition").innerHTML =
    response.forecast.forecastday[0].hour[23].condition.text;
  document.querySelector("#temprature").innerHTML =
    response.forecast.forecastday[0].hour[23].temp_c;

  dataGagal.classList.add("display-none");
  dataSuccess.classList.remove("display-none");
}

function showDataGagal() {
  dataSuccess.classList.add("display-none");
  dataGagal.classList.remove("display-none");
}

document.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
      btnSubmit.click()
  }
});

const btn = document.querySelector("#btn-submit");

btn.addEventListener("click", fetchHandler);

const loader = document.querySelector("#loading");

const loader2 = document.querySelector("#loadbackground");

function displayLoading() {
    loader.classList.add("display");
    loader2.classList.add("display");
    setTimeout(() => {
      loader.classList.remove("display");
      loader2.classList.remove("display");
  }, 3000);
}

function hideLoading() {
    loader.classList.remove("display");
    loader2.classList.remove("display");
}

function fetchHandler(event) {
    displayLoading()
}
const chartSuhu = new Chart(chart, {
  type: 'line',
  data: {
    labels: [''],
    datasets: [{
      label: 'suhu(Celsius)',
      data: [''],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
      borderWidth: 2
    },
    {
      label: 'kelembapan(%)',
      data: [''],
      borderColor: 'rgb(173, 21, 21)',
      tension: 0.1,
      borderWidth: 2
    },
    {
      label: 'Kecepatan Angin(Km/h)',
      data: [''],
      borderColor: 'rgb(64, 255, 0)',
      tension: 0.1,
      borderWidth: 2
    },
    {
      label: 'Tekanan(Milibar)',
      data: [''],
      borderColor: 'rgb(0, 4, 255)',
      tension: 0.1,
      borderWidth: 2
    }]
  },
  options: {
    scales: {
      y: {
          beginformzero: true
      }
    }
  }
});

