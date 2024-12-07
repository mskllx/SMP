import {User,Role,Permission} from '../interfaces/user';

export function hasPermission(user:User,permission:Permission): boolean{
    return user.role.permissions.includes(permission);
}