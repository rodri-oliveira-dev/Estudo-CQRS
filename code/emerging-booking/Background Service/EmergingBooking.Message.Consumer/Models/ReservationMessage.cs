
using System;
using Newtonsoft.Json;

namespace EmergingBooking.Message.Consumer.Models
{
    internal class ReservationMessage
    {
        public string Code { get; }
        public string BookedBy { get; }
        public int NumberOfGuests { get; }
        public int NumberOfNights { get; }
        public decimal PricePerNight { get; }
        public decimal PaidPrice { get; }
        public bool BreakfastIncluded { get; }
        public Period LengthOfPeriod { get; }
        public BookedHotel BookedHotel { get; }
        public BookedRoom BookedRoom { get; }

        public ReservationMessage(string code, string bookedBy, int numberOfGuests,
            int numberOfNights, decimal pricePerNight, decimal paidPrice, bool breakfastIncluded,
            Period lengthOfPeriod, BookedHotel bookedHotel, BookedRoom bookedRoom)
        {
            Code = code;
            BookedBy = bookedBy;
            NumberOfGuests = numberOfGuests;
            NumberOfNights = numberOfNights;
            PricePerNight = pricePerNight;
            PaidPrice = paidPrice;
            BreakfastIncluded = breakfastIncluded;
            LengthOfPeriod = lengthOfPeriod;
            BookedHotel = bookedHotel;
            BookedRoom = bookedRoom;
        }
    }



    internal class BookedRoom
    {
        [JsonConstructor]
        public BookedRoom(Guid code, string description, int capacity, decimal pricePerNight)
        {
            Code = code;
            Description = description;
            Capacity = capacity;
            PricePerNight = pricePerNight;
        }

        public Guid Code { get; }
        public string Description { get; }
        public int Capacity { get; }
        public decimal PricePerNight { get; }
    }

    internal class BookedHotel
    {
        [JsonConstructor]
        public BookedHotel(string name, string address, int starsOfCategory)
        {
            Name = name;
            Address = address;
            StarsOfCategory = starsOfCategory;
        }

        public string Name { get; }
        public string Address { get; }
        public int StarsOfCategory { get; }
    }

    internal class Period
    {
        [JsonConstructor]
        private Period(DateTime checkin, DateTime checkout)
        {
            if (checkin == DateTime.MinValue)
                throw new InvalidOperationException($"The {nameof(checkin)} date MUST be filled");

            if (checkout == DateTime.MinValue)
                throw new InvalidOperationException($"The {nameof(checkout)} date MUST be filled");

            if (checkin > checkout)
                throw new InvalidOperationException($"The {nameof(checkin)} date MUST not be greater than {nameof(checkout)} date");

            Checkin = checkin;
            Checkout = checkout;
        }

        public static Period Create(DateTime checkin, DateTime checkout)
        {
            return new Period(checkin, checkout);
        }

        public DateTime Checkin { get; }
        public DateTime Checkout { get; }
    }


}