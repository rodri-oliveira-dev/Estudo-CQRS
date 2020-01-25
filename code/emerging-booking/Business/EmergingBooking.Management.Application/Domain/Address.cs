using System;
using System.Collections.Generic;
using EmergingBooking.Infrastructure.Cqrs.Domain;
using Newtonsoft.Json;

namespace EmergingBooking.Management.Application.Domain
{
    internal class Address : ValueObject
    {
        [JsonConstructor]
        private Address(string street, string district, string city, string country, int zipCode)
        {
            // TODO It is needed to implement a validation result here instead of throw new exception

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

        public static Address Create(string street, string district, string city, string country, int zipCode)
        {
            return new Address(street, district, city, country, zipCode);
        }

        protected override IEnumerable<object> GetEqualityProperties()
        {
            yield return Street;
            yield return District;
            yield return City;
            yield return Country;
            yield return ZipCode;
        }

        public override string ToString()
        {
            return $"{Street}{Environment.NewLine}," +
                   $"{District}{Environment.NewLine}," +
                   $"{City}{Environment.NewLine}," +
                   $"{Country}{Environment.NewLine}," +
                   $"{ZipCode}";
        }
    }
}