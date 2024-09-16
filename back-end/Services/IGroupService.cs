using System.Text.RegularExpressions;
using FS_React_Net.DTO;

namespace FS_React_Net.Services
{
    public interface IGroupService
    {
        Task<List<Group>> GetGroups();
        Task<Group> GetGroupById(int id);
        Task<List<Group>> GetGroupsByName(string groupName);
        Task<Group> CreateGroup(GroupCreateDTO groupDTO);
        Task<bool> UpdateGroup(Group group);
        Task DeleteGroup(Group group);
    }
}