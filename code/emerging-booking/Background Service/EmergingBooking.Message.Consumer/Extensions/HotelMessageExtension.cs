using EmergingBooking.Message.Consumer.DataModels;

namespace EmergingBooking.Message.Consumer.Extensions
{
    internal static class HotelMessageExtension
    {
        internal static HotelData ParserTo(this HotelMessage hotelMessage)
        {
            return new HotelData
            {
                Code = hotelMessage.Code,
                Name = hotelMessage.Name,
                StarsOfCategory = hotelMessage.StarsOfCategory,
                StarsOfRating = hotelMessage.StarsOfRating,
                Street = hotelMessage.Address.Street,
                District = hotelMessage.Address.District,
                City = hotelMessage.Address.City,
                Country = hotelMessage.Address.Country,
                ZipCode = hotelMessage.Address.ZipCode,
                MobileNumber = hotelMessage.Contacts.Mobile,
                Email = hotelMessage.Contacts.Email,
                PhoneNumber = hotelMessage.Contacts.Phone
            };
        }
    }
}
