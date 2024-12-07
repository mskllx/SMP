import { BaseContent } from './baseContent';

export type Versioned<T extends BaseContent> = T & {
    version: number;
};