using System;
using System.Threading.Tasks;
using EmergingBooking.Infrastructure.Cqrs.Commands;
using EmergingBooking.Management.Application.Commands;
using EmergingBooking.Management.Application.Domain;
using EmergingBooking.Management.Application.Repository;

namespace EmergingBooking.Management.Application.Handlers
{
    internal class UpdateHotelContactsHandler : ICommandHandler<UpdateHotelContacts>
    {
        private readonly HotelPersistence _hotelPersistence;

        public UpdateHotelContactsHandler(HotelPersistence hotelPersistence)
        {
            _hotelPersistence = hotelPersistence;
        }

        public async Task<Result> ExecuteAsync(UpdateHotelContacts command)
        {
            // TODO It needs to be analyzed to verify if it makes more sense send only Hotel Identifier and Address
            try
            {
                var hotel = await _hotelPersistence.RetrieveHotelByCodeAsync(command.HotelCode);

                if (hotel == null)
                    return Result.Fail("There isn't an hotel to update the Contacts");

                var contacts = Contacts.Create(command.NewEmail,
                                               command.NewPhone,
                                               command.NewMobile);

                hotel.ChangeContacts(contacts);

                await _hotelPersistence.UpdateHotelContacts(hotel);

                return Result.Ok();
            }
            catch (Exception ex)
            {
                return Result.Fail($"Error while updating the hotel's contacts");
            }
        }
    }
}