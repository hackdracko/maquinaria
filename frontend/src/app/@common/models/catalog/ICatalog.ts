export interface ICatalog {
    id: number;
    cat_model_id: number,
    code: string;
    title: string;
    description: string;
    cicle: string;
    type: number;
    title_model?: string;
    created_at?: any;
    updated_at?: any;
    deleted_at?: any;
}