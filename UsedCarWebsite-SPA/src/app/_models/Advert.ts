import { Photo } from './Photo';

export interface Advert {
    id: number;
    userId?: number;
    title?: string;
    location?: string;
    price?: number;
    photoUrl?: string;
    make?: string;
    model?: string;
    modelYear?: number;
    fuelType?: string;
    horsePower?: number;
    weight?: number;
    seatNumber?: number;
    mileage?: number;
    transmissionType?: string;
    driveType?: string;
    colour?: string;
    bodyStyle?: string;
    description?: string;
    contactInfo?: string;
    trim?: string;
    registerNumber: string;
    photos?: Photo[];
    advertStatus?: string;
}
