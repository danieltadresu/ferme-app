using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc; 
using Connection;
using Models;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Services.Controllers
{
  //localhost:5001/api/providerorder
  [Route("api/[controller]")]
  [ApiController]
  public class ProviderOrderController : ControllerBase
  {
    //GET: api/providerorder/all
    [EnableCors("Policy")]
    [HttpGet("all")]
    public JsonResult GetProviderOrders()
    {
      List<ProviderOrder> providers = Connection.ProviderOrderConnection.GetEntities();
      foreach (var item in providers)
      {
        ProviderOrderStatus status = Connection.ProviderOrderStatusConnection.GetEntity(item.OrderStatusId);
        item.OrderStatusName = status.Description;
        
        int quantity = 0;
        foreach (var productOrder in Connection.ProviderOrderProductsConnection.GetEntityByOrderId(item.Id))
        {
          quantity = productOrder.ProductQuantity + quantity;
        }
        item.ProductsQuantity = quantity;
        
        item.ProviderName = Connection.ProviderConnection.GetEntity(item.ProviderId).Name;
      }
      var json = JsonConvert.SerializeObject(providers);
      return new JsonResult(providers);
    }

    // GET: api/providerorder
    [EnableCors("Policy")]
    [HttpGet("{id}")]
    public JsonResult GetProviderOrder(int id) {
      ProviderOrder providerOrder = Connection.ProviderOrderConnection
        .GetEntity(id);
      providerOrder.ProviderName = Connection.ProviderConnection
        .GetEntity(providerOrder.ProviderId).Name;
      providerOrder.OrderStatusName = Connection.ProviderOrderStatusConnection
        .GetEntity(providerOrder.OrderStatusId).Description;
      List<ProviderOrderProducts> providerOrderProducts = Connection
        .ProviderOrderProductsConnection.GetEntityByOrderId(id);
      foreach (var item in providerOrderProducts)
      {
        Models.Product product = Connection.ProductConnection.GetEntity(item.ProductId);
        item.ProductUnitPrice = product.Price;
        item.ProductName = product.Name;
      } 
      providerOrder.ProviderProducts = providerOrderProducts;
      return new JsonResult(providerOrder);
    }

    // POST: api/provider/
    [EnableCors("Policy")]
    [HttpPost("{totalPurchase}/{providerId}/{personId}")]
    public JsonResult AddProviderOrder(int totalPurchase, int providerId, int personId, [FromBody]Object data)
    {

      // Obtener el usuario que Ingresa la Compra de Producto
      User user = Connection.UserConnection.GetEntityByPersonId(personId);
      Console.WriteLine(user.Id);

      // Obtener el ultimo ID de provider_orders
      List<int> allProviderOrders = new List<int>();
      foreach (var item in Connection.ProviderOrderConnection.GetEntities())
      {
        allProviderOrders.Add(item.Id);
      }
      int lastProviderOrderId = 0;
      if (allProviderOrders.Count > 0)
      {
        lastProviderOrderId = allProviderOrders.Max();
      }
      int sentStatusId = 5;
      ProviderOrder providerOrder = new ProviderOrder() {
        Id = lastProviderOrderId + 1,
        Createdat = ((int)DateTimeOffset.Now.ToUnixTimeSeconds()),
        Updatedat = ((int)DateTimeOffset.Now.ToUnixTimeSeconds()),
        TotalPurchase = totalPurchase,
        ProviderId = providerId,
        OrderStatusId = sentStatusId,
        UserId = user.Id
      };
      if (Connection.ProviderOrderConnection.AddEntity(providerOrder))
      {
        string json = data.ToString();
        List<Models.ProviderOrderProducts> providerOrderProducts = JsonConvert.DeserializeObject<List<Models.ProviderOrderProducts>>(json);
        foreach (var item in providerOrderProducts)
        {
          Console.WriteLine(item.Id);
          Console.WriteLine(item.ProductId);
          Console.WriteLine(item.ProductQuantity);

          List<int> allProviderOrderProducts = new List<int>();
          foreach (var ppItem in Connection.ProviderOrderProductsConnection.GetEntities())
          {
            allProviderOrderProducts.Add(ppItem.Id);
          }
          int lastProviderOrderProductId = 0;
          if (allProviderOrderProducts.Count > 0)
          {
            lastProviderOrderProductId = allProviderOrderProducts.Max();
          }
          Models.ProviderOrderProducts newProviderOrderProduct = new Models.ProviderOrderProducts() {
            Id = lastProviderOrderProductId + 1,
            ProviderOrderId = providerOrder.Id,
            ProductId = item.ProductId,
            ProductQuantity = item.ProductQuantity
          };
          Connection.ProviderOrderProductsConnection.AddEntity(newProviderOrderProduct);
        }

      }
      // IMPORTANT: GET CURRENT UNITX TIME IN C# AND FORMAT IT IN CURRENT TIME IN FORMAT DD/MM/YYYY
      // Console.WriteLine(DateTimeOffset.Now.ToUnixTimeSeconds());
      // Console.WriteLine(DateTimeOffset.FromUnixTimeSeconds(DateTimeOffset.Now.ToUnixTimeSeconds()).DateTime);
      // Console.WriteLine(DateTimeOffset.FromUnixTimeSeconds(DateTime.Now).DateTime);
      // Console.WriteLine(Connection.ProviderOrderConnection.AddEntity(providerOrder));
      return new JsonResult(providerOrder);
    }
  
    // GET: api/providerorder/accept/id
    [EnableCors("Policy")]
    [HttpGet("accept/{id}")]
    public JsonResult AcceptProviderOrder(int id) {
      // Obtener providerOrder (Orden)
      ProviderOrder providerOrder = Connection.ProviderOrderConnection
        .GetEntity(id);
      
      int acceptedStatusId = 3;
      if (Connection.ProviderOrderConnection.UpdateProviderOrderStatus(id, acceptedStatusId))
      {
        // Obtener providerOrderProducts (Productos)
        List<Models.ProviderOrderProducts> providerOrderProducts = Connection.ProviderOrderProductsConnection.GetEntityByOrderId(id);
        foreach (var productOrder in providerOrderProducts)
        {
          Models.Product product = Connection.ProductConnection.GetEntity(productOrder.ProductId);
          if (product.IsActive == 0)
          {
            product.IsActive = 1;
            Connection.ProductConnection.UpdateProductActive(product.Id, product.IsActive, productOrder.ProductQuantity);
          } else if (product.IsActive == 1) {
            int newStock = product.Stock + productOrder.ProductQuantity;
            Connection.ProductConnection.UpdateProductStock(product.Id, newStock);
          }
        }
      }
      return new JsonResult(providerOrder);
    }
  
    // GET: api/providerorder/accept/id
    [EnableCors("Policy")]
    [HttpGet("update-provider-status/{id}")]
    public JsonResult UpdateProviderStatus(int id) {
      // Obtener providerOrder (Orden)
      ProviderOrder providerOrder = Connection.ProviderOrderConnection
        .GetEntity(id);
      
      if (providerOrder.OrderStatusId == 5)
      {
        int newStatus = 1;
        providerOrder.OrderStatusId = newStatus;
        Connection.ProviderOrderConnection.UpdateProviderOrderStatus(id, providerOrder.OrderStatusId);
      } else if (providerOrder.OrderStatusId == 1) {
        int newStatus = 2;
        providerOrder.OrderStatusId = newStatus;
        Connection.ProviderOrderConnection.UpdateProviderOrderStatus(id, providerOrder.OrderStatusId);
      }
      return new JsonResult(providerOrder);
    }
  }
}

