const URL = "https://api.exchangerate-api.com/v4/latest/USD";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
let currFrom="";
let currTo = "";
let msg = document.querySelector(".msg")
for (let select of dropdowns) {
    for(let code in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
      
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const convertCurrency = async (from,to) => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    
    if(amtVal <1 || amtVal === ""){
        amtVal= 1;
        amount.value = 1;
    }
    const newURL = `https://api.exchangerate-api.com/v4/latest/${from}`;
    let response = await fetch(newURL);
    let data = await response.json();
    let rates = data.rates;
    for (let coun in rates) {
        if (coun == to){
            let rate = rates[coun];
            let finalVal= amtVal *rate;
            msg.innerText = `${amtVal}\t${from}\t =\t ${finalVal}\t${to} `;
        };
    };
  
}


const updateFlag = (element) => {
    if(element.name=="from"){
       currFrom =  element.value;
    }
    else {
        currTo = element.value;
    }
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click" , (evt)=>{
        evt.preventDefault();   
        convertCurrency(currFrom,currTo);
});

window.addEventListener("load" , () => {
        convertCurrency("USD","INR");
});