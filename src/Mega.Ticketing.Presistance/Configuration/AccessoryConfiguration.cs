using Mega.Ticketing.Domain.Entities;
using System.Data.Entity.ModelConfiguration;

namespace Mega.Ticketing.Presistance.Configuration
{
    /// <summary>
    /// Database SQL Server Mapping the POCO Object for Accessory
    /// </summary>
    internal sealed class AccessoryConfiguration : EntityTypeConfiguration<Accessory>
    {
        internal AccessoryConfiguration()
        {
            HasKey(x => x.Id);
            ToTable("Accessory", "FileManagement");
            Property(p => p.RowVersion)
            .IsFixedLength();


            //Relations
            //One to many relation between Conversation(One) and Accessory(Many)
            HasRequired(x => x.Conversation).WithMany(x => x.Accessories).HasForeignKey(x => x.ConversationId);

        }
    }
}
