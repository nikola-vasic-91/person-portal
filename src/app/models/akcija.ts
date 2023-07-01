export class Akcija {
    public kupac: string;
    public tipAkcije: string;
    public brend: string;
    public sifArt: string;
    public artikal: string;
    public cijena: string;
    public pocetakAkcije: string;
    public krajAkcije: string;

    constructor(kupac: string, tipAkcije: string, brend: string, sifArt: string, artikal: string, cijena: string, pocetakAkcije: string, krajAkcije: string) {
        this.kupac = kupac;
        this.tipAkcije = tipAkcije;
        this.brend = brend;
        this.sifArt = sifArt;
        this.artikal = artikal;
        this.cijena = cijena;
        this.pocetakAkcije = pocetakAkcije;
        this.krajAkcije = krajAkcije;
    }
}