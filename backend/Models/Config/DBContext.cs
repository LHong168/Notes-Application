using System.Data;
using Microsoft.Data.SqlClient;

namespace backend.Models.Config
{
    public class DBContext
    {
        private readonly IConfiguration _configuration;
        private readonly string connectionString;
        public DBContext(IConfiguration configuration)
        {
            this._configuration = configuration;
            this.connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING") ?? configuration["ConnectionStrings:DefaultConnection"];
        }

        public IDbConnection CreateConnection() => new SqlConnection(connectionString);
    }
}
