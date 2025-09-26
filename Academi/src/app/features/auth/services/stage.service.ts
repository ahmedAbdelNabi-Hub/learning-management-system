import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { IStage, IDivision } from "../interface/stage/IDivision";

@Injectable({
    providedIn: 'root'
})
export class StageService {
    private baseUrl = `${environment.apiUrl}/stages`;

    constructor(private http: HttpClient) { }

    getStages(): Observable<IStage[]> {
        return this.http.get<IStage[]>(this.baseUrl);
    }

    getDivisionsByStage(stageId: number): Observable<IDivision[]> {
        return this.http.get<IDivision[]>(`${this.baseUrl}/${stageId}/divisions`);
    }
}