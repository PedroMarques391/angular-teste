import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FetchService } from '../../../fetch.service';
import { CoinModel } from '../../../models/CoinModel';

@Component({
    selector: 'app-get-coin',
    imports: [ReactiveFormsModule, MatFormFieldModule,
        MatCardModule, MatInputModule, MatIconModule, MatButtonModule],
    templateUrl: './get-coin.component.html',
    styleUrl: './get-coin.component.css'
})
export class GetCoinComponent {
    searchForm!: FormGroup
    coins: CoinModel[] = []
    showList = false;
    constructor(private formBuilder: FormBuilder, private fetchServices: FetchService) {

    }

    ngOnInit(): void {
        this.searchForm = this.formBuilder.group({
            acronym: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern('^[a-zA-Z]+$')]],
        });
    }

    onSearch(): void {
        const { acronym } = this.searchForm.value;
        if (acronym) {
            this.showList = true
            this.fetchServices.getCoin(acronym.toUpperCase()).subscribe({
                next: (data) => {
                    console.log(data)
                    this.coins = data
                },
                error: (err) => {
                    console.error('Erro ao buscar moeda:', err);
                },
            })
        }
        console.log(acronym)
    }

    toHome() {
        this.fetchServices.toHome()
    }


}
