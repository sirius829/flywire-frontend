export interface Employee {
    id: number;
    name: string;
    position: string;
    active: boolean;
    directReports?: number[];
    directHires?: Employee[];
    hireDate: string;
    manager: number | undefined;
}