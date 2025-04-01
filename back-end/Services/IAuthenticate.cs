using FS_React_Net.Models;

namespace FS_React_Net.Services
{
    public interface IAuthenticate
    {
        Task<bool> RegisterUser(string email, string password);
        Task<bool> AuthenticateUser(string email, string password);
        Task Logout();
    }
}