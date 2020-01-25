using System;
using System.Threading.Tasks;
using Dapper;
using EmergingBooking.Infrastructure.Storage.SqlServer;

namespace EmergingBooking.Message.Consumer.Repository
{
    public class RoomPersistenceSynchronizer
    {
        private readonly ISqlServerStoreHolder _sqlServerStoreHolder;

        public RoomPersistenceSynchronizer(ISqlServerStoreHolder sqlServerStoreHolder)
        {
            _sqlServerStoreHolder = sqlServerStoreHolder;
        }

        public async Task SynchronizeRoomData(Models.RoomData roomData)
        {
            try
            {
                using (var connection = _sqlServerStoreHolder.DbConnection)
                {
                    connection.Open();

                    await connection.InsertAsync<Guid, Models.RoomData>(roomData);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}