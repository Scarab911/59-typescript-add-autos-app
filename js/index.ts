const UI = {
    modelInput: document.getElementById('model') as HTMLInputElement,
    dateInput: document.getElementById('date') as HTMLInputElement,
    colorInput: document.getElementById('color') as HTMLInputElement,
    fuelInput: document.getElementById('fuel') as HTMLInputElement,

    addButton: document.getElementById('btn_add'),

    tableRow: document.querySelector('.table-row'),
}

class CarPark{
    //ad cars to list
    addCar(car: Car): void {
        autosList.push(car);
    }

    whatIsThisFuel(fuel: string): KuroTipas {
        let thisFuel: KuroTipas = KuroTipas.Benzinas;

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
        return thisFuel
    }
}

//apsirasom galimus kuro variantus
enum KuroTipas {
    Benzinas = 'benzinas',
    Dyzelinas = 'dyzelinas',
    Elektra = 'elektra'
}

//sukuriam automibiliu objekta
class Car {
    public readonly model: string;
    public readonly date: Date;
    public readonly color: string;
    public readonly fuel: KuroTipas;

    constructor(model: string, date: Date, color: string, fuel: KuroTipas){
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

//uzdedam eventa formos ivedimo mygtukui
UI.addButton?.addEventListener('click', () => {
    const model = UI.modelInput.value;
    const date = UI.dateInput.value;
    const color = UI.colorInput.value;
    const fuel = UI.fuelInput.value;

    const thisFuel = srotas.whatIsThisFuel(fuel);


    
  
  
    console.log(fuel);
    console.log(thisFuel);
    
    srotas.addCar(new Car(model, new Date(date), color, thisFuel))

    console.log(autosList);
    
});