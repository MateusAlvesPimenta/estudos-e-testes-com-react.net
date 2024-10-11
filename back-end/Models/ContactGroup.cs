namespace FS_React_Net.Models
{
    public class ContactGroup
    {
        public int ContactId { get; set; }
        public Contact Contact { get; set; }
        public int GroupId { get; set; }
        public Group Group { get; set; }
    }
}