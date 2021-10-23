const UI = {
    //inputs
    modelInput: document.getElementById('model') as HTMLInputElement,
    dateInput: document.getElementById('date') as HTMLInputElement,
    colorInput: document.getElementById('color') as HTMLInputElement,
    fuelInput: document.getElementById('fuel') as HTMLInputElement,

    //input and edit buttons
    addButton: document.getElementById('btn_add'),
    editButton: document.getElementById('editPick') as HTMLImageElement,
    deleteButton: document.getElementById('deletePick') as HTMLImageElement,
    updateButton: document.getElementById('update-btn'),

    //forms adn tables
    tableBody: document.getElementById('table-body') as HTMLTableElement,
    updateForm: document.getElementById('update-form'),
    addForm: document.getElementById('add-form'),

    //filter buttons
    showAllBtn: document.getElementById('show-all'),
    showDyzelBtn: document.getElementById('show-dyzel'),
    showBenzBtn: document.getElementById('show-benz'),
    showEvBtn: document.getElementById('show-ev'),
}

//apsirasom galimus kuro variantus
enum FuelType {
    Benzinas = 'benzinas',
    Dyzelinas = 'dyzelinas',
    Elektra = 'elektra'
}

class CarPark{
    //ad cars to list
    public static addCar(car: Car): void {
        autosList.push(car);
    }
}

//sukuriam automibiliu objekta
class Car {
    public model: string;
    public date: Date;
    public color: string;
    public fuel: FuelType;
    public _id: number;

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
function renderEntries(element:HTMLTableElement, fuel?: string): void {
    element.innerHTML = '';

    for(const car of autosList){
        if (fuel === '') {
            car.printCarToHTML(element);
        }
        if (car.fuel == fuel || fuel ===  undefined) {
            car.printCarToHTML(element);
        } 
    }
}

//Saves info into LocalStorage
const CARS_LOCAL_STORAGE_KEY = 'Cars';

function saveCarToLocalStorage(): void {
    const carsString = JSON.stringify(autosList);

    window.localStorage.setItem(CARS_LOCAL_STORAGE_KEY,carsString)
}

//togles between two forms:
let editableId: number | undefined = 0;

function toggleForms(id?: number): void {
    UI.addForm?.classList.toggle('show');
    UI.updateForm?.classList.toggle('show');
    editableId = id;
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

    id = 0;

    for(const car of parsedCarsList){
        const newCar = new Car(car.model, new Date(car.date), car.color, car.fuel as FuelType, ++id);

         autosList.push(newCar);
    }

    renderEntries(UI.tableBody)
}

//filtruojam pagal kuro tipa
function filter(type:string){
    renderEntries(UI.tableBody,type);   
}

/*EXECUTION BELOW*/

// sukuriam nauja auto parka
let autosList: Car[] = [];
let id = 0;

//uzdedam eventa formos ivedimo mygtukui
UI.addButton?.addEventListener('click', (e) => {
    e.preventDefault();

    const model = UI.modelInput.value;
    const date = UI.dateInput.value;
    const color = UI.colorInput.value;
    const fuel = UI.fuelInput.value;

    //Validations
    if (model === '' ||
        isFinite(+model)) {
        console.error('ERROR: Please enter model name!');
        return
    }
    if (date === '' ) {
        console.error('ERROR: Please enter full date!');
        return
    }
    if (color === '' ||
        isFinite(+color)) {
        console.error('ERROR: Please enter color as text without numbers!');
        return
    }

    //pridedam automobili i list
    const car = new Car(model, new Date(date), color, fuel as FuelType, ++id);
    CarPark.addCar(car)

    //ipiesiam nauja auto i HTML lentele
    renderEntries(UI.tableBody);

    //ikeliam sukurtus auto i LOCAL Storage:
    saveCarToLocalStorage();
});

//Uzdedam Event formos atnaujinimo mygtukui
UI.updateButton?.addEventListener('click', () => {
   const modelUpdateInput = document.getElementById('update-model') as HTMLInputElement;
   const dateUpdateInput = document.getElementById('update-date') as HTMLInputElement;
   const colorUpdateInput = document.getElementById('update-color') as HTMLInputElement;
   const fuelUpdateInput = document.getElementById('update-fuel') as HTMLInputElement;

    for(const car of autosList){
        if(car.id === editableId) {
           modelUpdateInput.value === ''? car.model: car.model = modelUpdateInput.value;
           dateUpdateInput.value === ''? car.date: car.date = new Date(dateUpdateInput.value);
           colorUpdateInput.value === ''? car.color: car.color = colorUpdateInput.value;
           fuelUpdateInput.value === ''? car.fuel: car.fuel = fuelUpdateInput.value as FuelType;
        }
    }
    const index: number|undefined = editableId;
    autosList[index-1]: 
    //ikeliam sukurtus auto i LOCAL Storage:
    saveCarToLocalStorage();

    //ipiesiam nauja auto i HTML lentele
    renderEntries(UI.tableBody);

    toggleForms()
    alert('Entry updated succesfuly');
})

loadTableEntries();

