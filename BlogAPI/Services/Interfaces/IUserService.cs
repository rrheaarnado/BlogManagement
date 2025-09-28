using BlogAPI.Dtos.User;
using BlogAPI.Models;
using Microsoft.EntityFrameworkCore; // For FirstOrDefaultAsync
using Microsoft.AspNetCore.Identity; //

namespace BlogAPI.Services.Interfaces //Defines the contract (what methods does a service must have)
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllAsync();
        Task<UserDto?> GetByIdAsync(int id);
        Task<UserDto> CreateAsync(CreateUserDto dto);
        Task<bool> UpdateAsync(int id, UpdateUserDto dto);
        Task<bool> DeleteAsync(int id);

        Task<User?> ValidateUserAsync(string username, string password);
    }
}