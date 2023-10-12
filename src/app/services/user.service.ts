import { Injectable, OnDestroy, OnInit } from "@angular/core";


@Injectable({providedIn: 'root'})
export class UserService implements OnInit, OnDestroy{
    balance: number;

    ngOnInit(): void {
        
    }

    constructor() {
        let currentBalance = localStorage.getItem('Balance');

        if (!currentBalance) {
            this.balance = 500;
            localStorage.setItem('Balance', this.balance.toString());
        } else {
            this.balance = +currentBalance;
        }
    }
   

    setBalance() {
        localStorage.setItem('Balance', this.balance.toString());
    }


    ngOnDestroy(): void {
        this.setBalance();
    }
}