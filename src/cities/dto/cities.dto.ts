import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CitiesDto {
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  emoji: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsNotEmpty()
  @IsArray()
  position: { lat: number; lng: number }[];
}
