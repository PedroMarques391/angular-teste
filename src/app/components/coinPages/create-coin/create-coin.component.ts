import { Component, input, OnInit } from '@angular/core';
import { CoinModel } from '../../../models/CoinModel';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FetchService } from '../../../fetch.service';

@Component({
    selector: 'app-create-coin',
    imports: [ReactiveFormsModule, MatFormFieldModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule],
    templateUrl: './create-coin.component.html',
    styleUrl: './create-coin.component.css'
})
export class CreateCoinComponent implements OnInit {
    createCoinForm!: FormGroup
    constructor(private formBuilder: FormBuilder, private fetchServices: FetchService) {

    }

    ngOnInit(): void {
        this.createCoinForm = this.formBuilder.group({
            guidEmpresa: ['', [Validators.required, Validators.maxLength(36), Validators.minLength(36)]],
            sigla: ['', [Validators.required, Validators.pattern('^[A-Z]{3}$')]],
            nome: ['', [Validators.minLength(3), Validators.maxLength(15)]],
            simbolo: ['', [Validators.pattern('^[^,]+(,[^,]+)*$')]],
            codigo: ['', [Validators.min(1), Validators.max(999), Validators.pattern('^[0-9]+$')]]
        });
    }

    onSubmit(): void {
        if (!this.createCoinForm.valid) return
        const coin: CoinModel = this.createCoinForm.value
        console.log(coin)
        this.fetchServices.createCoin(coin).subscribe({
            next: (response) => {
                console.log("moeda criada", response)
            },
            error: (err) => console.error('Erro ao criar moeda:', err)

        })
    }

    toHome() {
        this.fetchServices.toHome()
    }
}
