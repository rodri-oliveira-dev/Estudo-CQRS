using EmergingBooking.Message.Consumer.Models;

namespace EmergingBooking.Message.Consumer.Extensions
{
    internal static class RoomMessageExtension
    {
        internal static RoomData ParserTo(this RoomMessage roomMessage)
        {
            return new RoomData
            {
                Code = roomMessage.Code,
                Name = roomMessage.Name,
                AvailableQuantity = roomMessage.AvailableQuantity,
                Capacity = roomMessage.Capacity,
                Description = roomMessage.Description,
                HotelCode = roomMessage.HotelCode,
                PricePerNight = roomMessage.PricePerNight,
                Amenities = string.Join("|", roomMessage.Amenities)
            };
        }
    }
}
