using System;

namespace UsedCarWebsite.API.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public Boolean IsMain { get; set; }
        public string PublicId { get; set; }
        public Advert Advert { get; set; }
        public int AdvertId { get; set; }

    }
}