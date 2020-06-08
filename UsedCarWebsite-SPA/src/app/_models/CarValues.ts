import { Transmission } from './Transmission';
import { Colour } from './Colour';
import { DriveType } from './DriveType';
import { FuelType } from './FuelType';
import { Observable } from 'rxjs';
import { BodyStyle } from './BodyStyle';

export class CarValues {
    colours?: Colour[];
    transmissions?: Transmission[];
    driveTypes?: DriveType[];
    fuelTypes?: FuelType[];
    bodyStyles?: BodyStyle[];
}
