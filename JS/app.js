import Countries from "./countries.js";

const init = () => {
    doApi("israel");
    declareEvents();


}



const declareEvents = (data) => {

    let id_form = document.querySelector("#form");
    let USA = document.querySelector(".USA");
    let ISRAEL = document.querySelector(".ISRAEL");
    let UK = document.querySelector(".UK");
    let FRANCE = document.querySelector(".FRANCE");
    let THAILAND = document.querySelector(".THAILAND");
    let i = 0;

    id_form.addEventListener("submit", function (e) {
        e.preventDefault();
        let input = document.querySelector("#input").value;
        
        doApi(input);

        
    })


    USA.addEventListener("click", function(){
        doApi(USA.innerHTML);

    })
    ISRAEL.addEventListener("click", function(){
        doApi(ISRAEL.innerHTML);

    })
    UK.addEventListener("click", function(){
        doApi("United Kingdom");

    })
    FRANCE.addEventListener("click", function(){
        doApi(FRANCE.innerHTML);

    })
    THAILAND.addEventListener("click", function(){
        doApi(THAILAND.innerHTML);

    })





}




const doApi = async (input) => {
    let url = `https://restcountries.com/v3.1/name/${input}`;
    let resp = await fetch(url);
    let data = await resp.json();
    if(!data[0]){
        document.querySelector("#about").innerHTML =`
        Country name unknown!
        `
        document.querySelector("#flag").innerHTML ="";
        document.querySelector("#map").innerHTML ="";
        document.querySelector("#borders").innerHTML ="";
        document.querySelector("#borders_title").innerHTML ="";
    }
    else{
        showCountry(data[0]);
    }
}



const showCountry = (item,doApiCode,showCountry) => {
    let country = new Countries(item);
    country.renderToHtml(); 
}









init();