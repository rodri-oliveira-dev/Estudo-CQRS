using System;
using System.Threading.Tasks;
using Dapper;
using EmergingBooking.Infrastructure.Storage.SqlServer;
using EmergingBooking.Queries.Application.Reservation.ReadModel;

namespace EmergingBooking.Queries.Application.Repository
{
    internal class ReservationPersistence
    {
        private readonly ISqlServerStoreHolder _sqlServerStoreHolder;

        public ReservationPersistence(ISqlServerStoreHolder sqlServerStoreHolder)
        {
            _sqlServerStoreHolder = sqlServerStoreHolder;
        }

        public async Task<ReservationDetail> RetrieveReservationDetail(Guid reservationCode)
        {
            using (var connection = _sqlServerStoreHolder.DbConnection)
            {
                connection.Open();

                return await connection.QueryFirstOrDefaultAsync<ReservationDetail>("SELECT * FROM Booking");
            }
        }

        public async Task<ReservationDetail> RetrieveReservations(Guid roomId)
        {
            using (var connection = _sqlServerStoreHolder.DbConnection)
            {
                connection.Open();

                return await connection.QueryFirstOrDefaultAsync<ReservationDetail>("SELECT * FROM Booking");
            }
        }        
    }
}