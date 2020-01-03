using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UsedCarWebsite.API.Models;

namespace UsedCarWebsite.API.Data
{
    public interface IMainRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;

        Task<Advert> AddAdvert(Advert advert);
        Task<bool> SaveAll();
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUser(int id);
        Task<IEnumerable<Advert>> GetValidAdverts();
        Task<IEnumerable<Advert>> GetAdverts();
        Task<Advert> GetAdvert(int id);
        Task<Photo> GetPhoto(int id);

        Task<Photo> GetMainPhotoForAdvert(int advertId);
    }
}
