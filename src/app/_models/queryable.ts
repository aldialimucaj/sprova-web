export interface Queryable {
    insertModel(model: any);
    updateModel(id: string, model: any);
    getModel(id: string);
    removeModel(id: string);
    listModels(limit: number, skip: number);
}
