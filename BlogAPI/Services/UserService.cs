using BlogAPI.Data;
using BlogAPI.Services.Interfaces;
using BlogAPI.Dtos.User;
using Microsoft.EntityFrameworkCore;
using BlogAPI.Models;
using Microsoft.AspNetCore.Identity;

namespace BlogAPI.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _db;
        private readonly PasswordHasher<User> _passwordHasher;

        public UserService(AppDbContext db)
        {
            _db = db;
            _passwordHasher = new PasswordHasher<User>();
        }

        public async Task<IEnumerable<UserDto>> GetAllAsync()
        {
            var users = await _db.Users
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    Username = u.Username,
                    Email = u.Email,
                    IsActive = u.IsActive
                })
                .ToListAsync();

            return users;
        }

        public async Task<UserDto?> GetByIdAsync(int id)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null) return null;

            return new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                IsActive = user.IsActive
            };
        }

        public async Task<UserDto> CreateAsync(CreateUserDto dto)
        {
            var user = new User
            {
                Username = dto.Username,
                Email = dto.Email,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                IsActive = true
            };

            //Hash Password
            user.Password = _passwordHasher.HashPassword(user, dto.Password);

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                IsActive = user.IsActive
            };
        }

        public async Task<bool> UpdateAsync(int id, UpdateUserDto dto)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null) return false;

            user.Username = dto.Username;
            user.Email = dto.Email;

            if (!string.IsNullOrWhiteSpace(dto.Password))
                user.Password = _passwordHasher.HashPassword(user, dto.Password);
            user.UpdatedAt = DateTime.Now;

            await _db.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null) return false;

            //Removes Item
            _db.Users.Remove(user);

            //Saves Changes
            await _db.SaveChangesAsync();

            return true;
        }

        public async Task<User?> ValidateUserAsync(string username, string password)
        {   
            //searches the Users table in the database for a record with the given username.
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Username == username);
            if (user == null) return null;

            //VerifyHashedPassword checks if the plain text password, when hashed, matches the stored hash.
            var result = _passwordHasher.VerifyHashedPassword(user, user.Password, password);
            return result == PasswordVerificationResult.Success ? user : null;
        }
    }
}