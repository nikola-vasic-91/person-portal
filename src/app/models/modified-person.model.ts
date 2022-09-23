export class ModifiedPerson {
    public numberOfVowels: number;
    public numberOfConsonants: number;
    public fullName: string;
    public reversedName: string;

    constructor(numberOfVowels: number, numberOfConsonants: number, fullName: string, reversedName: string) {
        this.numberOfVowels = numberOfVowels;
        this.numberOfConsonants = numberOfConsonants;
        this.fullName = fullName;
        this.reversedName = reversedName;
    }
}