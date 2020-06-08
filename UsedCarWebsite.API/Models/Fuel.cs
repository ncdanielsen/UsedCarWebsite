﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace UsedCarWebsite.API.Models
{
    public class Fuel
    {
        public int Id { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(20)")]
        public string FuelType { get; set; }
    }
}
