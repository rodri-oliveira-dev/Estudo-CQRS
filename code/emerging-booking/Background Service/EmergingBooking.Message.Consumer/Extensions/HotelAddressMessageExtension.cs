using EmergingBooking.Message.Consumer.Models;

namespace EmergingBooking.Message.Consumer.Extensions
{
    internal static class HotelAddressMessageExtension
    {
        internal static HotelAddressData ParserTo(this HotelAddressMessage hotelAddressMessage)
        {
            return new HotelAddressData
            {
                HotelCode = hotelAddressMessage.HotelCode,
                Street = hotelAddressMessage.Street,
                District = hotelAddressMessage.District,
                City = hotelAddressMessage.City,
                Country = hotelAddressMessage.Country,
                ZipCode = hotelAddressMessage.ZipCode
            };
        }
    }
}
