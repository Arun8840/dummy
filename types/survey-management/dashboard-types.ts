export interface DashboardValue {
    dataid: string | null;
    label: string;
    data: number;
    color: string;
}

export interface DashboardResponse {
    title: string;
    id: string;
    containerId: string;
    values: DashboardValue[];
}
