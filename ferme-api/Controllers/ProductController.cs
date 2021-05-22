using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc; 
using Connection;
using Models;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Cors;


using System.Text.Json;
using System.Text.Json.Serialization;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Services.Controllers
{
  //localhost:5001/api/product
  [Route("api/[controller]")]
  [ApiController]
  public class Product : ControllerBase
  {
    //POST: api/product/
    // [EnableCors("Policy")]
    // [HttpPost]
    // public JsonResult AddProduct([FromBody]Models.Product product) {
    //   Console.WriteLine("Add Product RUNS!");
    //   Console.WriteLine(product);
    //   Models.Product p = product;
    //   Console.WriteLine(p.Id);
    //   Console.WriteLine(p.CategoryId);
    //   Console.WriteLine(p.ProviderId);
    //   Console.WriteLine(Connection.ProductConnection.AddEntity(p));
    //   var json = JsonConvert.SerializeObject(Connection.ProductConnection.GetEntity(p.Id));
    //   return new JsonResult(Connection.ProductConnection.GetEntity(p.Id));
    // }

    [EnableCors("Policy")]
    [HttpPost]
    public JsonResult AddProduct([FromBody]Object product) {
      
      // Al ser un Lenguaje tipado, este no acepta el envio de [FromBody]Models.Product product
      // en el parametro ya que si bien el json de JS envia los propiedades correctamente, los tipos de datos no hacen un match
      Models.Product newProduct = new Models.Product() {
        Id = JsonConvert.DeserializeObject<Models.Product>(product.ToString()).Id,
        Name = JsonConvert.DeserializeObject<Models.Product>(product.ToString()).Name,
        Description = JsonConvert.DeserializeObject<Models.Product>(product.ToString()).Description,
        Createdat = JsonConvert.DeserializeObject<Models.Product>(product.ToString()).Createdat,
        Updatedat = JsonConvert.DeserializeObject<Models.Product>(product.ToString()).Updatedat,
        Price = JsonConvert.DeserializeObject<Models.Product>(product.ToString()).Price,
        Stock = JsonConvert.DeserializeObject<Models.Product>(product.ToString()).Stock,
        ImageUrl = JsonConvert.DeserializeObject<Models.Product>(product.ToString()).ImageUrl,
        CategoryId = JsonConvert.DeserializeObject<Models.Product>(product.ToString()).CategoryId,
        ProviderId = JsonConvert.DeserializeObject<Models.Product>(product.ToString()).ProviderId
      };
      return new JsonResult(Connection.ProductConnection.GetEntity(newProduct.Id));
    }

    // GET: api/product/all
    [EnableCors("Policy")]
    [HttpGet("all")]
    public JsonResult GetUsers()
    {
      List<Models.Product> products = Connection.ProductConnection.GetEntities();
      var json = JsonConvert.SerializeObject(products);
      return new JsonResult(products);
    }

    // GET: api/product/
    [EnableCors("Policy")]
    [HttpGet("{id}")]
    public JsonResult GetUser(int id)
    {
      Models.Product product = Connection.ProductConnection.GetEntity(id);
      Console.WriteLine(product.Id);
      return new JsonResult(product);
    }
  }
}

