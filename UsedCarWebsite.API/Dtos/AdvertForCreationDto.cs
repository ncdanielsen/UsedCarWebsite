using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UsedCarWebsite.API.Dtos
{
    public class AdvertForCreationDto
    {
        public int UserId { get; set; }
        public string AdvertStatus { get; set; }
        public string RegisterNumber { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public int ModelYear { get; set; }

        public int Mileage { get; set; }
    }
}
