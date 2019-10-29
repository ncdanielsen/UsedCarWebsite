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

        private readonly DataContext context;
        public MainRepository(DataContext context)
        {
            this.context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            context.Remove(entity);
        }

        public async Task<Advert> GetAdvert(int id)
        {
            var advert = await context.Adverts.Include(p => p.Photos).FirstOrDefaultAsync(a => a.Id == id);

            return advert;
        }

        public async Task<IEnumerable<Advert>> GetAdverts()
        {
            var adverts = await context.Adverts.Include(p => p.Photos).ToListAsync();

            return adverts;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await context.Users.ToListAsync();

            return users;
        }

        public async Task<bool> SaveAll()
        {
            return await context.SaveChangesAsync() > 0;
        }
    }
}
