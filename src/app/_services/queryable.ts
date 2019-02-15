export interface Queryable {
    insertModel<T>(model: any);
    updateModel<T>(id: string, variables: any);
    getModel<T>(id: string);
    removeModel<T>(id: string);
    listModels<T>(limit: number, skip: number);
}
