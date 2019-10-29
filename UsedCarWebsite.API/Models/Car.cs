using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UsedCarWebsite.API.Models
{
    public class Car
    {
        public string Make { get; set; }
        public string Model { get; set; }
        public string Trim { get; set; }
        public  int ModelYear { get; set; }
        public string FuelType { get; set; }
        public int HorsePower { get; set; }
        public int Weight { get; set; }
        public int SeatNumber { get; set; }
        public int Mileage { get; set; }
        public string TransmissionType { get; set; }
        public string DriveType { get; set; }
        public string Colour { get; set; }
        public string BodyStyle { get; set; }
        public string RegisterNumber { get; set; }
    }
}
