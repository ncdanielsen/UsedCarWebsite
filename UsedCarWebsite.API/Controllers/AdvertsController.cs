using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UsedCarWebsite.API.Data;
using UsedCarWebsite.API.Dtos;

namespace UsedCarWebsite.API.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class AdvertsController : ControllerBase
    {
        private readonly IMainRepository _repo;
        private readonly IMapper _mapper;
        public AdvertsController(IMainRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        //[Route("api/adverts")]
        [HttpGet("api/adverts")]
        public async Task<IActionResult> GetAdverts()
        {
            var adverts = await _repo.GetAdverts();
            var advertsToReturn = _mapper.Map<IEnumerable<AdvertForListDto>>(adverts);

            return Ok(advertsToReturn);
        }
        //CORS HELVETE
        [HttpGet("api/adverts/{id}")]
        public async Task<IActionResult> GetAdvert(int id)
        {
            var advert = await _repo.GetAdvert(id);
            var advertToReturn = _mapper.Map<AdvertForDetailedDto>(advert);

            return Ok(advertToReturn);
        }
        //Fungerer av en eller annen grunn
        [HttpGet("api/adverts/test/{id}")]
        public async Task<IActionResult> GetAdvertTest(int id)
        {
            var advert = await _repo.GetAdvert(1);
            var advertToReturn = _mapper.Map<AdvertForDetailedDto>(advert);

            return Ok(advertToReturn);
        }
    }
}
