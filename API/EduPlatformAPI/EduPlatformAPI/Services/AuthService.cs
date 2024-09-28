using EduPlatformAPI.DTO.User;
using EduPlatformAPI.Models;

namespace EduPlatformAPI.Services
{
    public class AuthService
    {
        private readonly EduPlatformDbContext context;

        public AuthService(EduPlatformDbContext _context)
        {
            context = _context;
        }

        public User AuthenticateUser(UserDTO userDto)
        {
         
            var user = context.Users.SingleOrDefault(u => u.Email == userDto.Email && u.Password == userDto.Password);

            if (user != null)
            {
               
                return user;
            }

          
            return null;
        }

      
    }

}
