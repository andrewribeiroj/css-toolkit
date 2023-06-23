export class Domain {
    constructor(name) {
        this.name = name;
    }

    whois() {
        return(`${this.name} Whois data`);
    }

    dns() {
        return(`${this.name} DNS data`);
    }
}