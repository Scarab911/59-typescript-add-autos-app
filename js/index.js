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
            console.log('priskyrem benzina');
        }
        if (fuel === 'Dyzelinas') {
            thisFuel = FuelType.Dyzelinas;
            console.log('priskyrem dyzeliuka');
        }
        if (fuel === 'Elektra') {
            thisFuel = FuelType.Elektra;
            console.log('priskyrem dyzeliuka');
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
}
const autosList = [];
// sukuriam nauja auto parka
const srotas = new CarPark;
// srotas.addCar(new Car('Audi Q7', new Date(),'White', KuroTipas.benzinas))
console.log(FuelType.Benzinas);
console.log(FuelType.Elektra);
//uzdedam eventa formos ivedimo mygtukui
(_a = UI.addButton) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    const model = UI.modelInput.value;
    const date = UI.dateInput.value;
    const color = UI.colorInput.value;
    const fuel = UI.fuelInput.value;
    //susirandam kuro tipa arba panaudojam castinima as KuroTipas
    const thisFuel = srotas.whatIsThisFuel(fuel);
    srotas.addCar(new Car(model, new Date(date), color, thisFuel));
    console.log(autosList);
});
