using System;
using EmergingBooking.Infrastructure.Cqrs.Queries;

namespace EmergingBooking.Queries.Application.Reservation.Query
{
    public class RetrieveReservationDetail : IQuery
    {
        public Guid ReservationCode { get; }

        public RetrieveReservationDetail(Guid reservationCode)
        {
            ReservationCode = reservationCode;
        }
    }
}
