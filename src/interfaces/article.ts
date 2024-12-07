import { BaseContent } from './baseContent';

export interface Article extends BaseContent {
    title: string;
    content: string;
    authorId: string;
    tags: string[];
    summary?: string;
    imageUrl?: string;
}