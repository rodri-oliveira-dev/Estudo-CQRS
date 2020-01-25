using System;
using Newtonsoft.Json;

namespace EmergingBooking.Message.Consumer.DataModels
{
    internal class HotelMessage
    {
        public HotelMessage(Guid code, string name, int starsOfCategory,
            int starsOfRating, Address address, Contacts contacts)
        {
            Code = code;
            Name = name;
            StarsOfCategory = starsOfCategory;
            StarsOfRating = starsOfRating;
            Address = address;
            Contacts = contacts;
        }

        public Guid Code { get; }
        public string Name { get; }
        public int StarsOfCategory { get; }
        public int StarsOfRating { get; }
        public Address Address { get; }
        public Contacts Contacts { get; }
    }

    internal class Address
    {
        [JsonConstructor]
        private Address(string street, string district, string city, string country, int zipCode)
        {
            Street = street;
            District = district;
            City = city;
            Country = country;
            ZipCode = zipCode;
        }

        public string Street { get; }
        public string District { get; }
        public string City { get; }
        public string Country { get; }
        public int ZipCode { get; }
    }

    internal class Contacts
    {
        [JsonConstructor]
        private Contacts(string phone, string mobile, string email)
        {
            Phone = phone;
            Mobile = mobile;
            Email = email;
        }

        public string Mobile { get; }
        public string Phone { get; }
        public string Email { get; }
    }
}
