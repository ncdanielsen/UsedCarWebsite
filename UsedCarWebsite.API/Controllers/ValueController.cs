using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UsedCarWebsite.API.Data;
using UsedCarWebsite.API.Dtos;

namespace UsedCarWebsite.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValueController : ControllerBase
    {
        private readonly IValueRepository _repo;
        public ValueController(IValueRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("Colour")]
        public async Task<IActionResult> GetColours()
        {
            var coloursToReturn = await _repo.GetColours();

            return Ok(coloursToReturn);
        }

        [HttpGet("Transmission")]
        public async Task<IActionResult> GetTransmissions()
        {
            var transmissionsToReturn = await _repo.GetTransmissions();
            
            return Ok(transmissionsToReturn);
        }

        [HttpGet("DriveTypes")]
        public async Task<IActionResult> GetDriveTypes()
        {
            var driveTypesToReturn = await _repo.GetDrives();

            return Ok(driveTypesToReturn);
        }

        [HttpGet("FuelTypes")]
        public async Task<IActionResult> GetFuelTypes()
        {
            var fuelTypesToReturn = await _repo.GetFuels();

            return Ok(fuelTypesToReturn);
        }

        [HttpGet("BodyStyle")]
        public async Task<IActionResult> GetBodyStyles()
        {
            var bodyStylesToReturn = await _repo.GetBodyStyles();

            return Ok(bodyStylesToReturn);
        }

        [HttpGet("CarValues")]
        public async Task<IActionResult> GetCarValues()
        {
            CarValuesForReturnDto carValues = new CarValuesForReturnDto();

            carValues.Colours = await _repo.GetColours();
            carValues.Transmissions = await _repo.GetTransmissions();
            carValues.DriveTypes = await _repo.GetDrives();
            carValues.FuelTypes = await _repo.GetFuels();
            carValues.BodyStyles = await _repo.GetBodyStyles();

            return Ok(carValues);
        }
    }
}