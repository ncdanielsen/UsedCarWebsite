﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UsedCarWebsite.API.Models
{
    public class Advert
    {
        public int Id { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public string AdvertStatus { get; set; }
        public string RegisterNumber { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ContactInfo { get; set; }
        public string Location { get; set; }
        public int Price { get; set; }
        public DateTime DateCreated { get; set; }
        public ICollection<Photo> Photos { get; set; }

        //Car specifics
        public string Make { get; set; }
        public string Model { get; set; }
        public string Trim { get; set; }
        public int ModelYear { get; set; }
        public string TransmissionType { get; set; }
        public string DriveType { get; set; }
        public string FuelType { get; set; }
        public int HorsePower { get; set; }
        public string Colour { get; set; }
        public string BodyStyle { get; set; }
        public int SeatNumber { get; set; }
        public int Mileage { get; set; }
        public int Weight { get; set; }
    }
}
