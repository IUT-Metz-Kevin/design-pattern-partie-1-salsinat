// Composite

class alreadyExistsError extends Error {}

interface Component {
    name: string;
    pay(): number;
    introduce(): void;
}

function isComponent(obj: any): obj is Component {
    return (
        'name' in obj &&
        'pay' in obj &&
        'introduce' in obj &&
        typeof obj.name === 'string' &&
        typeof obj.pay === 'function' &&
        typeof obj.introduce === 'function'
    );
}

interface Composite extends Component {
    children: Component[];
    includes(component: Component): boolean;
    addChild(component: Component): void;
    removeChild(component: Component): void;
}

function isComposite(obj: any): obj is Composite {
    return (
        'includes' in obj && 
        'addChild' in obj && 
        'removeChild' in obj && 
        'children' in obj && 
        typeof obj.includes === 'function' &&
        typeof obj.addChild === 'function' &&
        typeof obj.removeChild === 'function' &&
        Array.isArray(obj.children) && 
        obj.children.every((child: any) => isComponent(child)) &&
        isComponent(obj)
    );
}

interface Leaf extends Component {}

class Employee implements Leaf {
    private _name: string;
    private _salary: number;
    private static readonly minSalary: number = 1000;
    private _age: number;
    private static readonly minAge: number = 18;

    public constructor(name: string, salary: number, age: number) {
        this.name = name;
        this.salary = salary;
        this.age = age;
    }

    public get name(): string { return this._name; }
    public set name(name: string) { 
        if (name.length === 0) throw new Error('Name cannot be empty');
        this._name = name; 
    }

    public get salary(): number { return this._salary; }
    public set salary(value: number) {
        if (value < Employee.minSalary) throw new Error(`Salary cannot be less than ${Employee.minSalary}`);
        this._salary = value;
    }

    public get age(): number { return this._age; }
    public set age(value: number) {
        if (value < Employee.minAge) throw new Error(`Age cannot be less than ${Employee.minAge}`);
        this._age = value;
    }

    pay(): number {
        console.log(`Paying ${this.name} a salary of ${this.salary}`);
        return this.salary;
    }

    introduce(): void {
        console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old`);
    }
}

class Departement implements Composite {
    private _name: string;
    private _directeur: Component;
    private _budget: number = 0;
    private _children: Component[] = [];

    public constructor(name: string, directeur: Component) {
        this.name = name;
        this.directeur = directeur;
    }

    public get name(): string { return this._name; }
    public set name(name: string) { 
        if (name.length === 0) throw new Error('Name cannot be empty');
        this._name = name; 
    }

    public get directeur(): Component { return this._directeur; }
    public set directeur(directeur: Component) { 
        try { 
            this.addChild(directeur);
        } catch (error) {
            if (!(error instanceof alreadyExistsError)) throw error;
        }
        this._directeur = directeur; 
    }

    public get budget(): number { return this._budget; }
    public set budget(value: number) {
        if (value < 0) throw new Error('Budget cannot be negative');
        this._budget = value;
    }

    public get children(): Component[] { return this._children; };
    public includes(child: Component): boolean {
        for(let c of this.children) {
            if (c === child) return true;
            if (isComposite(c)) {
                if (c.includes(child)) return true;
            }
        };
        return false;
    };
    public addChild(child: Component): void {
        console.log(`Adding ${child.name} to ${this.name}`);
        if (this.includes(child)) throw new alreadyExistsError('Component already exists');
        this.children.push(child);
    };
    public removeChild(child: Component): void {
        if (!this.children.includes(child)) throw new Error('Component does not exist in children');
        this.children.splice(this.children.indexOf(child), 1);
    };

    pay(): number {
        console.log(`Paying ${this.name}'s employees:`);
        let total = 0;
        for (let child of this.children) {
            total += child.pay();
        }
        return total;
    }

    introduce(): void {
        console.log(`Entering ${this.name}'s departement:`);
        for (let child of this.children) {
            child.introduce();
        }
    }
}

function main() {
    const directeurGeneral = new Employee('John Doe', 10000, 30);
    const directeurSecretariat = new Employee('Jane Doe', 5000, 25);
    const directeurTechnique = new Employee('Johny Doe', 5000, 25);
    const directeurIT = new Employee('Jenny Doe', 5000, 25);
    const directeurWeb = new Employee('Josh Doe', 5000, 25);
    const directeurCommercial = new Employee('Jill Doe', 5000, 25);
    const directeurVentes = new Employee('Jack Doe', 5000, 25);
    const directeurAchats = new Employee('Judy Doe', 5000, 25);
    const directeurFinancier = new Employee('Joe Doe', 5000, 25);
    const directeurRH = new Employee('Joshua Doe', 5000, 25);
    const directeurComptable = new Employee('Jillie Doe', 5000, 25);
    const directeurAdministratif = new Employee('Jackie Doe', 5000, 25);

    const administration = new Departement("Administration", directeurAdministratif);
    const comptabilite = new Departement("Comptabilité", directeurComptable);
    const ressourcesHumaines = new Departement("Ressources Humaines", directeurRH);
    const departementFinancier = new Departement("Département Financier", directeurFinancier);
    departementFinancier.addChild(administration);
    departementFinancier.addChild(comptabilite);
    departementFinancier.addChild(ressourcesHumaines);

    const achats = new Departement("Achats", directeurAchats);
    const ventes = new Departement("Ventes", directeurVentes);
    const departementCommercial = new Departement("Département Commercial", directeurCommercial);
    departementCommercial.addChild(achats);
    departementCommercial.addChild(ventes);

    const departementTechnique = new Departement("Département Technique", directeurTechnique);
    const IT = new Departement("IT", directeurIT);
    const Web = new Departement("Web", directeurWeb);
    departementTechnique.addChild(IT);
    departementTechnique.addChild(Web);

    const directionGeneral = new Departement("Direction Général", directeurGeneral);
    const secretariatGeneral = new Departement("Secrétariat Général", directeurSecretariat);
    directionGeneral.addChild(secretariatGeneral);
    directionGeneral.addChild(departementFinancier);
    directionGeneral.addChild(departementCommercial);
    directionGeneral.addChild(departementTechnique);

    directionGeneral.introduce();
    console.log("Total salary: ", directionGeneral.pay());
}

main();