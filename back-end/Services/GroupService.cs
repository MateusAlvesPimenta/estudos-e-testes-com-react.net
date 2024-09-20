using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FS_React_Net.Context;
using FS_React_Net.DTO;
using FS_React_Net.Models;
using Microsoft.EntityFrameworkCore;

namespace FS_React_Net.Services
{
    public class GroupService : IGroupService
    {
        private readonly ContactContext _context;

        public GroupService(ContactContext context)
        {
            _context = context;
        }

        public async Task<List<Group>> GetGroups()
        {
            return await _context.Groups.ToListAsync();
        }

        public async Task<Group> GetGroupById(int id)
        {
            return await _context.Groups
                            .Where(group => group.Id == id)
                            .Include(group => group.Contacts)
                            .FirstOrDefaultAsync();
        }

        public async Task<List<Group>> GetGroupsByName(string groupName)
        {
            return await _context.Groups.
                            Where(group => group.GroupName.Contains(groupName))
                            .ToListAsync();
        }

        public async Task<Group> CreateGroup(GroupCreateDTO groupDTO)
        {
            var contact = await _context.Contacts.FindAsync(groupDTO.ContactId);

            if(contact == null)
            {
                return null;
            }

            var newGroup = new Group(groupDTO, contact);

            _context.Groups.Add(newGroup);
            await _context.SaveChangesAsync();

            return newGroup;
        }

        public async Task UpdateGroupName(GroupUpdateDTO groupDTO)
        {
            var group = await _context.Groups.FindAsync(groupDTO.Id);

            _context.Entry(group).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteGroup(Group group)
        {
            _context.Groups.Remove(group);
            await _context.SaveChangesAsync();
        }

        public async Task<string> AddContact(int contactId, int groupId)
        {
            var contact = await _context.Contacts.FindAsync(contactId);
            var group = await _context.Groups.FindAsync(groupId);

            if(contact == null || group == null)
            {
                return null;
            }
            else if(group.Contacts.Contains(contact))
            {
                return "exists";
            }

            group.AddContact(contact);

            _context.Entry(group).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return "added";
        }

        // public async Task<bool> RemoveContact(int id, int groupId)
        // {
        //     throw new NotImplementedException();
        // }
    }
}