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
class CarPark {
    //ad cars to list
    addCar(car) {
        autosList.push(car);
    }
    whatIsThisFuel(fuel) {
        let thisFuel = KuroTipas.Benzinas;
        if (fuel === 'benzinas') {
            thisFuel = KuroTipas.Benzinas;
            console.log('priskyrem benzina');
        }
        if (fuel === 'dyzelinas') {
            thisFuel = KuroTipas.Dyzelinas;
            console.log('priskyrem dyzeliuka');
        }
        if (fuel === 'elektra') {
            thisFuel = KuroTipas.Elektra;
            console.log('priskyrem dyzeliuka');
        }
        return thisFuel;
    }
}
//apsirasom galimus kuro variantus
var KuroTipas;
(function (KuroTipas) {
    KuroTipas["Benzinas"] = "benzinas";
    KuroTipas["Dyzelinas"] = "dyzelinas";
    KuroTipas["Elektra"] = "elektra";
})(KuroTipas || (KuroTipas = {}));
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
//uzdedam eventa formos ivedimo mygtukui
(_a = UI.addButton) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    const model = UI.modelInput.value;
    const date = UI.dateInput.value;
    const color = UI.colorInput.value;
    const fuel = UI.fuelInput.value;
    const thisFuel = srotas.whatIsThisFuel(fuel);
    console.log(fuel);
    console.log(thisFuel);
    srotas.addCar(new Car(model, new Date(date), color, thisFuel));
    console.log(autosList);
});
