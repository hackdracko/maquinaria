import {ICatalog} from "..";

export interface ICatalogProduct {
    id: number;
    title: string;
    description: string;
    cat_model_id: number;
    created_at?: any;
    updated_at?: any;
    deleted_at?: any;
    model: ICatalog;
}