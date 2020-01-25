using System;
using EmergingBooking.Infrastructure.Cqrs.Domain;
using EmergingBooking.Management.Application.Domain;

namespace EmergingBooking.Reservation.Application.Domain.Events
{
    internal sealed class HotelCreated : IDomainEvent
    {
        public Guid Code { get; }
        public string Name { get; }
        public int StarsOfCategory { get; }
        public int StarsOfRating { get; }
        public Address Address { get; }
        public Contacts Contacts { get; set; }
        
        public HotelCreated(Guid code, string name, int starsOfCategory, int starsOfRating,
            Address address, Contacts contacts)
        {
            Code = code;
            Name = name;
            StarsOfCategory = starsOfCategory;
            StarsOfRating = starsOfRating;

            Address = address;
            Contacts = contacts;
        }
    }
}