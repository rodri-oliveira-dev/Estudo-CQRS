using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using EmergingBooking.Infrastructure.Storage.SqlServer;
using EmergingBooking.Queries.Application.Hotel.ReadModel;

namespace EmergingBooking.Queries.Application.Repository
{
    public class HotelPersistence
    {
        private readonly ISqlServerStoreHolder _sqlServerStoreHolder;

        public HotelPersistence(ISqlServerStoreHolder sqlServerStoreHolder)
        {
            _sqlServerStoreHolder = sqlServerStoreHolder;
        }

        public async Task<IEnumerable<HotelListItem>> RetrieveHotels()
        {
            using (var connection = _sqlServerStoreHolder.DbConnection)
            {
                connection.Open();

                return await connection.QueryAsync<HotelListItem>("SELECT * FROM Hotels");
            }
        }

        public async Task<IEnumerable<RoomListItem>> RetrieveRooms(Guid hotelCode)
        {
            using (var connection = _sqlServerStoreHolder.DbConnection)
            {
                connection.Open();

                return await connection
                    .QueryAsync<RoomListItem>("SELECT * FROM Rooms Where HotelCode = @hotelCode",
                    new { hotelCode });
            }
        }
    }
}
