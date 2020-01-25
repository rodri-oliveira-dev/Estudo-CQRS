using System;
using System.Threading.Tasks;
using EmergingBooking.Infrastructure.Cqrs.Commands;
using EmergingBooking.Management.Application.Commands;
using EmergingBooking.Management.Application.Domain;
using EmergingBooking.Management.Application.Repository;

namespace EmergingBooking.Management.Application.Handlers
{
    internal class AddRoomToHotelHandler : ICommandHandler<AddRoomToHotel>
    {
        private readonly HotelPersistence _hotelPersistence;

        public AddRoomToHotelHandler(HotelPersistence hotelPersistence)
        {
            _hotelPersistence = hotelPersistence;
        }

        public async Task<Result> ExecuteAsync(AddRoomToHotel command)
        {
            try
            {
                // TODO Verify why Amenities aren't being loaded while loading a Room
                var searchedHotel = await _hotelPersistence.RetrieveHotelByCodeAsync(command.HotelCode);

                if (searchedHotel == null)
                    return Result.Fail("There isn't an hotel to add a new room");

                var room = new Room(command.Name,
                                    command.Description,
                                    command.Capacity,
                                    command.AvailableQuantity,
                                    command.PricePerNight);

                foreach (string amenity in command.Amenities)
                {
                    room.AddAmenities(amenity);
                }

                searchedHotel.AddRoom(room);

                await _hotelPersistence.AddRoomToHotel(searchedHotel);

                return Result.Ok();
            }
            catch (Exception ex)
            {
                return Result.Fail($"Error while creating a hotel");
            }
        }
    }
}