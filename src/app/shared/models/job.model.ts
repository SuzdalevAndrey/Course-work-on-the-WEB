export class JobModel{
    constructor(       
        public userId: number,
        public nameWork: string,
        public company: string,
        public city: string,
        public salary: string,
        public additionalInformation: string,
        public responses: Responses[] = [],
        public id?: number,
    ) {}
}
export class Responses {
    constructor(
        public userIdResponses: number,
        public date: Date
    ) {}
}