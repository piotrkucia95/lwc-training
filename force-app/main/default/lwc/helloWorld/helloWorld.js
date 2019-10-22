/* eslint-disable no-console */
import { LightningElement, track } from 'lwc';

export default class HelloWorld extends LightningElement {

    @track greeting = 'Piotr';
    @track myInput = 'World';

    handleChange(event) {
        this.greeting = event.target.value;
        this.myInput = this.greeting;
        console.log("Greeting: ", this.greeting);
    }

    handleClick () {
        this.greeting = this.myInput + ". It's a pleasure to meet you";
    }
}