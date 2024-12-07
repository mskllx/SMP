import { BaseContent } from '../interfaces/baseContent';
import {User,Role,Permission} from '../interfaces/user';

export type ContentOperations<T extends BaseContent> = {
    create(user:User,item: T): Promise<T>;
    read(user:User,id: string): Promise<T | null>;
    update(user:User,id: string, updates: Partial<T>): Promise<T>;
    delete(user:User,id: string): Promise<void>;
    list(user:User,params?: any): Promise<T[]>;
};