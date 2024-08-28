const timeElement = document.querySelector(".time");
const textElement = document.createElement("h1");
timeElement.appendChild(textElement);
function time() {
  var d = new Date();
  var s = d.getSeconds();
  var m = d.getMinutes();
  var h = d.getHours();
  let datetime =
    ("0" + h).substr(-2) +
    ":" +
    ("0" + m).substr(-2) +
    ":" +
    ("0" + s).substr(-2);
  textElement.textContent = datetime;
}
setInterval(time, 1000);
const alamat = document.querySelector(".location");
const getLocationAndFetchData = async () => {
  try {
    // Menggunakan Geolocation API untuk mendapatkan posisi pengguna
    const location = await new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            resolve({ latitude, longitude });
          },
          (error) => {
            reject(new Error("Geolocation failed: " + error.message));
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });

    const { latitude, longitude } = location;

    // Menggunakan Nominatim OpenStreetMap API untuk mencari lokasi berdasarkan latitude dan longitude
    await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    )
      .then((res) => res.json())
      .then((Data) => {
        let kota = Data.address.city;
        let negara = Data.address.country;
        alamat.innerHTML = `${kota} , ${negara}`;
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.error("Ada masalah dengan permintaan geolokasi:", error);
  }
};

// Memanggil fungsi untuk mendapatkan lokasi dan melakukan pencarian data
getLocationAndFetchData();
