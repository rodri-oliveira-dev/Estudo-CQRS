using EmergingBooking.Infrastructure.Cqrs.Domain;

namespace EmergingBooking.Reservation.Application.Domain.Events
{
    internal class ReservationCreated : IDomainEvent
    {
        public string Code { get; }
        public string BookedBy { get; }
        public int NumberOfGuests { get; }
        public int NumberOfNights { get; }
        public decimal PricePerNight { get; }
        public decimal PaidPrice { get; }
        public bool BreakfastIncluded { get; }
        public Period LengthOfPeriod { get; }
        public BookedHotel BookedHotel { get; }
        public BookedRoom BookedRoom { get; }

        public ReservationCreated(string code, string bookedBy, int numberOfGuests,
            int numberOfNights, decimal pricePerNight, decimal paidPrice, bool breakfastIncluded,
            Period lengthOfPeriod, BookedHotel bookedHotel, BookedRoom bookedRoom)
        {
            Code = code;
            BookedBy = bookedBy;
            NumberOfGuests = numberOfGuests;
            NumberOfNights = numberOfNights;
            PricePerNight = pricePerNight;
            PaidPrice = paidPrice;
            BreakfastIncluded = breakfastIncluded;
            LengthOfPeriod = lengthOfPeriod;
            BookedHotel = bookedHotel;
            BookedRoom = bookedRoom;
        }
    }
}
