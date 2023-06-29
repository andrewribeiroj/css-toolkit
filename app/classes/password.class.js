class Password {
    constructor(string) {
        this.string = string;
        this.pwpush;
    }

    async push() {
        let data = {
            'password[payload]': 'example',
            'password[expire_after_days]': '2',
            'password[expire_after_views]': '10'    
        }
        await fetch('https://pwpush.com/p.json',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: data
            })
            .then( (response) => {
                console.log(response);
                this.pwpush = response;
            })

        return this.pwpush;
    }
}