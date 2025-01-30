import { Component, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { LocalStorageService } from '../../local-storage.service';
import { MatIconModule } from '@angular/material/icon';
import { SignUpModel } from '../../models/SignUpModel';

@Component({
    selector: 'app-signup',
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css'
})
export class SignupComponent {
    signupForm!: FormGroup
    hide = signal(true);

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private localStorageService: LocalStorageService) {
    }

    ngOnInit(): void {
        this.signupForm = this.formBuilder.group(
            {
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.minLength(6)]],
                confirmPassword: ['', [Validators.required]],
            },
            {
                validator: this.passwordMatchValidator('password', 'confirmPassword'),
            }
        );
    }

    clickEvent(event: MouseEvent) {
        this.hide.set(!this.hide());
        event.stopPropagation();
    }

    passwordMatchValidator(password: string, confirmPassword: string) {
        return (formGroup: FormGroup) => {
            const passwordControl = formGroup.controls[password];
            const confirmPasswordControl = formGroup.controls[confirmPassword];

            if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
                return;
            }

            if (passwordControl.value !== confirmPasswordControl.value) {
                confirmPasswordControl.setErrors({ passwordMismatch: true });
            } else {
                confirmPasswordControl.setErrors(null);
            }
        };
    }

    onSubmit(): void {
        if (this.signupForm.valid) {
            const { email, password } = this.signupForm.value;

            if (this.localStorageService.userExists(email)) {
                return;
            }

            this.localStorageService.saveUser({ email, password });
            this.signupForm.reset();
            this.router.navigate(['/home']);
        } else {
            console.error('Formulário inválido!');
        }
    }

    onChangeScreen(): void {
        this.router.navigate(['/login']);
    }

}
