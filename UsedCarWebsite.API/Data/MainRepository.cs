using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UsedCarWebsite.API.Models;

namespace UsedCarWebsite.API.Data
{
    public class MainRepository : IMainRepository
    {

        private readonly DataContext _context;
        public MainRepository(DataContext context)
        {
            this._context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Advert> GetAdvert(int id)
        {
            var advert = await _context.Adverts.Include(p => p.Photos).Include(u => u.User).FirstOrDefaultAsync(a => a.Id == id);

            return advert;
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
