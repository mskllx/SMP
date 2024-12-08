import { Account, Role, Access } from '../interfaces/account';

export function checkAccess(account: Account, access: Access): boolean {
    return account.role.access.includes(access);
}
