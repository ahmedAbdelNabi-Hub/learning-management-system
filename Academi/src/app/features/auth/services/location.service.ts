import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IGovernorate } from '../interface/locations/IGovernorate';
import { ICity } from '../interface/locations/ICity';

@Injectable({ providedIn: 'root' })
export class LocationService {
    private baseUrl = `${environment.apiUrl}/location`;

    constructor(private http: HttpClient) { }

    getGovernorates(): Observable<IGovernorate[]> {
        return this.http.get<IGovernorate[]>(`${this.baseUrl}/governorates`);
    }

    getCitiesByGovernorate(governorateId: number): Observable<ICity[]> {
        return this.http.get<ICity[]>(`${this.baseUrl}/governorates/${governorateId}/cities`);
    }
}
