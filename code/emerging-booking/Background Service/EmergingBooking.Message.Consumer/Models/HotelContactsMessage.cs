using System;

namespace EmergingBooking.Message.Consumer.Models
{
    public class HotelContactsMessage
    {
        public Guid HotelCode { get; }
        public string Email { get; }
        public string Phone { get; }
        public string Mobile { get; }

        public HotelContactsMessage(Guid hotelCode, string email, string phone,
            string mobile)
        {
            HotelCode = hotelCode;
            Email = email;
            Phone = phone;
            this.Mobile = mobile;
        }
    }
}
