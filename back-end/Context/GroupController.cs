using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FS_React_Net.DTO;
using FS_React_Net.Services;
using Microsoft.AspNetCore.Mvc;

namespace FS_React_Net.Context
{
    [ApiController]
    [Route("Controller")]
    public class GroupController : ControllerBase
    {
        private readonly IGroupService _groupService;

        public GroupController(IGroupService groupService)
        {
            _groupService = groupService;
        }

        [HttpGet("getById/{id}")]
        public async Task<IActionResult> GetGroupById(int id)
        {
            var group = await _groupService.GetGroupById(id);

            if (group == null)
            {
                return NotFound($"Can't find any contact with id = {id}");
            }

            return Ok(group);
        }

        [HttpPost]
        public async Task<IActionResult> CreateGroup(GroupCreateDTO groupDTO)
        {
            var group = await _groupService.CreateGroup(groupDTO);

            return CreatedAtAction(nameof(GetGroupById), new {id = group.Id}, group);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateGroupName(int id, GroupUpdateDTO groupDTO)
        {
            groupDTO.Id = id;

            await _groupService.UpdateGroupName(groupDTO);

            return Ok($"Successfully updated");
        }
    }
}