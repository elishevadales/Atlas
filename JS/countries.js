export default class Countries {
    constructor(_item, doApi, showCountry) {
        let lang = _item.languages;
        let coin = _item.currencies;
        let coin2 = Object.keys(coin);

        this.name = _item.name.common;
        this.pop = _item.population;
        this.region = _item.region;
        this.lang = Object.values(lang);
        this.coin = Object.keys(coin);
        this.coin2 = Object.values(coin)[0].name;
        this.capital = _item.capital;
        this.borders = _item.borders;
        this.flag = _item.flags.png;
        this.lat = Object.values(_item.capitalInfo.latlng)[0];
        this.lng = Object.values(_item.capitalInfo.latlng)[1];
        this.doApi = doApi;
        this.showCountry = showCountry;



    }

    renderToHtml() {
        document.querySelector("#borders").innerHTML = "";


        document.querySelector("#about").innerHTML = `
        <h2>${this.name}</h2>
        <p>POP: ${this.pop}</p>
        <p>Region: ${this.region}</p>
        <p>Languages: ${this.lang}</p>
        <p>Coin: ${this.coin}, ${this.coin2}</p>
        <p>Capital: ${this.capital}</p>
        `



        document.querySelector("#flag").innerHTML = `
        <img src="${this.flag}">
        `
    
        


        document.querySelector("#map").innerHTML = `
        <div class="mapouter">
        <div class="gmap_canvas">
            <iframe width="600" height="500" id="gmap_canvas"
                src="https://maps.google.com/maps?q=${this.lat},${this.lng}&t=&z=13&ie=UTF8&iwloc=&output=embed"
                frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
            <a href="https://putlocker-is.org"></a>
            <br>
            <style>
                .mapouter {
                    position: relative;
                    text-align: right;
                    height: 400px;
                    width: 100%;
                }
            </style><a href="https://www.embedgooglemap.net">embedgooglemap.net</a>
            <style>
                .gmap_canvas {
                    overflow: hidden;
                    background: none !important;
                    height: 400px;
                    width: 100%;
                }
            </style>
        </div>
    </div>
        `
        for (let i = 0; i < this.borders.length; i++) {
            let border = this.borders[i];

            let myspan = document.createElement("span");
            if (i != 0) {
                myspan.innerHTML = `,${border}`;
            } else {
                myspan.innerHTML = `${border}`;
            }

            document.querySelector("#borders").appendChild(myspan);

            myspan.addEventListener("click", async function () {
                let url = `https://restcountries.com/v3.1/alpha/${border}`;
                let resp = await fetch(url);
                let data = await resp.json();
                if (!data[0]) {
                    document.querySelector("#about").innerHTML = `
        Country name unknown!
        `
                    // document.querySelector("#footer").innerHTML = "Country name unknown!"
                    document.querySelector("#flag").innerHTML = "";
                    document.querySelector("#map").innerHTML = "";
                    document.querySelector("#borders").innerHTML = "";
                    document.querySelector("#borders_title").innerHTML = "";
                }
                else {
                    let country = new Countries(data[0]);
                    country.renderToHtml();
                }
            })

        }

    }


}