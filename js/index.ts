const UI = {
    modelInput: document.getElementById('model') as HTMLInputElement,
    dateInput: document.getElementById('date') as HTMLInputElement,
    colorInput: document.getElementById('color') as HTMLInputElement,
    fuelInput: document.getElementById('fuel') as HTMLInputElement,

    addButton: document.getElementById('btn_add'),

    tableRow: document.querySelector('.table-row'),
}

//apsirasom galimus kuro variantus
enum FuelType {
    Benzinas = 'benzinas',
    Dyzelinas = 'dyzelinas',
    Elektra = 'elektra'
}

class CarPark{
    //ad cars to list
    addCar(car: Car): void {
        autosList.push(car);
    }

    whatIsThisFuel(fuel: string): FuelType {
        let thisFuel: FuelType = FuelType.Benzinas;

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
        return thisFuel
    }
}


//sukuriam automibiliu objekta
class Car {
    public readonly model: string;
    public readonly date: Date;
    public readonly color: string;
    public readonly fuel: FuelType;

    constructor(model: string, date: Date, color: string, fuel: FuelType){
                this.model = model,
                this.date = date,
                this.color = color,
                this.fuel = fuel
    }
}

const autosList: Car[] = [];

// sukuriam nauja auto parka
const srotas = new CarPark;
// srotas.addCar(new Car('Audi Q7', new Date(),'White', KuroTipas.benzinas))
console.log(FuelType.Benzinas);
console.log(FuelType.Elektra);

//uzdedam eventa formos ivedimo mygtukui
UI.addButton?.addEventListener('click', () => {
    const model = UI.modelInput.value;
    const date = UI.dateInput.value;
    const color = UI.colorInput.value;
    const fuel = UI.fuelInput.value;

    //susirandam kuro tipa arba panaudojam castinima as KuroTipas
    const thisFuel = srotas.whatIsThisFuel(fuel);

    srotas.addCar(new Car(model, new Date(date), color, thisFuel))

    console.log(autosList);
});