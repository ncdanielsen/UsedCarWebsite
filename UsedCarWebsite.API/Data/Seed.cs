using Microsoft.EntityFrameworkCore.Internal;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using UsedCarWebsite.API.Models;

namespace UsedCarWebsite.API.Data
{
    public class Seed
    {
        public static void SeedData(DataContext context)
        {
            SeedColours(context);
            SeedTransmissions(context);
            SeedDriveTypes(context);
            SeedFuelTypes(context);
            SeedBodyStyles(context);
            SeedUsers(context);
        }

        public static void SeedColours(DataContext context)
        {
            if (!context.Colours.Any())
            {
                var colourData = File.ReadAllText("./MockData/ColourSeedData.json");
                var colours = JsonConvert.DeserializeObject<List<Colour>>(colourData);
                foreach (var colour in colours)
                {
                    context.Colours.Add(colour);
                }
                context.SaveChanges();
            }
        }

        public static void SeedTransmissions(DataContext context)
        {
            if (!context.Transmissions.Any())
            {
                var transmissionData = File.ReadAllText("./MockData/TransmissionSeedData.json");
                var transmissions = JsonConvert.DeserializeObject<List<Transmission>>(transmissionData);
                foreach (var transmission in transmissions)
                {
                    context.Transmissions.Add(transmission);
                }
                context.SaveChanges();
            }
        }

        public static void SeedDriveTypes(DataContext context)
        {
            if (!context.Drives.Any())
            {
                var driveData = File.ReadAllText("./MockData/DriveTypeSeedData.json");
                var drives = JsonConvert.DeserializeObject<List<Drive>>(driveData);
                foreach (var drive in drives)
                {
                    context.Drives.Add(drive);
                }
                context.SaveChanges();
            }
        }

        public static void SeedFuelTypes(DataContext context)
        {
            if (!context.Fuels.Any())
            {
                var fuelData = File.ReadAllText("./MockData/FuelTypeSeedData.json");
                var fuels = JsonConvert.DeserializeObject<List<Fuel>>(fuelData);
                foreach (var fuel in fuels)
                {
                    context.Fuels.Add(fuel);
                }
                context.SaveChanges();
            }
        }

        public static void SeedBodyStyles(DataContext context)
        {
            if (!context.BodyStyles.Any())
            {
                var bodyStyleData = File.ReadAllText("./MockData/BodyStyleSeedData.json");
                var bodyStyles = JsonConvert.DeserializeObject<List<BodyStyle>>(bodyStyleData);
                foreach (var bodyStyle in bodyStyles)
                {
                    context.BodyStyles.Add(bodyStyle);
                }
                context.SaveChanges();
            }
        }

        public static void SeedUsers(DataContext context)
        {
            if (!context.Users.Any())
            {
                var userData = File.ReadAllText("./MockData/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);
                foreach(var user in users)
                {
                    byte[] passwordHash, passwordSalt;
                    CreatePasswordHash("password", out passwordHash, out passwordSalt);

                    user.PasswordHash = passwordHash;
                    user.PasswordSalt = passwordSalt;
                    user.Username = user.Username.ToLower();
                    context.Users.Add(user);
                }
                context.SaveChanges();
            }
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }

        }
    }
}
