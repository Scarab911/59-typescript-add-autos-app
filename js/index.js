"use strict";
var _a, _b;
const UI = {
    modelInput: document.getElementById('model'),
    dateInput: document.getElementById('date'),
    colorInput: document.getElementById('color'),
    fuelInput: document.getElementById('fuel'),
    addButton: document.getElementById('btn_add'),
    editButton: document.getElementById('editPick'),
    deleteButton: document.getElementById('deletePick'),
    updateButton: document.getElementById('update-btn'),
    tableBody: document.getElementById('table-body'),
    updateForm: document.getElementById('update-form'),
    addForm: document.getElementById('add-form')
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
        if (fuel === '0') {
            thisFuel = FuelType.Benzinas;
        }
        if (fuel === '1') {
            thisFuel = FuelType.Dyzelinas;
        }
        if (fuel === '2') {
            thisFuel = FuelType.Elektra;
        }
        return thisFuel;
    }
}
//sukuriam automibiliu objekta
class Car {
    constructor(model, date, color, fuel, id) {
        this.model = model,
            this.date = date,
            this.color = color,
            this.fuel = fuel,
            this._id = id;
    }
    get id() {
        return this._id;
    }
    printCarToHTML(element) {
        //formatuojam data
        const stringyfiedDate = JSON.stringify(this.date);
        const apkarpytas = stringyfiedDate.substring(1, stringyfiedDate.length - 1);
        const formatedDate = formatDate(apkarpytas);
        if (element) {
            element.innerHTML += `<tr class="table-row">
                            <td data-label="Modelis">${this.model}</td>
                            <td data-label="Pagaminimo data">${formatedDate}</td>
                            <td data-label="Spalva">${this.color}</td>
                            <td data-label="Kuro tipas">${this.fuel}</td>
                            <td><img src="./img/edit.png" alt="edit" id="editPick" onClick="toggleForms(${this._id})"></td>
                            <td><img src="./img/delet.png" alt="delete" id="deletePick" onClick="deleteEntry(${this._id})"></td>
                        </tr>`;
        }
    }
}
/*HELPER FUNCTIONS*/
//formats date
function formatDate(date) {
    const d = new Date(date);
    const dformat = [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-');
    return dformat;
}
//render HTML from Array of objects
function renderEntries(element) {
    element.innerHTML = '';
    for (const car of autosList) {
        car.printCarToHTML(element);
    }
}
//Saves info into LocalStorage
const CARS_LOCAL_STORAGE_KEY = 'Cars';
function saveCarToLocalStorage() {
    const carsString = JSON.stringify(autosList);
    window.localStorage.setItem(CARS_LOCAL_STORAGE_KEY, carsString);
}
//togles between two forms:
function toggleForms() {
    var _a, _b;
    (_a = UI.addForm) === null || _a === void 0 ? void 0 : _a.classList.toggle('show');
    (_b = UI.updateForm) === null || _b === void 0 ? void 0 : _b.classList.toggle('show');
}
//remove entry from table
function deleteEntry(id) {
    autosList = autosList.filter((car) => car._id !== id);
    renderEntries(UI.tableBody);
    saveCarToLocalStorage();
}
//uzkrauna sarasa is Local Storage
function loadTableEntries() {
    const localCarsList = window.localStorage.getItem(CARS_LOCAL_STORAGE_KEY);
    if (!localCarsList)
        return;
    const parsedCarsList = JSON.parse(localCarsList);
    console.log('istraukiam is local storage');
    console.log(localCarsList);
    console.log(parsedCarsList);
    id = 0;
    for (const car of parsedCarsList) {
        const newCar = new Car(car.model, new Date(car.date), car.color, car.fuel, ++id);
        autosList.push(newCar);
    }
    console.log(autosList);
    renderEntries(UI.tableBody);
}
/*EXECUTION BELOW*/
// sukuriam nauja auto parka
const srotas = new CarPark;
let autosList = [];
let id = 0;
//uzdedam eventa formos ivedimo mygtukui
(_a = UI.addButton) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    const model = UI.modelInput.value;
    const date = UI.dateInput.value;
    const color = UI.colorInput.value;
    const fuel = UI.fuelInput.value;
    //susirandam kuro tipa arba panaudojam castinima as KuroTipas
    const thisFuel = srotas.whatIsThisFuel(fuel);
    //pridedam automobili i list
    const car = new Car(model, new Date(date), color, thisFuel, ++id);
    srotas.addCar(car);
    console.log(autosList);
    //ipiesiam nauja auto i HTML lentele
    renderEntries(UI.tableBody);
    //ikeliam sukurtus auto i LOCAL Storage:
    saveCarToLocalStorage();
});
//Uzdedam Event formos atnaujinimo mygtukui
(_b = UI.updateButton) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
    toggleForms();
});
loadTableEntries();
