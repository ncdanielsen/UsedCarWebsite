using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UsedCarWebsite.API.Models;

namespace UsedCarWebsite.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options)
        {

        }

        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Advert> Adverts { get; set; }
        //public DbSet<Car> Cars { get; set; }
        public DbSet<Photo> Photos { get; set; }
    }
}
