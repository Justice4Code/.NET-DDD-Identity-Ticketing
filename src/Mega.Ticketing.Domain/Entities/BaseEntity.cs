using System;
using System.ComponentModel.DataAnnotations;

namespace Mega.Ticketing.Domain.Entities
{
    public abstract class BaseEntity<T> where T : struct
    {
        public T Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string CreatedBy { get; set; }
        public Guid ModifiedBy { get; set; }
        public bool IsActive { get; set; }
        [Timestamp]
        public byte[] RowVersion { get; set; }
    }
}
