using FS_React_Net.Models;
using Microsoft.AspNetCore.Identity;

namespace FS_React_Net.Services
{
    public class AuthenticateService : IAuthenticate
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;

        public AuthenticateService(SignInManager<IdentityUser> signInManager,
            UserManager<IdentityUser> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        public async Task<bool> RegisterUser(string email, string password)
        {
            var user = new IdentityUser
            {
                UserName = email,
                Email = email
            };
            var response = await _userManager.CreateAsync(user, password);

            if (response.Succeeded)
            {
                await _signInManager.SignInAsync(user, false);
            }
            return response.Succeeded;
        }

        public async Task<bool> AuthenticateUser(string email, string password)
        {
            var response = await _signInManager.PasswordSignInAsync(email, password, false, false);

            return response.Succeeded;
        }

        public async Task Logout()
        {
            await _signInManager.SignOutAsync();
        }
    }
}