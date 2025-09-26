
export interface IStage {
    id: number;
    name: string;
    divisionCount: number;
}
export interface IDivision {
    id: number;
    name: string;
    stageId: number;
}