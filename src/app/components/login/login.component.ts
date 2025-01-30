import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { LoginModel } from '../../models/LoginModel';
import { MatIconModule } from '@angular/material/icon';
import { LocalStorageService } from '../../local-storage.service';


@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, MatFormFieldModule,
        MatInputModule, MatSelectModule, MatButtonModule, MatIconModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})

export class LoginComponent implements OnInit {
    loginForm!: FormGroup
    hide = signal(true);
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private localStorageService: LocalStorageService
    ) {

    }

    clickEvent(event: MouseEvent) {
        this.hide.set(!this.hide());
        event.stopPropagation();
    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    onSubmit(): void {

        const { email, password } = this.loginForm.value;
        console.log(email)
        console.log(password)
        const user = this.localStorageService.getUserByEmail(email);
        console.log(user)
        if (!user || user.password != password) {
            return
        }
        this.router.navigate(['/home']);

    }

    onChangeScreen(): void {
        this.router.navigate(['/signup']);
    }

}
