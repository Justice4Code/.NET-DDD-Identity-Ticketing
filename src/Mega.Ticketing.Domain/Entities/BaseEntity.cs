using Mega.Ticketing.Domain.Infrastructure;
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
        public string CreatedDatePersian
        {
            get
            {
                if (CreatedDate != new DateTime())
                    return CreatedDate.ToPersianShort();
                return "";
            }
            set
            {
                try
                {
                    CreatedDate = PersianDate.GetDate(value).MiladyDate;
                }
                catch { }
            }
        }


    }
}
