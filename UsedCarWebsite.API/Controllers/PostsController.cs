using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using UsedCarWebsite.API.Data;
using UsedCarWebsite.API.Dtos;
using UsedCarWebsite.API.Models;

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
        public async Task<IActionResult> GetValidPosts()
        {
            var posts = await _repo.GetValidAdverts();
            var postsToReturn = _mapper.Map<IEnumerable<AdvertForListDto>>(posts);

            return Ok(postsToReturn);
        }

        [Authorize]
        [HttpGet("all")]
        public async Task<IActionResult> GetAllPosts()
        {
            var posts = await _repo.GetAdverts();
            var postsToReturn = _mapper.Map<IEnumerable<AdvertForListDto>>(posts);

            return Ok(postsToReturn);
        }


        [HttpGet("{id}", Name = "GetPost")]
        public async Task<IActionResult> GetPost(int id)
        {
            var post = await _repo.GetAdvert(id);

            if(post.AdvertStatus.ToLower() != "active" && post.AdvertStatus.ToLower() != "expired")
            {
                if (post.UserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                    return Unauthorized();
            }

            var postToReturn = _mapper.Map<AdvertForDetailedDto>(post);
            Console.WriteLine(postToReturn.TransmissionType);

            return Ok(postToReturn);
        }

        [Authorize]
        [HttpPut("{advertId}")]
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

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreatePost(AdvertForCreationDto advertForCreationDto)
        {

            advertForCreationDto.UserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            advertForCreationDto.AdvertStatus = "inactive";

            var advertToCreate = _mapper.Map<Advert>(advertForCreationDto);

            var createdAdvert = await _repo.AddAdvert(advertToCreate);

            var advertTorReturn = _mapper.Map<AdvertForDetailedDto>(advertToCreate);

            return CreatedAtRoute("GetPost", new { controller = "Posts", id = createdAdvert.Id }, advertTorReturn);
        }

        [Authorize]
        [HttpPost("{advertId}/setActive")]
        public async Task<IActionResult> SetPostActive(int advertId)
        {
            var advertFromRepo = await _repo.GetAdvert(advertId);

            if (advertFromRepo.UserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            if (advertFromRepo.AdvertStatus.ToLower() == "active")
                return NoContent();

            advertFromRepo.AdvertStatus = "active";

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating advert {advertId} failed on save");
        }

        [Authorize]
        [HttpPost("{advertId}/setExpired")]
        public async Task<IActionResult> SetPostExpired(int advertId, AdvertForUpdateDto advertForUpdateDto)
        {
            var advertFromRepo = await _repo.GetAdvert(advertId);

            if (advertFromRepo.UserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            if (advertFromRepo.AdvertStatus.ToLower() != "active")
                return NoContent();

            advertFromRepo.AdvertStatus = "expired";

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating advert {advertId} failed on save");
        }
    }
}
