import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoinModel } from './models/CoinModel';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class FetchService {
    private baseUrl = "https://json-server-api-dun.vercel.app/moedas"

    constructor(private http: HttpClient, private router: Router) { }

    getCoins(): Observable<CoinModel[]> {
        return this.http.get<CoinModel[]>(this.baseUrl);
    }
    getCoin(acronym: string): Observable<CoinModel[]> {
        return this.http.get<CoinModel[]>(`${this.baseUrl}?sigla=${acronym}`);
    }
    createCoin(coin: Partial<CoinModel>): Observable<CoinModel> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<CoinModel>(this.baseUrl, coin, { headers });
    }
    editCoin(id: string, coin: Partial<CoinModel>): Observable<CoinModel> {
        console.log(coin)
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<CoinModel>(`${this.baseUrl}/${id}`, coin, { headers });
    }

    toHome() {
        return this.router.navigate(['/home']);
    }
}
