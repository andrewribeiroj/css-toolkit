class Domain {
    constructor(name) {
        this.name = name;
        this.url;
    }

    getName() {
        return this.name;
    }

    getName() {
        return this.url;
    }

    validate() {
        if (/^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/.test(this.name)) {
            if (!/^https?:\/\//i.test(this.name)) {
                this.url = 'http://' + this.name;
                console.log(this.url)
            }
            return true;
        } else {
            return false;
        }
    }

    whois() {
        return (`${this.name} Whois data`);
    }

    dns() {
        return (`${this.name} DNS data`);
    }

    http() {
        return (`${this.name} HTTP data`);
    }
}