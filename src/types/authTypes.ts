import { RolesEnum } from '@/enums';
import { VariantType } from '@/types/variantTypes';

export interface AccessTokenType {
    id: string;
    email: string;
    role: RolesEnum;
    variants: VariantType[];
}