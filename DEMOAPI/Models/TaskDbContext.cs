using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace EmployeeApi.Models;

public partial class TaskDbContext : DbContext
{
    public TaskDbContext(DbContextOptions<TaskDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<TodoTask> Tasks { get; set; }
    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TodoTask>(entity =>
        {
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysdatetime())");
            entity.Property(e => e.Description).HasMaxLength(100);
            entity.Property(e => e.Title).HasMaxLength(100);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Email).HasMaxLength(200);
            entity.Property(e => e.Password).HasMaxLength(200);
            entity.Property(e => e.Username).HasMaxLength(100);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
