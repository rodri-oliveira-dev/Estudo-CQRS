using System;
using System.Threading.Tasks;
using EmergingBooking.Infrastructure.Cqrs.Commands;
using EmergingBooking.Management.Application.Commands;
using EmergingBooking.Management.Application.Domain;
using EmergingBooking.Management.Application.Repository;

namespace EmergingBooking.Management.Application.Handlers
{
    internal class UpdateHotelAddressHandler: ICommandHandler<UpdateHotelAddress>
    {
        private readonly HotelPersistence _hotelPersistence;

        public UpdateHotelAddressHandler(HotelPersistence hotelPersistence)
        {
            _hotelPersistence = hotelPersistence;
        }

        public async Task<Result> ExecuteAsync(UpdateHotelAddress command)
        {
            //TODO It needs to be analyzed to verify if it makes more sense send only Hotel Identifier and Address
            try
            {
                var hotel = await _hotelPersistence.RetrieveHotelByCodeAsync(command.HotelCode);

                if (hotel == null)
                    return Result.Fail("There isn't an hotel to update the Address");

                var address = Address.Create(command.NewStreet,
                                             command.NewDistrict,
                                             command.NewCity,
                                             command.NewCountry,
                                             command.NewZipcode);

                hotel.ChangeAddress(address);

                await _hotelPersistence.UpdateHotelAddress(hotel);

                return Result.Ok();
            }
            catch (Exception ex)
            {
                return Result.Fail($"Error while updating the hotel's address");
            }
        }
    }
}