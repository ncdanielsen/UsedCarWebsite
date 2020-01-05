using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UsedCarWebsite.API.Models;

namespace UsedCarWebsite.API.Dtos
{
    public class AdvertForListDto
    {
        public int Id { get; set; }
        public string PostedByUser { get; set; }
        public int UserId { get; set; }
        public string AdvertStatus { get; set; }
        public string Title { get; set; }
        public string Location { get; set; }
        public int Price { get; set; }
        public DateTime DateCreated { get; set; }
        public string PhotoUrl { get; set; }

        public string Make { get; set; }
        public string Model { get; set; }
        public int ModelYear { get; set; }
        public string FuelType { get; set; }
        public int HorsePower { get; set; }
        public int SeatNumber { get; set; }
        public int Mileage { get; set; }
        public string TransmissionType { get; set; }
        public string DriveType { get; set; }
        public string Colour { get; set; }
        public string BodyStyle { get; set; }
    }
}
