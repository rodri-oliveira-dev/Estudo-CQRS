using System;
using System.Linq;
using System.Threading.Tasks;
using EmergingBooking.Infrastructure.Cqrs.Commands;
using EmergingBooking.Reservation.Application.Commands;
using EmergingBooking.Reservation.Application.Domain;
using EmergingBooking.Reservation.Application.Repository;

namespace EmergingBooking.Reservation.Application.Handlers
{
    internal class ReservationHandler :
        ICommandHandler<MakeRoomReservation>,
        ICommandHandler<CancelReservation>
    {
        private readonly ReservationPersistence _reservationPersistence;
        private readonly HotelPersistence _hotelPersistence;

        public ReservationHandler(
            ReservationPersistence reservationPersistence,
            HotelPersistence hotelPersistence)
        {
            _hotelPersistence = hotelPersistence;
            _reservationPersistence = reservationPersistence;
        }

        public async Task<Result> ExecuteAsync(MakeRoomReservation command)
        {
            try
            {
                var lengthOfStay = Period.Create(command.CheckingDate, command.CheckoutDate);

                bool roomIsAvailable =
                    await _reservationPersistence.CheckAvailabilityRoomAsync(lengthOfStay, command.RoomCode);

                if (!roomIsAvailable)
                    return Result.Fail($"This room was booked for this same period: {lengthOfStay}");

                var hotelAndRoomDetail =
                    await _hotelPersistence.RetrieveHotelAndRoomByCodeAsync(command.HotelCode,
                                                                            command.RoomCode);

                var bookedHotel = new BookedHotel(hotelAndRoomDetail.Name,
                                                  hotelAndRoomDetail.Address.ToString(),
                                                  hotelAndRoomDetail.StarsOfCategory);

                var selectedRoom = hotelAndRoomDetail.Rooms
                                                     .Where(x => x.Code == command.RoomCode)
                                                     .FirstOrDefault();

                var bookedRoom = new BookedRoom(selectedRoom.Code,
                                                selectedRoom.Description,
                                                selectedRoom.Capacity,
                                                selectedRoom.PricePerNight);

                var reservation = new ReservationDetail(bookedHotel,
                                                        bookedRoom,
                                                        lengthOfStay,
                                                        command.Guest,
                                                        command.NumberOfGuests,
                                                        command.BreakfastIncluded);

                await _reservationPersistence.SaveReservationAsync(reservation);

                return Result.Ok();
            }
            catch (Exception ex)
            {
                return Result.Fail($"Error while reserving a room " + ex.Message);
            }
        }

        public async Task<Result> ExecuteAsync(CancelReservation command)
        {
            // TODO Retrieve whole reservation to be canceled

            await _reservationPersistence.CancelReservation(command.ReservationCode);

            return Result.Ok();
        }
    }
}