using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UsedCarWebsite.API.Models
{
    public class Colour
    {
        public int Id { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(40)")]
        public string ColourName { get; set; }
    }
}
