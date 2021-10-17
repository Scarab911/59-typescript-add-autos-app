const UI = {
    modelInput: document.getElementById('model') as HTMLInputElement,
    dateInput: document.getElementById('date') as HTMLInputElement,
    colorInput: document.getElementById('color') as HTMLInputElement,
    fuelInput: document.getElementById('fuel') as HTMLInputElement,

    addButton: document.getElementById('btn_add'),
    editButton: document.getElementById('editPick') as HTMLImageElement,
    deleteButton: document.getElementById('deletePick') as HTMLImageElement,
    updateButton: document.getElementById('update-btn'),

    tableBody: document.getElementById('table-body') as HTMLTableElement,
    updateForm: document.getElementById('update-form'),
    addForm: document.getElementById('add-form')
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

        if (fuel === '0') {
            thisFuel = FuelType.Benzinas;
        }

        if (fuel === '1') {
            thisFuel = FuelType.Dyzelinas;
        } 
        
        if (fuel === '2') {
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
    public readonly _id: number;

    constructor(model: string, date: Date, color: string, fuel: FuelType, id: number){
                this.model = model,
                this.date = date,
                this.color = color,
                this.fuel = fuel,
                this._id = id
    }

    get id(): number {
        return this._id
    }

    printCarToHTML(element: HTMLTableElement): void {
        //formatuojam data
        const stringyfiedDate: string = JSON.stringify(this.date);
        const apkarpytas: string = stringyfiedDate.substring(1, stringyfiedDate.length-1)
        const formatedDate: string = formatDate(apkarpytas);

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

interface CarJSON {
    model: string,
    date: string,
    color: string,
    fuel: string,
    id:number
}
/*HELPER FUNCTIONS*/

//formats date
function formatDate (date:string): string {
    const d = new Date(date);
    const dformat = [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-');
    return dformat;
}

//render HTML from Array of objects
function renderEntries(element:HTMLTableElement): void {
    element.innerHTML = '';

    for(const car of autosList){
        car.printCarToHTML(element);
    }
}

//Saves info into LocalStorage
const CARS_LOCAL_STORAGE_KEY = 'Cars';

function saveCarToLocalStorage(): void {
    const carsString = JSON.stringify(autosList);

    window.localStorage.setItem(CARS_LOCAL_STORAGE_KEY,carsString)
}

//togles between two forms:
function toggleForms(): void {
    UI.addForm?.classList.toggle('show');
    UI.updateForm?.classList.toggle('show');
}

//remove entry from table
function deleteEntry(id: number): void {
    autosList = autosList.filter((car) => car._id !== id)
    renderEntries(UI.tableBody)

    saveCarToLocalStorage();
}

//uzkrauna sarasa is Local Storage
function loadTableEntries(): void {
    const localCarsList = window.localStorage.getItem(CARS_LOCAL_STORAGE_KEY);

    if(!localCarsList)
        return
        
    const parsedCarsList: CarJSON[] = JSON.parse(localCarsList)
    
    console.log('istraukiam is local storage');
    console.log(localCarsList);
    console.log(parsedCarsList);
    id = 0;

    for(const car of parsedCarsList){
        const newCar = new Car(car.model, new Date(car.date), car.color, car.fuel as FuelType, ++id);

         autosList.push(newCar);
    }

    console.log(autosList);

    renderEntries(UI.tableBody)
}

/*EXECUTION BELOW*/

// sukuriam nauja auto parka
const srotas = new CarPark;
let autosList: Car[] = [];
let id = 0;

//uzdedam eventa formos ivedimo mygtukui
UI.addButton?.addEventListener('click', () => {

    const model = UI.modelInput.value;
    const date = UI.dateInput.value;
    const color = UI.colorInput.value;
    const fuel = UI.fuelInput.value;
    //susirandam kuro tipa arba panaudojam castinima as KuroTipas
    const thisFuel = srotas.whatIsThisFuel(fuel);

    //pridedam automobili i list
    const car = new Car(model, new Date(date), color, thisFuel, ++id);
    srotas.addCar(car)
    console.log(autosList);

    //ipiesiam nauja auto i HTML lentele
    renderEntries(UI.tableBody);

    //ikeliam sukurtus auto i LOCAL Storage:
    saveCarToLocalStorage();
});

//Uzdedam Event formos atnaujinimo mygtukui
UI.updateButton?.addEventListener('click', () => {
    toggleForms()
})

loadTableEntries();