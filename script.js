const startFetchDataBtn = document.getElementById("startFetchDataBtn")

startFetchDataBtn.addEventListener('click',fetchRentCarsDataAsyncAwait);
const rentCarsList = document.getElementById("rentCarsList");
// mendapatkan div dengan id pageInputSection
const pageInputSection = document.getElementById("pageInputSection")
const currentPageInput = document.getElementById("currentPageInput")

let rentedCarsData = [];
// penyimpanan data yang akan ditampilkan
let displayedCarsData = [];

// ukuran halaman yang ditampilkan
const pageSize = 10

// total jumlah halaman yang tersedia
let pageCount = 0

function fetchRentCarsData() {
    fetch('https://bootcamp-rent-car.herokuapp.com/admin/car').
    then(result => result.json()).
    then((result) => {
        rentedCarsData = result
    }).
    catch(err => console.error(err));
}

async function fetchRentCarsDataAsyncAwait() {
    try {
        pageInputSection.setAttribute('class', 'doNotDisplay')
        let result = await fetch('https://bootcamp-rent-car.herokuapp.com/admin/car')
        let rentCars = await result.json()
        rentedCarsData = rentCars 

        pageCount = Math.floor(rentedCarsData.length / pageSize)
        const remainder = (rentedCarsData.length % pageSize) > 0 ? 1 : 0
        pageCount += remainder

        getCarsPage(1)
        pageInputSection.removeAttribute('class')

    }
    catch(err) {
        console.error(err)
    }
}

function clearRentCarList() {
    while (rentCarsList.firstChild) {
        rentCarsList.firstChild.remove()
    }
}

function getCarsPage(currentPage) {
    if(currentPage > pageCount || rentedCarsData.length == 0) {
        return;
    }
    // mulai mengambil dari array
    const start = (currentPage - 1) * pageSize
    // akhir index ambil array: start + besaran halaman
    const end = start + pageSize

    // ambil data dari array
    displayedCarsData = rentedCarsData.slice(start, end)

    // kosongkan list rentCarsList
    clearRentCarList()

    // mulai menambahkan item mobil kedalam rentCarsList
    displayedCarsData.forEach((car) => {
        // masukkan item card mobil ke rentCarsList 
        // agar dapat ditampilkan
        rentCarsList.append(createdCarCard(car))
    })
    
}

// menambahkan event listener ketika teks dimasukkan dan ditekan enter
// dengan callback berisi pengubahan halaman yang ditampilkan
currentPageInput.addEventListener("change", (event) => {
    // ubah string jadi angka
    const desiredPage = parseInt(event.target.value)

    // jika hasilnya bukan angka dikarenakan input invalid,
    // maka kita tidak akan proses menampilkan halaman yang di inginkan
    if (isNaN(desiredPage)) {
        return;
    }

    // tampilkan halaman yang di inginkan
    getCarsPage(desiredPage)
})


function createdCarCard(car) {

    const carCard = document.createElement('div')
        carCard.setAttribute('class', 'carCard')

        const carImage = document.createElement('img')
        carImage.setAttribute('class', 'carImage')
        carImage.setAttribute('src', car.image)

        const carName = document.createElement('p')
        carName.setAttribute('class', 'carName')
        carName.innerText = car.name

        const carPrice = document.createElement('p')
        carPrice.setAttribute('class', 'carPrice')
        carPrice.innerText = car.price

        carCard.append(carImage)
        carCard.append(carName)
        carCard.append(carPrice)

        return carCard
}