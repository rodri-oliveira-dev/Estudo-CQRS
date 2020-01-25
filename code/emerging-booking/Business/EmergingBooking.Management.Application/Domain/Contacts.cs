using System.Collections.Generic;
using EmergingBooking.Infrastructure.Cqrs.Domain;
using Newtonsoft.Json;

namespace EmergingBooking.Management.Application.Domain
{
    internal class Contacts : ValueObject
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

        public static Contacts Create(string phone, string mobile, string email)
        {
            return new Contacts(phone, mobile, email);
        }

        protected override IEnumerable<object> GetEqualityProperties()
        {
            yield return Mobile;
            yield return Phone;
            yield return Email;
        }
    }
}