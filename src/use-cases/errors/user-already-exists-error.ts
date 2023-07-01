export class UserAlreadExistsError extends Error {
    constructor(){
        super('E-mail já existe')
    }
}