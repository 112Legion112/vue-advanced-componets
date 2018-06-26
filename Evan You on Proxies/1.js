let data = { price: 5, quantity: 2};
let target, total, salePrice;

class Dep {
  constructor(){
    this.subscribert = [];
  }

  depend() {
    if (target && !this.subscribert.includes(target)){
      this.subscribert.push(target)
    }
  }

  notify() {
    this.subscribert.forEach(sub => sub())
  }
}

let deps = new Map();

Object.keys(data).forEach(key => {
  deps.set(key, new Dep())
});


let data_without_proxy = data;

data = new Proxy(data_without_proxy, {
  get(obj,key){
    deps.get(key).depend();
    return obj[key];
  },
  set(obj, key, newVal){
    obj[key] = newVal;
    deps.get(key).notify();
    return true;
  }
});

function watcher(myFunc) {
  target = myFunc;
  target();
  target = null;
}

watcher(()=> {
  total = data.price * data.quantity;
});

console.log("total = " + total);
data.price = 20;
console.log("total = " + total);
data.quantity = 10;
console.log("total = " + total);

deps.set('discount', new Dep());
data['discount'] = 5;

watcher(() => {
  salePrice = data.price - data.discount;
});

console.log("salePrice = " + salePrice);

data.discount=7.5;

console.log("salePrice = " + salePrice);
