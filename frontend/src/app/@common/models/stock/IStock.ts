import {ICatalogProduct, IUser} from "..";

export interface IStock {
    id: number;
    cat_product_id: number;
    user_id: number;
    description: string;
    pieces: number;
    type: number;
    created_at: string;
    updated_at: string;
    deleted_at?: any;
    user: IUser;
    product: ICatalogProduct;
}