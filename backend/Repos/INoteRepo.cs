using backend.Models;
using backend.Models.DTO;

namespace backend.Repos
{
    public interface INoteRepo
    {
        Task<List<Note>> GetAllNote();
        Task<Note?> GetNotebyID(int id);
        Task<ResponseRepo> CreateNote(NoteDto note);
        Task<ResponseRepo> UpdateNote(NoteDto note, int id);
        Task<ResponseRepo> DeleteNote(int id);
    }
}
