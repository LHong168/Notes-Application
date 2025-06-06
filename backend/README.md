# Note API (ASP.NET Core 8)

This is a RESTful API built with [ASP.NET Core 8](https://learn.microsoft.com/en-us/aspnet/core/introduction-to-aspnet-core?view=aspnetcore-8.0&WT.mc_id=DT-MVP-5003978) for managing notes.

## Getting Started

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/LHong168/Notes-Application.git
   cd note-app/backend
   ```

2. Create a `.env` file in the `backend` directory and add the following environment variables:

   ```env
   BASE_URL=http://localhost:5292
   CONNECTION_STRING=Server=YOUR_SERVER;Database=YOUR_DB;Trusted_Connection=True;
   ```

   Replace `YOUR_SERVER` and `YOUR_DB` with your SQL Server info.

3. Create or update the `appsettings.json` file if necessary (can be empty if `.env` is used exclusively).

### Run the Project

To start the backend API in development mode:

```bash
dotnet watch run
```

This will run the API at `https://localhost:5292` (or your configured port).

### API Endpoints

- `GET /notes` – Get all notes
- `GET /notes/{id}` – Get a single note
- `POST /notes` – Create a new note
- `PUT /notes/{id}` – Update an existing note
- `DELETE /notes/{id}` – Delete a note

### Project Structure

- `Models/` – Data models
- `Repos/` – Repository layer
- `Controllers/` – API endpoints
- `Program.cs` – Application entry point and DI setup

## Learn More

To learn more about ASP.NET Core:

- [ASP.NET Core Documentation](https://learn.microsoft.com/en-us/aspnet/core/?view=aspnetcore-8.0)
- [Entity Framework Core Docs](https://learn.microsoft.com/en-us/ef/core/)
