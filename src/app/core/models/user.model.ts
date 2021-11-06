export interface User {
    id: string
    email: string,
    firstName: string,
    lastName: string,
    middleName: string,
    roles: Role[]
}

export interface Role {
    authority: string,
    name: string
}