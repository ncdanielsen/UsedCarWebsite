using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UsedCarWebsite.API.Models;

namespace UsedCarWebsite.API.Dtos
{
    public class UserForDetailedDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public DateTime Birthdate { get; set; }
        public ICollection<Advert> Adverts { get; set; }
    }
}
