import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  IsNumber,
} from 'class-validator';

import { Type } from 'class-transformer';

class PositionDto {
  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;
}

export class CitiesDto {
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  countryCode: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PositionDto)
  position: PositionDto;
}
