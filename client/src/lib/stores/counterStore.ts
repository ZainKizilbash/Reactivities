import {makeAutoObservable} from 'mobx';

export default class CounterStore {
    title = 'Counter store';
    count = 42;

    constructor() {
        makeAutoObservable(this)
    }

    increment(amount = 1){              //since not arrow function need to use bound to bount it to the class
        this.count += amount;
    }

    decrement = (amount = 1) => {
        this.count -= amount;
    }
}