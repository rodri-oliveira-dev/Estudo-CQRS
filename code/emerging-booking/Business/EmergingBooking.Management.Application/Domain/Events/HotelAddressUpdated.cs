using System;
using EmergingBooking.Infrastructure.Cqrs.Domain;

namespace EmergingBooking.Reservation.Application.Domain.Events
{
    public sealed class HotelAddressUpdated : IDomainEvent
    {
        public Guid HotelCode { get; }
        public string Street { get; }
        public string District { get; }
        public string City { get; }
        public string Country { get; }
        public int ZipCode { get; }

        public HotelAddressUpdated(Guid hotelCode, string street, string district,
            string city, string country, int zipCode)
        {
            HotelCode = hotelCode;
            Street = street;
            District = district;
            City = city;
            Country = country;
            ZipCode = zipCode;
        }
    }
}
