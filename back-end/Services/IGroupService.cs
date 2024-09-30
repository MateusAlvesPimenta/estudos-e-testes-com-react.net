using FS_React_Net.DTO;
using FS_React_Net.Models;

namespace FS_React_Net.Services
{
    public interface IGroupService
    {
        Task<List<Group>> GetGroups();
        Task<Group> GetGroupById(int id);
        Task<List<Group>> GetGroupsByName(string groupName);
        Task<Group> CreateGroup(GroupDTO groupDTO);
        Task<bool> UpdateGroup(GroupDTO groupDTO);
        Task DeleteGroup(Group group);
        Task<string> AddContact(int contactId, int groupId);
        Task<(bool, bool)> RemoveContact(int contactId, int groupId);
    }
}