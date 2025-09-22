using Microsoft.EntityFrameworkCore;
using BlogAPI.Models;
namespace BlogAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        //Explanation <User> from the Model Users = property name for the DbSet<T>
        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }

        //Multiple Cascade happens when 2 or more foreign keys can cause automatic deletes to the same table. Ex: (1) Post -> Comment (When a post is deleted, all comments are deleted (2)User-Comment -> When a user is deleted, all comments are deleted)
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // A user cannot be deleted if they still have comments
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.User)
                .WithMany(u => u.Comments)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // If a post is deleted, all comments are deleted
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Post)
                .WithMany(p => p.Comments)
                .HasForeignKey(c => c.PostId)
                .OnDelete(DeleteBehavior.Cascade);
        }

    }

}