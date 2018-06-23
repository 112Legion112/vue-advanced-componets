let data = {price: 5, quantity: 2};
let internalValue = data.price;

Object.defineProperty(data, "price", {
  get() {
    console.log(`Getting price: ${internalValue}`);
    return internalValue;
  },
  set(newVal) {
    console.log(`Sitting price: ${newVal}`);
    internalValue = newVal;
  }
});

data.price;
data.price = 20;