
let moreOrderBtn = document.querySelector('#addToOrder');
let clearAllBtn = document.querySelector('#clearAll');

let i = 1; // i is a counter 
function increment(){
    i += 1;
}

let loadCalc = () => {
    moreOrderBtn.disabled = true;
    clearAllBtn.disabled = true;
    clearAllBtn.removeAttribute('style');
    moreOrderBtn.removeAttribute('style');
    document.querySelector('#sub').innerHTML = 0;
    // document.querySelector('#alertBox').removeAttribute('class');
    document.querySelector('.form-field').innerHTML = `
        <div class="firstOrder">
            <ul>
                <li>
                    <input type ="text" class = "item" id = "item${i}" required placeholder = "Item" autofocus=""/>
                </li>
                <li>
                    <input type ="number" class = "unitprice" id = "unitprice${i}" required placeholder = "Unit Price" />
                </li>
                <li>
                    <input type ="number" class = "quantity" id = "quantity${i}" required placeholder = "Quantity" />
                </li>
                <li>
                    <span><input id="price${i}" class="price" placeholder="Amount" readonly></span>
                </li>
            </ul>
        </div>
    `;
}
window.onload = loadCalc();


let newFormField = (event) => {
    event.preventDefault();
    let newDiv = document.createElement('DIV');
    increment();
    newDiv.innerHTML = `
        <ul>
            <li>
                <input type ="text" class = "item" id = "item${i}" required placeholder = "Item" />
            </li>
            <li>
                <input type ="number" class = "unitprice" id = "unitprice${i}" required placeholder = "Unit Price" />
            </li>
            <li>
                <input type ="number" class = "quantity" id = "quantity${i}" required placeholder = "Quantity" />
            </li>
            <li>
                <span><input id="price${i}" class="price" placeholder="Amount" readonly></span>
            </li>
        </ul>
    `;
    const form = document.querySelector('.form-field');
    form.insertBefore(newDiv, form.childNodes[0]);
    document.querySelector(`#item${i-1}`).setAttribute('readonly', 'readonly');
    document.querySelector(`#item${i-1}`).removeAttribute('class');
    document.querySelector(`#unitprice${i-1}`).setAttribute('readonly', 'readonly');
    document.querySelector(`#unitprice${i-1}`).removeAttribute('class');
    document.querySelector(`#quantity${i-1}`).setAttribute('readonly', 'readonly');
    document.querySelector(`#quantity${i-1}`).removeAttribute('class');
    moreOrderBtn.disabled = true;
    moreOrderBtn.removeAttribute('style');
}
moreOrderBtn.addEventListener('click', newFormField);


let price = (event) =>{
    event.preventDefault();
    moreOrderBtn.disabled = true;
    let unitPrice = document.querySelector(`#unitprice${i}`).value.trim();
    let quantity = document.querySelector(`#quantity${i}`).value.trim();
    let item = document.querySelector(`#item${i}`).value.trim();
    let sub = unitPrice * quantity;
    let priceArray = document.querySelectorAll('.price');
    let subTotal = 0;

    if(/^([A-Za-z0-9- ]){2,30}$/.test(item) && /^[0-9]\d*(\.\d+)?$/.test(unitPrice) && /^\+?[0-9][\d]*$/.test(quantity)){
        document.querySelector(`#price${i}`).setAttribute('value', sub.toFixed(2));
        moreOrderBtn.disabled = false;
        moreOrderBtn.style.background = '#00994d';
        moreOrderBtn.style.color = '#fff';
        clearAllBtn.disabled = false;
        clearAllBtn.style.background = '#cc0000'
        clearAllBtn.style.color = '#fff';

        for(let j=0; j<priceArray.length; j++){
            if(parseFloat(priceArray[j].value))
                subTotal += parseFloat(priceArray[j].value);
        }
        document.querySelector('#sub').innerHTML = subTotal.toFixed(2);
    }
    else{
        document.querySelector(`#price${i}`).setAttribute('value', '');
        moreOrderBtn.disabled = true;
        moreOrderBtn.removeAttribute('style');

        for(let j=0; j<priceArray.length; j++){
            if(parseFloat(priceArray[j].value))
                subTotal += parseFloat(priceArray[j].value);
        }
        document.querySelector('#sub').innerHTML = subTotal.toFixed(2);
    }
}
document.addEventListener('keyup', price);

clearAllBtn.addEventListener('click', loadCalc);

