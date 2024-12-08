import { BasicContent } from '../interfaces/basicContent';
import { Account, Role, Access } from '../interfaces/account';

export type ContentManagerActions<T extends BasicContent> = {
    add(account: Account, item: T): Promise<T>;
    fetch(account: Account, id: string): Promise<T | null>;
    modify(account: Account, id: string, changes: Partial<T>): Promise<T>;
    remove(account: Account, id: string): Promise<void>;
    listAll(account: Account, filters?: any): Promise<T[]>;
};
