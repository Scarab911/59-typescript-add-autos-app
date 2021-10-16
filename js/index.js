"use strict";
var _a;
const UI = {
    modelInput: document.getElementById('model'),
    dateInput: document.getElementById('date'),
    colorInput: document.getElementById('color'),
    fuelInput: document.getElementById('fuel'),
    addButton: document.getElementById('btn_add'),
    tableRow: document.querySelector('.table-row'),
};
//apsirasom galimus kuro variantus
var FuelType;
(function (FuelType) {
    FuelType["Benzinas"] = "benzinas";
    FuelType["Dyzelinas"] = "dyzelinas";
    FuelType["Elektra"] = "elektra";
})(FuelType || (FuelType = {}));
class CarPark {
    //ad cars to list
    addCar(car) {
        autosList.push(car);
    }
    whatIsThisFuel(fuel) {
        let thisFuel = FuelType.Benzinas;
        if (fuel === 'Benzinas') {
            thisFuel = FuelType.Benzinas;
        }
        if (fuel === 'Dyzelinas') {
            thisFuel = FuelType.Dyzelinas;
        }
        if (fuel === 'Elektra') {
            thisFuel = FuelType.Elektra;
        }
        return thisFuel;
    }
}
//sukuriam automibiliu objekta
class Car {
    constructor(model, date, color, fuel) {
        this.model = model,
            this.date = date,
            this.color = color,
            this.fuel = fuel;
    }
    printCarToHTML(element) {
        const stringyfiedDate = JSON.stringify(this.date);
        const apkarpytas = stringyfiedDate.substring(1, stringyfiedDate.length - 1);
        const formatedDate = formatDate(apkarpytas);
        let HTML = '';
        HTML += `<tr class="table-row">
                        <td data-label="Modelis">${this.model}</td>
                        <td data-label="Pagaminimo data">${formatedDate}</td>
                        <td data-label="Spalva">${this.color}</td>
                        <td data-label="Kuro tipas">${this.fuel}</td>
                        <td><img src="./img/edit.png" alt="edit"></td>
                        <td><img src="./img/delet.png" alt="delete"></td>
                    </tr>`;
        element.insertAdjacentHTML('afterend', HTML);
    }
}
/*HELPERS FUNCTIONS*/
function formatDate(date) {
    const d = new Date(date);
    const dformat = [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-');
    return dformat;
}
function renderHTML(element) {
    for (const car of autosList) {
        car.printCarToHTML(element);
    }
}
/*EXECUTION BELOW*/
// sukuriam nauja auto parka
const srotas = new CarPark;
const autosList = [];
//uzdedam eventa formos ivedimo mygtukui
(_a = UI.addButton) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    const model = UI.modelInput.value;
    const date = UI.dateInput.value;
    const color = UI.colorInput.value;
    const fuel = UI.fuelInput.value;
    //susirandam kuro tipa arba panaudojam castinima as KuroTipas
    const thisFuel = srotas.whatIsThisFuel(fuel);
    //pridedam automobili i list
    const car = new Car(model, new Date(date), color, thisFuel);
    srotas.addCar(car);
    //ipiesiam nauja auto i HTML lentele
    car.printCarToHTML(UI.tableRow);
    //ikeliam sukurtus auto i LOCAL Storage:
    saveCar();
});
function saveCar() {
    const carsString = JSON.stringify(autosList);
    window.localStorage.setItem('CARS_LOCAL_STORAGE_KEY', carsString);
}
