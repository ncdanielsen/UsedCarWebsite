using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UsedCarWebsite.API.Dtos
{
    public class UserForUpdateDto
    {
        public string Username { get; set; }
        public DateTime Birthdate { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
    }
}
