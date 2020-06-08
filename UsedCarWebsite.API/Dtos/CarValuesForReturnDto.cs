using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UsedCarWebsite.API.Models;

namespace UsedCarWebsite.API.Dtos
{
    public class CarValuesForReturnDto
    {
        public List<Colour> Colours { get; set; }
        public List<Transmission> Transmissions { get; set; }
        public List<Drive> DriveTypes { get; set; }
        public List<Fuel> FuelTypes { get; set; }
        public List<BodyStyle> BodyStyles { get; set; }
    }
}
