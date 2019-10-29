using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UsedCarWebsite.API.Data;
using UsedCarWebsite.API.Dtos;

namespace UsedCarWebsite.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdvertsController : ControllerBase
    {
        private readonly IMainRepository repo;
        private readonly IMapper mapper;
        public AdvertsController(IMainRepository repo, IMapper mapper)
        {
            this.repo = repo;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAdverts()
        {
            var adverts = await repo.GetAdverts();
            var advertsToReturn = mapper.Map<IEnumerable<AdvertForListDto>>(adverts);

            return Ok(advertsToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAdvert(int id)
        {
            var advert = await repo.GetAdvert(id);
            var advertToReturn = mapper.Map<AdvertForDetailedDto>(advert);

            return Ok(advertToReturn);
        }
    }
}
