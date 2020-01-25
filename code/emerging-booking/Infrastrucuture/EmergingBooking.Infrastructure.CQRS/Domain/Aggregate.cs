using System;
using System.Collections.Generic;

namespace EmergingBooking.Infrastructure.Cqrs.Domain
{
    public class Aggregate : Entity
    {
        public Aggregate(Guid? identifier)
            : base(identifier)
        {
        }

        //
        private readonly List<IDomainEvent> _events = new List<IDomainEvent>();

        public IReadOnlyList<IDomainEvent> Events => _events;

        protected void AddEvent(IDomainEvent @event)
        {
            _events.Add(@event);
        }
    }
}