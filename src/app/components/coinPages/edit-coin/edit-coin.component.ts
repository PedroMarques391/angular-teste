import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CoinModel } from '../../../models/CoinModel';
import { FetchService } from '../../../fetch.service';
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatIconModule } from "@angular/material/icon"
import { MatCardModule } from "@angular/material/card"
import { MatInputModule } from "@angular/material/input"
import { MatButtonModule } from "@angular/material/button"

@Component({
    selector: 'app-edit-coin',
    templateUrl: './edit-coin.component.html',
    imports: [ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatCardModule, MatInputModule, MatButtonModule],
    styleUrl: './edit-coin.component.css',
})
export class EditCoinComponent implements OnInit {
    searchForm!: FormGroup;
    showList = false
    editForm!: FormGroup;
    selectedCoin!: CoinModel[];

    constructor(
        private formBuilder: FormBuilder,
        private fetchService: FetchService
    ) { }

    ngOnInit(): void {
        this.searchForm = this.formBuilder.group({
            acronym: ['', [Validators.required, Validators.pattern('^[A-Z]{3}$')]],
        });

        this.editForm = this.formBuilder.group({
            guidEmpresa: ['', [Validators.required, Validators.maxLength(36), Validators.minLength(36)]],
            sigla: ['', [Validators.required, Validators.pattern('^[A-Z]{3}$')]],
            nome: ['', [Validators.minLength(3), Validators.maxLength(15)]],
            simbolo: ['', [Validators.pattern('^[^,]+(,[^,]+)*$')]],
            codigo: ['', [Validators.min(1), Validators.max(999), Validators.pattern('^[0-9]+$')]],
        });
    }

    onSearch(): void {
        const { acronym } = this.searchForm.value;

        if (!this.searchForm.valid) {
            return;
        }

        if (acronym) {
            this.showList = true
            this.fetchService.getCoin(acronym.toUpperCase()).subscribe({
                next: (data) => {
                    console.log(data)
                    this.selectedCoin = data
                    this.editForm.patchValue(this.selectedCoin[0])
                },
                error: (err) => {
                    console.error('Erro ao buscar moeda:', err);
                },
            })
        }
        console.log(acronym)
    }


    onSubmit(): void {
        if (!this.editForm.valid) {
            return;
        }

        const updatedCoin = this.editForm.value;

        this.fetchService.editCoin(this.selectedCoin[0].id, updatedCoin).subscribe({
            next: (response) => {
                console.log("Moeda atualizada com sucesso:", response);
            },
            error: (err) => {
                console.error("Erro ao atualizar moeda:", err);
            },
        });
    }

    toHome() {
        this.fetchService.toHome()
    }

}
