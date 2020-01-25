using System;
using System.Threading.Tasks;
using EmergingBooking.Infrastructure.Cqrs.Commands;
using EmergingBooking.Management.Application.Commands;
using EmergingBooking.Management.Application.Domain;
using EmergingBooking.Management.Application.Repository;

namespace EmergingBooking.Management.Application.Handlers
{
    internal class CreateHotelHandler : ICommandHandler<CreateHotel>
    {
        private readonly HotelPersistence _hotelPersistence;

        public CreateHotelHandler(HotelPersistence hotelPersistence)
        {
            _hotelPersistence = hotelPersistence;
        }

        public async Task<Result> ExecuteAsync(CreateHotel command)
        {
            try
            {
                var address = Address.Create(command.Street,
                                             command.District,
                                             command.City,
                                             command.Country,
                                             command.Zipcode);

                var contacts = Contacts.Create(command.Phone,
                                                     command.Mobile,
                                                     command.Email);


                var hotel = new Hotel(command.Name,
                                      command.StarsOfCategory,
                                      address,
                                      contacts);

                await _hotelPersistence.CreateHotelAsync(hotel);

                return Result.Ok();
            }
            catch (Exception ex)
            {
                return Result.Fail($"Error while creating a hotel");
            }
        }
    }
}