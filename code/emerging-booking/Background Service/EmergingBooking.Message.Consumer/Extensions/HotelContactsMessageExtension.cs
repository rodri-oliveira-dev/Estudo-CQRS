using EmergingBooking.Message.Consumer.Models;

namespace EmergingBooking.Message.Consumer.Extensions
{
    internal static class HotelContactsMessageExtension
    {
        internal static HotelContactsData ParserTo(this HotelContactsMessage hotelContactsMessage)
        {
            return new HotelContactsData
            {
                HotelCode = hotelContactsMessage.HotelCode,
                Email = hotelContactsMessage.Email,
                Phone = hotelContactsMessage.Phone,
                Mobile = hotelContactsMessage.Mobile
            };
        }
    }
}