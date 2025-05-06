using Microsoft.AspNetCore.Mvc;
using backend.Repos;
using backend.Models.DTO;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NoteController : ControllerBase
    {
        private readonly INoteRepo _noteRepo;

        public NoteController(INoteRepo noteRepo)
        {
            _noteRepo = noteRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var notes = await _noteRepo.GetAllNote();
            return Ok(notes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var note = await _noteRepo.GetNotebyID(id);
            if (note == null)
                return NotFound(new {  message = "Note not found." });

            return Ok(note);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] NoteDto note)
        {
            if (string.IsNullOrWhiteSpace(note.Title))
                return BadRequest(new {  message = "Title is required." });

            var result = await _noteRepo.CreateNote(note);
            if (!result.success)
                return StatusCode(500, new {  result.message });

            return Ok(new {  result.message });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] NoteDto note)
        {
            if (string.IsNullOrWhiteSpace(note.Title))
                return BadRequest(new {  message = "Title is required." });

            var result = await _noteRepo.UpdateNote(note, id);
            if (!result.success)
                return NotFound(new {  result.message });

            return Ok(new {  result.message });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _noteRepo.DeleteNote(id);
            if (!result.success)
                return NotFound(new {  result.message });

            return Ok(new {  result.message });
        }
    }
}
