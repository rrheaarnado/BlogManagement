namespace BlogAPI.Data
{
    public class AppDbContect : DbContext
    {
        public AppDbContect(DbContextOptions<AppDbContect> options) : base(options) { }

        public DbSet<PostItem> Posts => Set<PostItem>(); 
    }

}