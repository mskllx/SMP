import { BasicEntity } from './basicEntity';

export interface Item extends BasicEntity {
    title: string;
    details: string;
    cost: number;
    identifier: string;
    availability: number;
    group?: string;
    photos?: string[];
}
