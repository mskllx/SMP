export interface Account {
    id: string;
    login: string;
    secret: string;
    role: UserRole;
}

export interface UserRole {
    accessRights: Access[];
}

export type Access = 'VIEW' | 'MODIFY' | 'CREATE' | 'REMOVE';
