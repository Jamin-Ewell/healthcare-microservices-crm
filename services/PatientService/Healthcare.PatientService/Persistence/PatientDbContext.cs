using Healthcare.PatientService.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Healthcare.PatientService.Persistence;

public class PatientDbContext : DbContext
{
    public PatientDbContext(DbContextOptions<PatientDbContext> options)
        : base(options) { }

    public DbSet<Patient> Patients => Set<Patient>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Patient>(entity =>
        {
            entity.HasKey(x => x.Id);

            entity.Property(x => x.FirstName)
                  .HasMaxLength(100)
                  .IsRequired();

            entity.Property(x => x.LastName)
                  .HasMaxLength(100)
                  .IsRequired();

            entity.Property(x => x.Email)
                  .HasMaxLength(150)
                  .IsRequired();

            entity.Property(x => x.DateOfBirth)
                  .IsRequired();
        });

        builder.Entity<Patient>().HasData(
            new Patient
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                FirstName = "John",
                LastName = "Smith",
                Email = "john@health.com",
                DateOfBirth = new DateTime(1985, 5, 10)
            },
            new Patient
            {
                Id = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                FirstName = "Emily",
                LastName = "Davis",
                Email = "emily@health.com",
                DateOfBirth = new DateTime(1992, 3, 20)
            }
        );
    }
}