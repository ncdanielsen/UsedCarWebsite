import { Advert } from './Advert';

export interface User {
    id: number;
    username: string;
    birthdate: Date;
    gender: string;
    email: string;
    address?: string;
    adverts?: Advert[];
}
