export interface CarSpecifications {
  brand: string;
  model: string;
  trim: string;
  year: string;
  color: string;
  mileage: number;
}

export interface CarCondition {
  bodyParts: Record<string, string>;
  chassisParts: Record<string, string>;
  upperChassis: Record<string, string>;
  otherParts: {
    frontApron?: string;
    rearApron?: string;
    plateAndApron?: string;
    isAuction?: boolean;
  };
}

export interface CarData {
  specifications: CarSpecifications;
  condition: CarCondition;
  estimatedPrice?: {
    min: number;
    max: number;
  };
}

export interface ReplacementCar {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  image: string;
  difference: number;
  isFavorite?: boolean;
  isComparing?: boolean;
  hasOffer?: boolean;
}

export type DamageType = 'healthy' | 'minor' | 'paint' | 'replace' | 'spray';
export type ChassisStatus = 'healthy' | 'damage' | 'minor' | 'replace' | 'spray';