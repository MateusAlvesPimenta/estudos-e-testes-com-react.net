using FS_React_Net.DTO;
using FS_React_Net.Models;

namespace FS_React_Net.Services
{
    public interface IGroupService
    {
        Task<List<Group>> GetGroups();
        Task<Group> GetGroupById(int id);
        Task<List<Group>> GetGroupsByName(string groupName);
        Task<Group> CreateGroup(GroupCreateDTO groupDTO);
        Task UpdateGroupName(GroupUpdateDTO groupDTO);
        Task<string> AddContact(int contactId, int groupId);
        // Task<bool> RemoveContact(int id, int groupId);
        Task DeleteGroup(Group group);
    }
}