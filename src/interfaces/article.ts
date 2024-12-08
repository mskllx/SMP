import { BasicEntity } from './basicEntity';

export interface Post extends BasicEntity {
    headline: string;
    body: string;
    creatorId: string;
    categories: string[];
    excerpt?: string;
    coverImage?: string;
}
