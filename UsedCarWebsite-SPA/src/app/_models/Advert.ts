import { Photo } from './Photo';

export interface Advert {
    id: number;
    title: string;
    location: string;
    price: number;
    photoUrl: string;
    make: string;
    model: string;
    modelYear: number;
    fuelType: string;
    horsePower: number;
    weigth: number;
    seatNumber: number;
    mileage: number;
    transmissionType: string;
    driveType: string;
    colour: string;
    bodyStyle: string;
    description?: string;
    trim?: string;
    registerNumber?: string;
    photos?: Photo[];
}
