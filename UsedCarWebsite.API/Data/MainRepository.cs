using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UsedCarWebsite.API.Helpers;
using UsedCarWebsite.API.Models;

namespace UsedCarWebsite.API.Data
{
    public class MainRepository : IMainRepository
    {

        private readonly DataContext _context;
        public MainRepository(DataContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }
        public async Task<Advert> AddAdvert(Advert advert)
        {
            await _context.Adverts.AddAsync(advert);
            await _context.SaveChangesAsync();

            return advert;
        }

        public async Task<Advert> GetAdvert(int id)
        {
            var advert = await _context.Adverts.Include(p => p.Photos).Include(u => u.User).FirstOrDefaultAsync(a => a.Id == id);

            return advert;
        }

        public async Task<PagedList<Advert>> GetActiveAdverts(AdvertParams advertParams)
        {
            var adverts = _context.Adverts.Where(a => a.AdvertStatus.ToLower() == "active").Include(p => p.Photos).Include(u => u.User).AsQueryable();

            Console.WriteLine("ABIBVIABIVBAU " + advertParams.Make);
            if(advertParams.Make != null && advertParams.Make != "")
            {
                adverts = adverts.Where(a => a.Make.ToLower().Contains(advertParams.Make.ToLower()));
            }
            if (advertParams.Model != null && advertParams.Model != "")
            {
                adverts = adverts.Where(a => a.Model.ToLower().Contains(advertParams.Model.ToLower()));
            }
            if (advertParams.TransmissionType != null && advertParams.TransmissionType != "")
            {
                Console.WriteLine("TRANSMISSION: " + advertParams.TransmissionType + " Something");
                adverts = adverts.Where(a => a.TransmissionType.ToLower() == advertParams.TransmissionType.ToLower());
            }
            if (advertParams.FuelType != null && advertParams.FuelType != "")
            {
                adverts = adverts.Where(a => a.FuelType.ToLower() == advertParams.FuelType.ToLower());
            }
            if (advertParams.DriveType != null && advertParams.DriveType != "")
            {
                adverts = adverts.Where(a => a.DriveType.ToLower() == advertParams.DriveType.ToLower());
            }
            if (advertParams.Colour != null && advertParams.Colour != "")
            {
                adverts = adverts.Where(a => a.Colour.ToLower() == advertParams.Colour.ToLower());
            }
            if (advertParams.BodyStyle != null && advertParams.BodyStyle != "")
            {
                adverts = adverts.Where(a => a.BodyStyle.ToLower() == advertParams.BodyStyle.ToLower());
            }

            if (advertParams.MinPrice != 0 || advertParams.MaxPrice != 10000000)
            {
                adverts = adverts.Where(a => a.Price >= advertParams.MinPrice && a.Price <= advertParams.MaxPrice);
            }
            if (advertParams.MinModelYear != 1900 || advertParams.MaxModelYear != DateTime.Now.Year + 1)
            {
                adverts = adverts.Where(a => a.ModelYear >= advertParams.MinModelYear && a.ModelYear <= advertParams.MaxModelYear);
            }
            if (advertParams.MinHorsePower != 0 || advertParams.MaxHorsePower != 3000)
            {
                adverts = adverts.Where(a => a.HorsePower >= advertParams.MinHorsePower && a.HorsePower <= advertParams.MaxHorsePower);
            }
            if (advertParams.MinSeatNumber != 1 || advertParams.MaxSeatNumber != 50)
            {
                adverts = adverts.Where(a => a.SeatNumber >= advertParams.MinSeatNumber && a.SeatNumber <= advertParams.MaxSeatNumber);
            }
            if (advertParams.MinMileage != 0 || advertParams.MaxMileage != 20000000)
            {
                adverts = adverts.Where(a => a.Mileage >= advertParams.MinMileage && a.Mileage <= advertParams.MaxMileage);
            }
            if (advertParams.MinWeight != 0 || advertParams.MaxWeight != 10000)
            {
                adverts = adverts.Where(a => a.Weight >= advertParams.MinWeight && a.Weight <= advertParams.MaxWeight);
            }

            return await PagedList<Advert>.CreateAsync(adverts, advertParams.PageNumber, advertParams.PageSize);
        }

        public async Task<IEnumerable<Advert>> GetAdverts()
        {
            var adverts = await _context.Adverts.Include(p => p.Photos).Include(u => u.User).ToListAsync();

            return adverts;
        }

        public async Task<Photo> GetMainPhotoForAdvert(int advertId)
        {
            var photo = await _context.Photos.Where(p => p.AdvertId == advertId).FirstOrDefaultAsync(p => p.IsMain);

            return photo;
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);

            return photo;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.Include(a => a.Adverts).FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();

            return users;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

    }
}
