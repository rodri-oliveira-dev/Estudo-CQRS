using EmergingBooking.Message.Consumer.Models;

namespace EmergingBooking.Message.Consumer.Extensions
{
    internal static class ReservationMessageExtension
    {
        internal static ReservationData ParserTo(this ReservationMessage roomMessage)
        {
            return new ReservationData
            {
                Code = roomMessage.Code,
                BookedBy = roomMessage.BookedBy,
                BreakfastIncluded = roomMessage.BreakfastIncluded,
                Checkin = roomMessage.LengthOfPeriod.Checkin,
                Checkout = roomMessage.LengthOfPeriod.Checkout,
                HotelAddress = roomMessage.BookedHotel.Address,
                HotelName = roomMessage.BookedHotel.Name,
                HotelStarsOfCategory = roomMessage.BookedHotel.StarsOfCategory,
                NumberOfGuests = roomMessage.NumberOfGuests,
                NumberOfNights = roomMessage.NumberOfNights,
                PaidPrice = roomMessage.PaidPrice,
                PricePerNight = roomMessage.PricePerNight,
                RoomCapacity = roomMessage.BookedRoom.Capacity,
                RoomDescription = roomMessage.BookedRoom.Description
            };
        }
    }
}
