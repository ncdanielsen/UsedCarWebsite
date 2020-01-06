using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UsedCarWebsite.API.Helpers
{
    public class AdvertParams
    {
		private const int MaxPageSize = 20;
        public int PageNumber { get; set; } = 1;

		private int pageSize = 10;
		public int PageSize
		{
			get { return pageSize; }
			set { pageSize = (value > MaxPageSize) ? MaxPageSize : value ;}
		}

        public string Make { get; set; }
        public string Model { get; set; }
        public string TransmissionType { get; set; }
        public string DriveType { get; set; }
        public string FuelType { get; set; }
        public string Colour { get; set; }
        public string BodyStyle { get; set; }
        public int MinPrice { get; set; } = 0;
        public int MaxPrice { get; set; } = 10000000;
        public int MinModelYear { get; set; } = 1900;
        public int MaxModelYear { get; set; } = DateTime.Now.Year + 1;
        public int MinHorsePower { get; set; } = 0;
        public int MaxHorsePower { get; set; } = 3000;
        public int MinSeatNumber { get; set; } = 1;
        public int MaxSeatNumber { get; set; } = 50;
        public int MinMileage { get; set; } = 0;
        public int MaxMileage { get; set; } = 2000000;
        public int MinWeight { get; set; } = 0;
        public int MaxWeight { get; set; } = 10000;

    }
}
