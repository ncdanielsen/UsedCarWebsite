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
using UsedCarWebsite.API.Helpers;
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
        public async Task<IActionResult> GetActivePosts([FromQuery]AdvertParams advertParams)
        {
            var posts = await _repo.GetActiveAdverts(advertParams);
            var postsToReturn = _mapper.Map<IEnumerable<AdvertForListDto>>(posts);

            Response.AddPagination(posts.CurrentPage, posts.PageSize,
                posts.TotalItemCount, posts.TotalPages);

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

            advertToCreate.DateCreated = DateTime.Now;

            var createdAdvert = await _repo.AddAdvert(advertToCreate);

            var advertTorReturn = _mapper.Map<AdvertForDetailedDto>(advertToCreate);

            return CreatedAtRoute("GetPost", new { controller = "Posts", id = createdAdvert.Id }, advertTorReturn);
        }

        [Authorize]
        [HttpPost("{advertId}/changeStatus")]
        public async Task<IActionResult> SetPostStatus(int advertId)
        {
            var advertFromRepo = await _repo.GetAdvert(advertId);

            if (advertFromRepo.UserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            if (advertFromRepo.AdvertStatus.ToLower() == "inactive" || advertFromRepo.AdvertStatus.ToLower() == "expired")
                advertFromRepo.AdvertStatus = "active";
            else if (advertFromRepo.AdvertStatus.ToLower() == "active")
                advertFromRepo.AdvertStatus = "expired";

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating advert {advertId} failed on save");
        }


    }
}
