import {IEntriesType} from "./IEntriesType";
import {IEntriesUser} from "./IEntriesUser";
import {IEntriesUnit} from "./IEntriesUnit";
export interface IEntries {
    id: number;
    user_id: number;
    unit_id: number;
    type_id: number;
    lote: string;
    delivery_person: string;
    observation: string;
    quantity: number;
    type: IEntriesType;
    created_at: string;
    updated_at: string;
    deleted_at?: any;
    user: IEntriesUser;
    unit: IEntriesUnit;
}