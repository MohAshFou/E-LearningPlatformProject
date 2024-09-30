using Microsoft.AspNetCore.Authentication.JwtBearer;
using EduPlatformAPI.Models;
using EduPlatformAPI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;


namespace EduPlatformAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the DB.
            builder.Services.AddDbContext<EduPlatformDbContext>(op => {

                op.UseSqlServer(builder.Configuration.GetConnectionString("Default"));
            });

            builder.Services.AddScoped<AuthService>();
            builder.Services.AddScoped<GenerateUserAndPass>();
            

            // Add services to the Cors.
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("pa", policy =>
                {
                    policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                });
            });

            // to search about word  Bearer in header 
            builder.Services.AddAuthentication(options => { 
            
            
            options.DefaultAuthenticateScheme= JwtBearerDefaults.AuthenticationScheme;
                // to return un athu    
             options.DefaultChallengeScheme= JwtBearerDefaults.AuthenticationScheme;
            options.DefaultScheme= JwtBearerDefaults.AuthenticationScheme;
            
            }).AddJwtBearer( op=>
            {

                op.SaveToken = true;
                op.RequireHttpsMetadata= false;
                op.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidIssuer= builder.Configuration["Jwt:Issuer"],
                    ValidateAudience = true,
                    ValidAudience= builder.Configuration["Jwt:Audience"],
                     ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))

                };
            }       
                );
            builder.Services.AddAuthorization(options =>
            {
                options.AddPolicy("AdminOnly", policy => policy.RequireRole("A"));
                options.AddPolicy("TeacherOnly", policy => policy.RequireRole("T"));
                options.AddPolicy("StudentOnly", policy => policy.RequireRole("S"));
            });



            // Add services to the container.
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseStaticFiles();
            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();
            app.UseCors("pa");
            app.Run();
        }
    }
}
