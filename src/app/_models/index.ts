export * from './artifact.model';
export * from './project.model';
export * from './cycle.model';
export * from './testcase.model';
export * from './execution.model';
export * from './user.model';
export * from './testset.model';
export * from './testset-execution.model';
export * from './tree-node.model';
export * from './project-report.model';
export * from './cycle-report.model';
export * from './testset-report.model';
export * from './queryable';


export interface InsertResponse {
    _id: string,
    ok: number,
    n: number,
    data: any
}

export interface RemoveResponse {
    ok: number,
    n: number
}
