using System.Data;
using backend.Models;
using backend.Models.Config;
using backend.Models.DTO;
using Dapper;

namespace backend.Repos
{
    public class NoteRepo : INoteRepo
    {
        private readonly DBContext context;

        public NoteRepo(DBContext context)
        {
            this.context = context;
        }

        public async Task<ResponseRepo> CreateNote(NoteDto note)
        {
            try
            {
                DateTime now = DateTime.Now;
                const string query = @"
                    INSERT INTO note (title, content, create_at, update_at)
                    OUTPUT INSERTED.id
                    VALUES (@title, @content, @create_at, @update_at);";

                var parameters = new DynamicParameters();
                parameters.Add("title", note.Title, DbType.String);
                parameters.Add("content", note.Content, DbType.String);
                parameters.Add("create_at", now, DbType.DateTime2);
                parameters.Add("update_at", now, DbType.DateTime2);

                using var connection = context.CreateConnection();
                var newId = await connection.ExecuteScalarAsync<int>(query, parameters);

                return new ResponseRepo
                {
                    success = true,
                    message = "Note created successfully.",
                };
            }
            catch (Exception ex)
            {
                return new ResponseRepo
                {
                    success = false,
                    message = $"Error: {ex.Message}"
                };
            }
        }

        public async Task<ResponseRepo> DeleteNote(int id)
        {
            try
            {
                const string query = "DELETE FROM note WHERE id = @id";
                using var connection = context.CreateConnection();
                var affected = await connection.ExecuteAsync(query, new { id });

                return new ResponseRepo
                {
                    success = affected > 0,
                    message = affected > 0 ? "Note deleted successfully." : "Note not found."
                };
            }
            catch (Exception ex)
            {
                return new ResponseRepo {
                    success = false,
                    message = $"Error: {ex.Message}"
                };
            }
        }

        public async Task<List<Note>> GetAllNote()
        {
            try
            {
                const string query = "SELECT * FROM note";
                using var connection = context.CreateConnection();
                var noteList = await connection.QueryAsync<Note>(query);
                return noteList.ToList();
            }
            catch
            {
                return new List<Note>();
            }
        }

        public async Task<Note?> GetNotebyID(int id)
        {
            try
            {
                const string query = "SELECT * FROM note WHERE id = @id";
                using var connection = context.CreateConnection();
                var note = await connection.QueryFirstOrDefaultAsync<Note>(query, new { id });
                return note;
            }
            catch
            {
                return null;
            }
        }

        public async Task<ResponseRepo> UpdateNote(NoteDto note, int id)
        {
            try
            {
                DateTime now = DateTime.Now;
                const string query = @"
                    UPDATE note 
                    SET title = @title, content = @content, update_at = @update_at
                    WHERE id = @id";

                var parameters = new DynamicParameters();
                parameters.Add("id", id, DbType.Int32);
                parameters.Add("title", note.Title, DbType.String);
                parameters.Add("content", note.Content, DbType.String);
                parameters.Add("update_at", now, DbType.DateTime2);

                using var connection = context.CreateConnection();
                var affected = await connection.ExecuteAsync(query, parameters);

                return new ResponseRepo
                {
                    success = affected > 0,
                    message = affected > 0 ? "Note updated successfully." : "Note not found."
                };
            }
            catch (Exception ex)
            {
                return new ResponseRepo
                {
                    success = false,
                    message = $"Error: {ex.Message}"
                };
            }
        }
    }
}
