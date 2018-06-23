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


Object.keys(data).forEach(key => {
  let internalValue = data[key]

  const dep = new Dep();

  Object.defineProperty(data, key, {
    get() {
      dep.depend();
      return internalValue;
    },
    set(newVal) {
      internalValue = newVal;
      dep.notify();
    }
  })
});

function watcher(myFunc) {
  target = myFunc;
  target();
  target = null;
}

watcher(()=> {
  total = data.price * data.quantity;
});

watcher(()=> {
  salePrice = data.price * 0.9;
});