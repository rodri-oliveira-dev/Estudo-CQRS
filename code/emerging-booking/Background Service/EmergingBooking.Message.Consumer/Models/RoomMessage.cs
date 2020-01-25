using System;
using System.Collections.Generic;

namespace EmergingBooking.Message.Consumer.Models
{
    public class RoomMessage
    {
        public Guid Code { get; }
        public Guid HotelCode { get; }
        public string Name { get; }
        public string Description { get; }
        public decimal PricePerNight { get; }
        public int Capacity { get; }
        public int AvailableQuantity { get; }
        public IReadOnlyList<string> Amenities { get; }

        public RoomMessage(Guid code, Guid hotelCode, string name, string description,
            decimal pricePerNight, int capacity, int availableQuantity,
            IReadOnlyList<string> amenities)
        {
            Code = code;
            HotelCode = hotelCode;
            Name = name;
            Description = description;
            PricePerNight = pricePerNight;
            Capacity = capacity;
            AvailableQuantity = availableQuantity;
            Amenities = amenities;
        }
    }
}
