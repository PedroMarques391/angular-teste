import { Injectable } from '@angular/core';

type TUser = { email: string, password: string }

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    private storage: Storage;

    constructor() {
        this.storage = window.localStorage;
    }

    set(key: string, value: any): void {
        const serializedValue = JSON.stringify(value);
        this.storage.setItem(key, serializedValue);
    }

    get(key: string): any {
        const item = this.storage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    saveUser(user: TUser): void {
        const users = this.get("users") || []
        users.push(user)
        this.set("users", users)
    }

    getUserByEmail(email: string): TUser | null {
        const users = this.get("users") || []
        return users.find((user: TUser) => user.email.toLowerCase() === email.toLowerCase()) || null;
    }

    userExists(email: string): boolean {
        return !!this.getUserByEmail(email);
    }

    remove(key: string): void {
        this.storage.removeItem(key);
    }
}
