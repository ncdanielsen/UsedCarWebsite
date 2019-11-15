using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using UsedCarWebsite.API.Data;
using UsedCarWebsite.API.Dtos;

namespace UsedCarWebsite.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController :ControllerBase
    {
        private readonly IMainRepository _repo;
        private readonly IMapper _mapper;
        public PostsController(IMainRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetPosts()
        {
            var users = await _repo.GetAdverts();
            var postsToReturn = _mapper.Map<IEnumerable<AdvertForListDto>>(users);

            return Ok(postsToReturn);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetPost(int id)
        {
            var user = await _repo.GetAdvert(id);
            var postToReturn = _mapper.Map<AdvertForDetailedDto>(user);

            return Ok(postToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePost(int advertId, AdvertForUpdateDto advertForUpdateDto)
        {
            var advertFromRepo = await _repo.GetAdvert(advertId);

            if (advertFromRepo.UserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            _mapper.Map(advertForUpdateDto, advertFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating advert {advertId} failed on save");
        }
    }
}
