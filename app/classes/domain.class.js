class Domain {
    constructor(name) {
        this.name = name;
        this.url;
    }

    getName() {
        return this.name;
    }

    getUrl() {
        return this.url;
    }

    validate() {
        if (/^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/.test(this.name)) {
            if (!/^https?:\/\//i.test(this.name)) {
                this.url = 'http://' + this.name;
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

    async http() {
        let httpStatus = await fetch('http://localhost:8000/http/google.com')
        .then( (response) => {
            console.log(response.status)
            return ({
                message: `${this.name} HTTP Status`,
                status: response.status
            });
        })
        .catch( (err) => {
            console.log(err);
        });

        console.log(httpStatus)
        return JSON.stringify(httpStatus);
    }
}