export interface User {
    id: string;
    username: string;
    password: string;
    role: Role; 
}

export interface Role {
    permissions: Permission[]; 
}

export type Permission = 'READ' | 'UPDATE' | 'WRITE' | 'DELETE';