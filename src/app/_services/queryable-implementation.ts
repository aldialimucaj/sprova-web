import { HttpClient, HttpParams } from '@angular/common/http';

import { Queryable } from 'app/_services';

export abstract class QueryableImpl implements Queryable {

    _testData: any;

    abstract fetchAll(limit?: number, skip?: number);
    abstract fetchOne(id: string);
    abstract push(model: any);
    abstract update(model: any);
    abstract remove(id: string);

    constructor(private api: string, public http: HttpClient) {
    }

    /* ************************************************************************* */
    /*                        QUERIES                                            */
    /* ************************************************************************* */

    listModels<T>(limit: number, skip: number) {
        return this.http.get<T>(this.api);
    }

    /* ************************************************************************* */
    listModelsByFilter<T>(filter: any, limit: number = 0, skip: number = 0) {
        let params = new HttpParams();
        let keys = Object.keys(filter);
        for (let key of keys) {
            params = params.set(key, filter[key]);
        }
        params = this.getParams({ limit, skip }, params);

        return this.http.get<T>(`${this.api}`, { params });
    }

    /* ************************************************************************* */
    public getModelWithQuery<T>(id: string, query: any, options?) {
        let params = this.getParams(query);
        let requestOptions : object  = { params } ;
        
        if (options) {
            requestOptions['responseType'] = options.responseType;
            requestOptions['observe'] = options.observe;
        }

        return this.http.get<T>(`${this.api}/${id}`, requestOptions);
    }

    public getModel<T>(id: string) {
        return this.http.get<T>(`${this.api}/${id}`);
    }

    /* ************************************************************************* */
    public getSubModel<T>(id: string, subPath: string, limit?: number, skip?: number, sort?: any) {
        let params = this.getParams({ limit, skip, sort });

        return this.http.get<T>(`${this.api}/${id}/${subPath}`, { params });
    }

    public getSubModelWithQuery<T>(id: string, subPath: string, query: any, options) {
        let params = this.getParams(query);
        let requestOptions = { params, responseType: undefined, observe: undefined};
        
        if (options) {
            requestOptions.responseType = options.responseType;
            requestOptions.observe = options.observe;
        }

        return this.http.get<T>(`${this.api}/${id}/${subPath}`, requestOptions);
    }

    /* ************************************************************************* */
    /*                        MUTATIONS                                          */
    /* ************************************************************************* */

    public insertModel<T>(model: any, returnDocument = undefined) {
        let params = this.getParams({ returnDocument });
        return this.http.post<T>(this.api, model, { params });
    }

    /* ************************************************************************* */
    public updateModel<T>(model: any) {
        return this.http.put<T>(`${this.api}/${model._id}`, model);
    }

    /* ************************************************************************* */
    public updateSubModel<T>(model: any, subPath: string) {
        return this.http.put<T>(this.api + subPath, model);
    }

    /* ************************************************************************* */
    public removeModel<T>(id: string) {
        return this.http.delete<T>(this.api + '/' + id);
    }

    /* ************************************************************************* */
    /*                           SEARCH                                          */
    /* ************************************************************************* */

    public searchModel<T>(url: string, model: any) {
        return this.http.post<T>(`${this.api}/${url}`, model);
    }

    /* ************************************************************************* */
    /*                           HELPERS                                         */
    /* ************************************************************************* */

    public getParams(values: Object, params?: HttpParams): HttpParams {
        if (!params) {
            params = new HttpParams();
        }
        const keys = Object.keys(values);
        for (let key of keys) {
            if (values[key] !== undefined) {
                params = params.set(key, JSON.stringify(values[key]));
            }
        }

        return params;
    }



}
