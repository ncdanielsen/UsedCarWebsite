using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UsedCarWebsite.API.Models;

namespace UsedCarWebsite.API.Data
{
    public class ValueRepository : IValueRepository
    {
        private readonly DataContext _context;
        public ValueRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Colour>> GetColours()
        {
            return await _context.Colours.ToListAsync();
        }

        public async Task<List<Transmission>> GetTransmissions()
        {
            return await _context.Transmissions.ToListAsync();
        }

        public async Task<List<Drive>> GetDrives()
        {
            return await _context.Drives.ToListAsync();
        }

        public async Task<List<Fuel>> GetFuels()
        {
            return await _context.Fuels.ToListAsync();
        }

        public async Task<List<BodyStyle>> GetBodyStyles()
        {
            return await _context.BodyStyles.ToListAsync();
        }
    }
}
