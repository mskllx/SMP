import { BasicEntity } from './basicEntity';

export type Tracked<T extends BasicEntity> = T & {
    revision: number;
};
