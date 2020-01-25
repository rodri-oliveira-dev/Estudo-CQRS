export interface Hotel {
    name: string;
    starsOfCategory: number;
    street: string;
    district: string;
    city: string;
    country: string;
    zipcode: number;
    email: string;
    phone: string;
    mobile: string;
}

export interface HotelResult {
    errorMessage: string;
    success: boolean;
    failure: boolean;
}

export interface HotelAddress {
    street: string;
    district: string;
    city: string;
    country: string;
    zipcode: number;
}

export interface HotelContact {
    email: string;
    phone: string;
    mobile: string;
}

export interface HotelRoom {
    name: string;
    description: string;
    capacity: number;
    availableQuantity: number;
    pricePerNight: number;
    amenities: string[];
}

export interface HotelListItem {
    code: string;
    name: string;
    starsOfCategory: number;
    starsOfRating: number;
    addressStreet: string;
    addressDistrict: string;
    addressCity: string;
    addressCountry: string;
    zipCode: number;
    contactMobile: string;
    contactPhone: string;
    contactEmail: string;
}

export interface RoomListItem {
    code: string;
    hotelCode: string;
    name: string;
    description: string;
    capacity: number;
    availableQuantity: number;
    pricePerNight: number;
    amenities: string;
}

