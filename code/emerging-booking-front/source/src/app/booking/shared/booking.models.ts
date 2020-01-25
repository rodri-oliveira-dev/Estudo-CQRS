export interface RoomReservation {
    hotelCode: string;
    roomCode: string;
    checkingDate: string;
    checkoutDate: string;
    guest: string;
    breakfastIncluded: boolean;
    numberOfGuests: number;
}

export interface BookingResult {
    errorMessage: string;
    success: boolean;
    failure: boolean;
}
