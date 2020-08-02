using System;
using System.Collections.Generic;

namespace Mega.Ticketing.Domain.Entities.DTO
{
    public class TicketDTO : BaseEntity<Guid>
    {
        public TicketDTO()
        {
            this.Conversations = new List<ConversationDTO>();
        }
        public int Status { get; set; }
        public string UserId { get; set; }
        public string Code { get; set; }
        public string UserName { get; set; }
        public string Title { get; set; }
        public Guid CartableId { get; set; }
        public Guid? CategoryId { get; set; }
        public string StrStatus
        {
            get
            {
                switch (Status)
                {
                    case 0:
                        return "خوانده نشده";
                    case 1:
                        return "در حال بررسی";
                    case 2:
                        return "جواب داده شده";
                    case 3:
                        return "بسته شده";
                    case 4:
                        return "بسته شده توسط سیستم";
                    default:
                        return "بدون وضعیت";
                }

            }
        }

        public List<ConversationDTO> Conversations { get; set; }
    }
}
