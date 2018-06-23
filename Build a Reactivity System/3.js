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

const dep = new Dep();

let price = 5;
let quantity = 2;
let total = 0;
let target = null;

function watcher(myFunc) {
  target = myFunc;
  dep.depend();
  target();
  target = null;
}

watcher(() => {
  total = price * quantity;
});