using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UsedCarWebsite.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(32, MinimumLength = 8, ErrorMessage ="You must specidy a password betweem 8 and 32 characters")]
        public string Password { get; set; }
    }
}
