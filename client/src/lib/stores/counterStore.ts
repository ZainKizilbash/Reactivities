import {action, makeObservable, observable} from 'mobx';

export default class CounterStore {
    title = 'Counter store';
    count = 42;

    constructor() {
        makeObservable(this, {
            title: observable,
            count: observable,
            increment: action.bound,    //since increment not an arrow function
            decrement: action
        })
    }

    increment(amount = 1){              //since not arrow function need to use bound to bount it to the class
        this.count += amount;
    }

    decrement = (amount = 1) => {
        this.count -= amount;
    }
}