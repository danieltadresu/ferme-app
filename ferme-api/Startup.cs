using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Stripe;
using DinkToPdf;
using DinkToPdf.Contracts;

namespace ferme_api
{
    public class Startup
    {
      public Startup(IConfiguration configuration)
      {
        Configuration = configuration;
      }

      public IConfiguration Configuration { get; }

      // This method gets called by the runtime. Use this method to add services to the container.
      public void ConfigureServices(IServiceCollection services)
      {
        services.AddSingleton(typeof(IConverter), new SynchronizedConverter(new PdfTools()));
        services.AddCors(options =>
          {
            options.AddPolicy("Policy",
              builder =>
              {
                builder.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod();
              });
          });
        services.AddControllers();
      }

      // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
      public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
      {
        StripeConfiguration.ApiKey = "sk_test_51IrBoLEskkhmHZqbdj3FiYeCxdokyZDdqS4ApAp7kyB0mEDgaDDMPYPm3xYcxXOXFGZcA8qNMGlh589qFmz6iGNO0065Wqj6TP";
        if (env.IsDevelopment())
        {
          app.UseDeveloperExceptionPage();
        }
        app.UseHttpsRedirection();
        app.UseRouting();
        app.UseCors();
        app.UseAuthorization();
        app.UseEndpoints(endpoints =>
        {
          endpoints.MapControllers();
        });
      }
    }
}
