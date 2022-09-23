export class PersonSocialMediaAccount {
    public socialMediaAccountId!: string;
    public type: string;
    public address: string;

    constructor(type: string, address: string) {
        this.type = type;
        this.address = address;
    }
}