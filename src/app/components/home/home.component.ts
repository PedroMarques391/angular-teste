import { Component } from '@angular/core';
import { MatButton } from "@angular/material/button"
import { MatIcon } from "@angular/material/icon"
import { MatCardModule } from "@angular/material/card"
import { Router } from '@angular/router';
import { FetchService } from "../../fetch.service"
import { MatListModule } from '@angular/material/list';
import { CoinModel } from '../../models/CoinModel';

@Component({
    selector: 'app-home',
    imports: [MatButton, MatIcon, MatListModule, MatCardModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
    coins: CoinModel[] = [];
    showList = false;
    constructor(private router: Router, private fetchServices: FetchService) { }

    showCoins() {
        this.showList = true
        this.fetchServices.getCoins().subscribe({
            next: (data) => {
                console.log(data)
                this.coins = data
            },
            error: (err) => {
                console.error('Erro ao buscar moedas:', err);
            },
        })
    }

    getCoinPage() {
        this.router.navigate(['/home/getCoin'])

    }

    editCoinPage() {
        this.router.navigate(['/home/editCoin'])

    }

    createCoinPage() {
        this.router.navigate(['/home/createCoin'])
    }
}
