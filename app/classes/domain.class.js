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

    async whois() {
        let whois = await fetch('http://localhost:8000/whois/' + this.name)
            .then((response) => {
                console.log(response)

                return ({
                    host: `${this.name}`,
                    response: response //Need to check further, not working as expected
                });
            })
            .catch((err) => {
                console.log(err);
            });
        return JSON.stringify(whois);
    }

    async dns() {
        let dns = await fetch('http://localhost:8000/dns/' + this.name)
            .then((response) => {
                console.log(response)

                return ({
                    host: `${this.name}`,
                    response: response //Need to check further, not working as expected
                });
            })
            .catch((err) => {
                console.log(err);
            });
        return JSON.stringify(dns);
    }

    async http() {
        let httpStatus = await fetch('http://localhost:8000/http/' + this.name)
            .then((response) => {
                return ({
                    host: `${this.name}`,
                    status: response.status
                });
            })
            .catch((err) => {
                console.log(err);
            });

        console.log(httpStatus)
        return JSON.stringify(httpStatus);
    }
}