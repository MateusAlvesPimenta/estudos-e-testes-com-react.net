using FS_React_Net.Context;
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
        public async Task<IActionResult> GetContactsByName(string name)
        {
            var contacts = await _contactService.GetContactsByName(name);

            if(!contacts.Any())
            {
                return NotFound($"No contact with name = {name} found");
            }

            return Ok(contacts);
        }

        [HttpGet("{id}")]
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
        public async Task<IActionResult> CreateContact(Contact contact)
        {
            await _contactService.CreateContact(contact);

            return CreatedAtAction(nameof(GetContactById), new {id = contact.Id}, contact);
        }

        [HttpPut("EditContact/{id}")]
        public async Task<IActionResult> UpdateContact(int id, Contact contact)
        {
            if(id == contact.Id)
            {
                await _contactService.UpdateContact(contact);
                return Ok($"Contact with id = {id} successfully updated");
            }

            return BadRequest("Divergent data");
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