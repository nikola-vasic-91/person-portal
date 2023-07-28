import { Akcija } from "./akcija";

export class GrupaAkcija {
    public akcije: Akcija[];

    constructor(akcije: Akcija[]){
        this.akcije = akcije;
    }
}