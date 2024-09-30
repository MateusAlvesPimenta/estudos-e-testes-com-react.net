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
            var groups = await _context.Groups.ToListAsync();
            return groups;
        }

        public async Task<Group> GetGroupById(int id)
        {
            var group = await _context.Groups
                            .Where(group => group.Id == id)
                            .Include(group => group.Contacts)
                            .FirstOrDefaultAsync();

            return group;
        }

        public async Task<List<Group>> GetGroupsByName(string groupName)
        {
            var groups = await _context.Groups.
                                    Where(group => group.GroupName.Contains(groupName))
                                    .ToListAsync();

            return groups;
        }

        public async Task<Group> CreateGroup(GroupDTO groupDTO)
        {
            var newGroup = new Group(groupDTO);

            _context.Groups.Add(newGroup);
            await _context.SaveChangesAsync();

            return newGroup;
        }

        public async Task<bool> UpdateGroup(GroupDTO groupDTO)
        {
            var group = await _context.Groups.FindAsync(groupDTO.Id);

            if(group == null)
            {
                return false;
            }

            group.UpdateGroup(groupDTO);

            _context.Entry(group).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return true;
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

        public async Task<(bool, bool)> RemoveContact(int contactId, int groupId)
        {
            var contact = await _context.Contacts.FindAsync(contactId);
            var group = await _context.Groups.FindAsync(groupId);

            if(contact == null || group == null)
            {
                return (false, false);

            }

            var removed = group.RemoveContact(contact);

            _context.Groups.Entry(group).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return (true, removed);
        }
    }
}