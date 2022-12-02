var dataSuccess = document.querySelector("#data-success");
var dataGagal = document.querySelector("#data-gagal");
var myForm = document.getElementById("myform");
var btnSubmit = document.querySelector('#btn-submit');
var btnClose = document.querySelector('#closeBtn')
const chart = document.querySelector('.chart');
const dtNow = document.querySelector('#data1')
const chart1 = document.querySelector('#chart1');
const chart2 = document.querySelector('#chart2');
const chart3 = document.querySelector('#chart3');
const chart4 = document.querySelector('#chart4');

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "df3290403emsh34ec8f658bae599p14a18bjsn0f4c1f835c51",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};

addZero = function(num){
  return ('0'+num).slice(-2);
 }

const past7Days = [...Array(7).keys()].map(index => {
  const date = new Date();
  date.setDate(date.getDate() - index);
 const day = date.getFullYear() + '-' +addZero(date.getMonth()+1) + '-' + addZero(date.getDate());
 return day;
});

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
        btnClose.scrollIntoView()

      })
    .catch((err) => {
      const er = past7Days.includes(inputTanggal)
      if (er === false){
        Swal.fire({
          icon: "warning",
          title: "Attention",
          text: "Please enter the date within the last 7 days!!",
        });
        return false;
      }
      else{
        Swal.fire({
          icon: "warning",
          title: "Attention",
          text: "The country/city you are looking for was not found!!",
        });
        return false;
      }
    });
  }
});

function showDataSuccess(response) {
  document.querySelector("#Negara").innerHTML = response.location.name;
  document.querySelector("#tanggal").innerHTML = response.forecast.forecastday[0].date;
  document.querySelector("#condition").innerHTML = response.forecast.forecastday[0].hour[23].condition.text;
  var icon = 'https:'+ response.forecast.forecastday[0].hour[23].condition.icon;
  document.querySelector('#icon').src = icon
  dataGagal.classList.add("display-none");
  dataSuccess.classList.remove("display-none");
  chart.style.display = 'block'
  btnClose.style.display = 'block'
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
        chartKelembapan.data.labels = time;
        chartkecepatanAngin.data.labels = time;
        chartTekanan.data.labels = time;
        chartSuhu.data.datasets[0].data = suhu;
        chartKelembapan.data.datasets[0].data = kelembapan;
        chartkecepatanAngin.data.datasets[0].data = kecepatanAngin;
        chartTekanan.data.datasets[0].data = tekanan;
        chartSuhu.update()
        chartKelembapan.update()
        chartkecepatanAngin.update()
        chartTekanan.update()
}

document.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
      btnSubmit.click()
  }
});

const btn = document.querySelector("#btn-submit");
const btn1 = document.querySelector("#btn-submit1");

btn.addEventListener("click", fetchHandler);
btn1.addEventListener("click", fetchHandler);

btnClose.addEventListener('click', function() {
    chart.style.display = 'none'
    dtNow.style.display = 'none'
    btnClose.style.display = 'none'
});

var timeNow = new Date().getHours();

function getData(){
  var inputNegara1 = document.querySelector("#inputnegara").value;
  var inputTanggal1 = document.querySelector("#inputtanggal").value;
  const er1 = past7Days.includes(inputTanggal1)
  if(inputNegara1 == "" || inputTanggal1 == ""){
    Swal.fire({
      icon: "warning",
      title: "Perhatian",
      text: "Harap mengisi Nama kota dan tanggalnya dulu!!",
    });
    return false;
  }else if(er1 === false){
    Swal.fire({
      icon: "warning",
      title: "Attention",
      text: "Please enter the date within the last 7 days!!",
    });
  }
  else{
  fetch(
    `https://weatherapi-com.p.rapidapi.com/history.json?q=${inputNegara1}&dt=${inputTanggal1}`,options)
    .then((res) => res.json())
    .then((response) => {
      hideLoading()
      dtNow.style.display = 'block';
        var icon1 = 'https:'+ response.forecast.forecastday[0].hour[timeNow].condition.icon;
        document.querySelector('#icon1').src = icon1
        document.querySelector(".condition1").innerHTML = response.forecast.forecastday[0].hour[timeNow].condition.text;    
        document.querySelector(".kota1").innerHTML = response.location.name;  
        document.querySelector(".tm").innerHTML = response.forecast.forecastday[0].hour[timeNow].time;  
        document.querySelector(".temp1").innerHTML = response.forecast.forecastday[0].hour[timeNow].temp_c;  
        document.querySelector(".hum1").innerHTML = response.forecast.forecastday[0].hour[timeNow].humidity;  
        document.querySelector(".wind").innerHTML = response.forecast.forecastday[0].hour[timeNow].wind_kph;  
        document.querySelector(".pres").innerHTML = response.forecast.forecastday[0].hour[timeNow].pressure_mb;  
        document.querySelector(".rain").innerHTML = response.forecast.forecastday[0].hour[timeNow].chance_of_rain; 
    })
    .catch((err) => {
        Swal.fire({
          icon: "warning",
          title: "Attention",
          text: "The country/city you are looking for was not found!!",
        });
        return false;
    });
  }
}

const loader = document.querySelector("#loading");
const loader2 = document.querySelector("#loadbackground");

function displayLoading() {
    loader.classList.add("display");
    loader2.classList.add("display");
    setTimeout(() => {
      loader.classList.remove("display");
      loader2.classList.remove("display");
  }, 2000);
}

function hideLoading() {
    loader.classList.remove("display");
    loader2.classList.remove("display");
}

function fetchHandler(event) {
    displayLoading()
}

const chartSuhu = new Chart(chart1, {
  type: 'line',
  data: {
    labels: [''],
    datasets: [{
      label: 'Temprature(Celsius)',
      data: [''],
      borderColor: 'rgb(75, 192, 192)',
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

const chartKelembapan = new Chart(chart2, {
  type: 'line',
  data: {
    labels: [''],
    datasets: [{
      label: 'Humidity(%)',
      data: [''],
      borderColor: 'rgb(255, 0, 0)',
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

const chartkecepatanAngin = new Chart(chart3, {
type: 'line',
data: {
  labels: [''],
  datasets: [{
    label: 'Wind(Kph)',
    data: [''],
    borderColor: 'rgb(98, 0, 255)',
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

const chartTekanan = new Chart(chart4, {
type: 'line',
data: {
  labels: [''],
  datasets: [{
    label: 'Pressure(Millibar)',
    data: [''],
    borderColor: 'rgb(238, 255, 0)',
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


