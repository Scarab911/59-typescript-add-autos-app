const UI = {
    modelInput: document.getElementById('model') as HTMLInputElement,
    dateInput: document.getElementById('date') as HTMLInputElement,
    colorInput: document.getElementById('color') as HTMLInputElement,
    fuelInput: document.getElementById('fuel') as HTMLInputElement,

    addButton: document.getElementById('btn_add'),

    tableRow: document.querySelector('.table-row') as HTMLTableRowElement,
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
        }

        if (fuel === 'Dyzelinas') {
            thisFuel = FuelType.Dyzelinas;
        } 
        
        if (fuel === 'Elektra') {
            thisFuel = FuelType.Elektra;
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

    printCarToHTML(element: HTMLTableRowElement): void {
        const stringyfiedDate = JSON.stringify(this.date);
        const apkarpytas = stringyfiedDate.substring(1, stringyfiedDate.length-1)
        const formatedDate = formatDate(apkarpytas);
        
        console.log(this.date);
        console.log(stringyfiedDate);
        console.log(apkarpytas);
        console.log(formatedDate);

        let HTML ='';
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
function formatDate (date:string) {
    const d = new Date(date);
    const dformat = [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-');
    return dformat;
}

function renderHTML(element:HTMLTableRowElement) {
     for(const car of autosList){
        car.printCarToHTML(element);
    }
}

/*EXECUTION BELOW*/

// sukuriam nauja auto parka
const srotas = new CarPark;
const autosList: Car[] = [];

//uzdedam eventa formos ivedimo mygtukui
UI.addButton?.addEventListener('click', () => {

    const model = UI.modelInput.value;
    const date = UI.dateInput.value;
    const color = UI.colorInput.value;
    const fuel = UI.fuelInput.value;

    //susirandam kuro tipa arba panaudojam castinima as KuroTipas
    const thisFuel = srotas.whatIsThisFuel(fuel);

    //pridedam automobili i list
    const car = new Car(model, new Date(date), color, thisFuel);
    srotas.addCar(car)

    //ipiesiam nauja auto i HTML lentele
    car.printCarToHTML(UI.tableRow);
});