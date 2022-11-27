var dataSuccess = document.querySelector("#data-success");
var dataGagal = document.querySelector("#data-gagal");
var myForm = document.getElementById("myform");
var btnSubmit = document.querySelector('#btn-submit');
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
        showDataSuccess(response);
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