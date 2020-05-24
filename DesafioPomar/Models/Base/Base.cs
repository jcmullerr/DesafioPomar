using System.ComponentModel.DataAnnotations;

namespace DesafioPomar.Models
{
    public class Base
    {
        [Key]
        public long ? Id { get; set; }
    }
}