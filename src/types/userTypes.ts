export type UserType = {
    id: string
    email: string
    emailVerified: string
    image: string
    name: string
    role: string
    phoneNumber: string
    gender: string
    additionalInformation: UserAdditionalInformationType
    address: UserAddressType
    preferences: UserPreferencesType
    socialPlatforms: UserSocialPlatformsType
}

type UserAdditionalInformationType = {}
type UserAddressType = {}
type UserPreferencesType = {}
type UserSocialPlatformsType = {}
