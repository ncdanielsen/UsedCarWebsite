using System.Collections.Generic;
using System.Threading.Tasks;
using UsedCarWebsite.API.Models;

namespace UsedCarWebsite.API.Data
{
    public interface IValueRepository
    {
        Task<List<Colour>> GetColours();
        Task<List<Drive>> GetDrives();
        Task<List<Fuel>> GetFuels();
        Task<List<Transmission>> GetTransmissions();
        Task<List<BodyStyle>> GetBodyStyles();
    }
}