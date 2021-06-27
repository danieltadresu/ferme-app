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
    // //POST: api/product/
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
    [HttpPost("{personId}")]
    public JsonResult AddProduct(int personId, [FromBody]Object product) {
      // Console.WriteLine(personId);

      Models.User loggedUser = Connection.UserConnection.GetEntityByPersonId(personId);
      Models.UserRole loggedUserRole = Connection.UserRoleConnection.GetEntityByUserId(loggedUser.Id);

      int isActiveValue = 1; // True
      int providerRoleId = 2;
      if (loggedUserRole.RoleId == providerRoleId)
      {
        isActiveValue = 0; // False
      }

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
        ProviderId = JsonConvert.DeserializeObject<Models.Product>(product.ToString()).ProviderId,
        IsActive = isActiveValue
      };
      // Console.WriteLine(newProduct.IsActive);
      // Console.WriteLine(Connection.ProductConnection.AddEntity(newProduct));
      Connection.ProductConnection.AddEntity(newProduct);
      return new JsonResult(newProduct);
    }

    // GET: api/product/category/{id}
    [EnableCors("Policy")]
    [HttpGet("category/{id}")]
    public JsonResult GetProductsByCategory(int id)
    {
      List<Models.Product> filteredProducts = Connection.ProductConnection
        .GetEntities()
        .Where(c => c.CategoryId.Equals(id))
        .ToList();
      return new JsonResult(filteredProducts);
    }

    // GET: api/product/provider/{id}
    [EnableCors("Policy")]
    [HttpGet("provider/{id}")]
    public JsonResult GetProductsByProvider(int id)
    {
      List<Models.Product> filteredProducts = Connection.ProductConnection
        .GetEntities()
        .Where(c => c.ProviderId.Equals(id))
        .ToList();
      return new JsonResult(filteredProducts);
    }


    // POST: api/product/all/{id}
    [EnableCors("Policy")]
    [HttpPost("all/{id}")]
    public JsonResult FetchProductsFiltered(int id, [FromBody]Object filterType)
    {
      Models.Product productFilterType = new Models.Product() {
        FilterType = JsonConvert.DeserializeObject<Models.Product>(filterType.ToString()).FilterType
      };
      List<Models.Product> filteredProducts = null;
      int filterCheapestProducts = 2;
      int filterSellingProducts = 1;

      if (productFilterType.FilterType)
      {
        filteredProducts = Connection.ProductConnection
          .GetEntities()
          .Where(c => c.CategoryId.Equals(id) && c.IsActive == 1)
          .ToList();        
      }
      else if (!productFilterType.FilterType && (id.Equals(filterCheapestProducts))) 
      {
        List<Models.Product> allProducts = Connection.ProductConnection.GetEntities();
        filteredProducts = (
          from product in allProducts
          where product.IsActive == 1
          orderby product.Price
          ascending
          select product
        ).ToList();
      }
      else if (!productFilterType.FilterType && (id.Equals(filterSellingProducts)))
      {
        List<Models.Product> allProducts = Connection.ProductConnection.GetEntities();
        filteredProducts = (
          from product in allProducts
          where product.IsActive == 1
          orderby product.Stock
          ascending
          select product
        ).ToList();
      };
      return new JsonResult(filteredProducts);
    }

    // GET: api/product/
    [EnableCors("Policy")]
    [HttpGet("{id}")]
    public JsonResult GetProduct(int id)
    {
      Models.Product product = Connection.ProductConnection.GetEntity(id);
      return new JsonResult(product);
    }
  }
}

