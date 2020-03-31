const currencyElement_one = document.getElementById('currency-one');
const currencyElement_two = document.getElementById('currency-two');
const amountElement_one = document.getElementById('amount-one');
const amountElement_two = document.getElementById('amount-two');
const rateElement = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
function calculate() {
  const currency_one = currencyElement_one.value;
  const currency_two = currencyElement_two.value;

  fetch(
    `https://prime.exchangerate-api.com/v5/acce8e5d2ae9725e8bdbcfef/latest/${currency_one}`
  )
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      const rate = data.conversion_rates[currency_two];
      rateElement.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountElement_two.value = (amountElement_one.value * rate).toFixed(2);
    });
}

// Event listeners
currencyElement_one.addEventListener('change', calculate);
amountElement_one.addEventListener('input', calculate);
currencyElement_two.addEventListener('change', calculate);
amountElement_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
  const temp = currencyElement_one.value;
  currencyElement_one.value = currencyElement_two.value;
  currencyElement_two.value = temp;
  calculate();
});

calculate();
