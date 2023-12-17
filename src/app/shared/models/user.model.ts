export class User{
    constructor(
        public name:string,
        public email:string,
        public password: string,
        public id?:number,
        public phoneNumber?: string,
        public experience?: string,
        public jobSearch?: string,
    ) {}
} 