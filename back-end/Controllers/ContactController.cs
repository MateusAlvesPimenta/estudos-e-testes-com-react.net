using System.ComponentModel.DataAnnotations;
using FS_React_Net.Context;
using FS_React_Net.DTO;
using FS_React_Net.Models;
using FS_React_Net.Services;
using Microsoft.AspNetCore.Mvc;

namespace FS_React_Net.Controllers
{
    [ApiController]
    [Route("[Controller]")]

    public class ContactController : ControllerBase
    {
        private readonly IContactService _contactService;

        public ContactController(IContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpGet]
        public async Task<IActionResult> GetContacts()
        {
            var contacts = await _contactService.GetContacts();

            if(!contacts.Any())
            {
                return NotFound("No contact found");
            }

            return Ok(contacts);
        }

        [HttpGet("GetContactsByName/{name}")]
        public async Task<IActionResult> GetContactsByName([Required]string name)
        {
            var contacts = await _contactService.GetContactsByName(name);

            if(!contacts.Any())
            {
                return NotFound($"No contact with name = {name} found");
            }

            return Ok(contacts);
        }

        [HttpGet("GetContactById/{id}")]
        public async Task<IActionResult> GetContactById(int id)
        {
            var contact = await _contactService.GetContactById(id);

            if(contact == null)
            {
                return NotFound($"No contact with id = {id} found");
            }

            return Ok(contact);
        }

        [HttpPost("NewContact")]
        public async Task<IActionResult> CreateContact(ContactDTO contactDTO)
        {
            await _contactService.CreateContact(contactDTO);

            return CreatedAtAction(nameof(GetContactById), new {id = contactDTO.Id}, contactDTO);
        }

        [HttpPut("UpdateContact/{id}")]
        public async Task<IActionResult> UpdateContact([Required]int id, ContactDTO contactDTO)
        {
            contactDTO.Id = id;
            var updated = await _contactService.UpdateContact(contactDTO);

            if(!updated)
            {
                return NotFound($"No Contact with id = {id} found");
            }

            return Ok($"Contact with id = {id} successfully updated");
        }

        [HttpDelete("DeleteContact/{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var contact = await _contactService.GetContactById(id);

            if(contact == null)
            {
                return NotFound($"No contact with id = {id} found");
            }
            
            await _contactService.DeleteContact(contact);

            return Ok("Contact successfully deleted");
        }
    }
}