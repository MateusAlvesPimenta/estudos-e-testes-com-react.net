using System.ComponentModel.DataAnnotations;
using FS_React_Net.DTO;
using FS_React_Net.Services;
using Microsoft.AspNetCore.Mvc;

namespace FS_React_Net.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class GroupController : ControllerBase
    {
        private readonly IGroupService _groupService;

        public GroupController(IGroupService groupService)
        {
            _groupService = groupService;
        }

        [HttpGet]
        public async Task<IActionResult> GetGroups()
        {
            var groups = await _groupService.GetGroups();

            return Ok(groups);
        }

        [HttpGet("GetGroupsByName/{name}")]
        public async Task<IActionResult> GetGroupsByName([Required]string name)
        {
            var groups = await _groupService.GetGroupsByName(name);

            if (!groups.Any())
            {
                return NotFound($"No group with name = {name} found");
            }

            return Ok(groups);
        }

        [HttpGet("GetGroupById/{id}")]
        public async Task<IActionResult> GetGroupById(int id)
        {
            var group = await _groupService.GetGroupById(id);

            if (group == null)
            {
                return NotFound($"No group with id = {id} found");
            }

            return Ok(group);
        }

        [HttpPost("NewGroup")]
        public async Task<IActionResult> CreateGroup(GroupDTO groupDTO)
        {
            var group = await _groupService.CreateGroup(groupDTO);

            return CreatedAtAction(nameof(GetGroupById), new {id = group.Id}, group);
        }

        [HttpPut("UpdateGroup/{id}")]
        public async Task<IActionResult> UpdateGroup(int id, GroupDTO groupDTO)
        {
            groupDTO.Id = id;
            await _groupService.UpdateGroup(groupDTO);

            return Ok($"Successfully updated");
        }

        [HttpDelete("DeleteGroup/{id}")]
        public async Task<IActionResult> DeleteGroup(int id)
        {
            var group = await _groupService.GetGroupById(id);

            if(group == null)
            {
                return NotFound($"No group with id = {id} found");
            }

            await _groupService.DeleteGroup(group);
            return Ok("Successfully deleted");
        }

        [HttpPut("AddContact/{contactId}")]
        public async Task<IActionResult> AddContact([Required]int contactId, [Required]int groupId)
        {
            var result = await _groupService.AddContact(contactId, groupId);

            if (result == null)
            {
                return NotFound($"One or both ids do not exist \ncontact: {contactId} \ngroup: {groupId}");
            }
            else if (result == "exists")
            {
                return Ok($"The group with id = {groupId} already contains a contact with id = {contactId}");
            }

            return Ok($"Contact successfully added to group {groupId}");
        }

        [HttpPut("RemoveContact/{contactId}")]
        public async Task<IActionResult> RemoveContact([Required]int contactId, [Required]int groupId)
        {
            var result = await _groupService.RemoveContact(contactId, groupId);

            if(result == null)
            {
                return NotFound($"One or both ids do not exist \ncontact: {contactId} \ngroup: {groupId}");
            }
            else if(result == "not removed")
            {
                return NotFound($"Group with id = {groupId} does not contain a contact with id = {contactId} ");
            }

            return Ok($"Contact with id = {contactId} removed successfully from group with id = {groupId}");
        }
    }
}