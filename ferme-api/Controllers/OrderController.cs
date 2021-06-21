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
using Stripe;
using Stripe.Checkout;
using System.Data;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Services.Controllers
{
  //localhost:5001/api/auth
  [Route("api/[controller]")]
  [ApiController]
  public class OrderController : ControllerBase
  {
    // //POST: api/order
    // [EnableCors("Policy")]
    // [HttpPost("ar")]
    // public void AddOrder ([FromBody]IEnumerable<int> ids)
    // {
    //   IEnumerable<int> result = ids;
    //   // Console.WriteLine(result.Count());
    //   List<Models.OrderItem> orders = new List<Models.OrderItem>();

    //   for (int i = 0; i <= result.Count(); i = i + 2)
    //   {
    //     Console.WriteLine(result);
    //   } 
    //   // foreach (var i in result)
    //   // {
    //   //   int quantity = 0;
    //   //   foreach (var j in result)
    //   //   {
    //   //     if (i == j)
    //   //     {
    //   //       quantity += 1;
    //   //     }

    //   //   }

    //   //   Models.OrderItem order = new Models.OrderItem() {
    //   //     Id = i,
    //   //     ProductId = i,
    //   //     ProductQuantity = quantity
    //   //   };
    //   //   orders.Add(order);
    //   // }

    //   // foreach (var item in orders)
    //   // {
    //   //   Console.WriteLine(item.ProductId);
    //   //   Console.WriteLine(item.ProductQuantity);
    //   // }
    // }

    
    [EnableCors("Policy")]
    [HttpPost("test")]
    public void Test ([FromBody]Object data)
    {
      // string json = @""{"""key1"":""value1"",""key2"":""value2""}";

      string json = data.ToString();
      Console.WriteLine(json);
      Dictionary<string, string> values = JsonConvert.DeserializeObject<Dictionary<string, string>>(json);
      Console.WriteLine(values.Count);
      Console.WriteLine(values["key1"]);
    }


    [EnableCors("Policy")]
    [HttpPost("testarreglo")]
    public void TestArreglo ([FromBody]Object data)
    {
      string json = @"[
        {
          'Id': '2',
          'ProductId': '1',
          'ProductQuantity': '12'
        },
        {
          'Id': '1',
          'ProductId': '1',
          'ProductQuantity': '1'
        }
      ]";

      List<Product> products = JsonConvert.DeserializeObject<List<Product>>(json);

      //List<Models.OrderItem> items = new List<Models.OrderItem>();
      List<Models.OrderItem> items = JsonConvert.DeserializeObject<List<Models.OrderItem>>(json);
      Console.WriteLine(items.Count);
      Models.OrderItem order = items[0];
      Console.WriteLine(order.Id);
      Console.WriteLine(order.ProductQuantity);

    }

    [EnableCors("Policy")]
    [HttpPost("{customerId}/{deliveryTypeId}/{totalPurchase}")]
    public JsonResult AddOrder (int customerId, int deliveryTypeId, int totalPurchase, [FromBody]Object data)
    {
      string json = data.ToString();
      // Console.WriteLine(json);
      // List<Models.OrderItem> items = JsonConvert.DeserializeObject<List<Models.OrderItem>>(json);
      // Console.WriteLine(items.Count);
      // Models.OrderItem order = items[0];
      // Console.WriteLine(order.Id);
      // Console.WriteLine(order.ProductQuantity);
      // foreach (var item in items)
      // {
      //   Console.WriteLine(item.Id);
      //   Console.WriteLine(item.ProductId);
      //   Console.WriteLine(item.ProductQuantity);
      // }
      // List<Models.CartItem> cartItems = JsonConvert.DeserializeObject<List<Models.CartItem>>(json);
      // foreach (var item in cartItems)
      // {
      //   Console.WriteLine("PRODUCTO");
      //   Console.WriteLine(item.Id);
      //   Console.WriteLine(item.ProductId);
      //   Console.WriteLine(item.ProductQuantity);
      // }

      // Obtener el ultimo ID registrado de Orden
      List<int> allOrders = new List<int>();
      foreach (var item in Connection.OrderConnection.GetEntities())
      {
        allOrders.Add(item.Id);
      }
      int lastOrderId = 0;
      if (allOrders.Count > 0)
      {
        lastOrderId = allOrders.Max();
      }

      // Guardar Orden de Compra
      Models.Order order = new Models.Order() {
        Id = lastOrderId + 1,
        TotalPurchase = totalPurchase,
        PaymentMethodId = 1,
        DeliveryTypeId = deliveryTypeId,
        CustomerId = customerId,
      };

      String sessionToken = null;
      List<Models.CartItem> cartItems = JsonConvert.DeserializeObject<List<Models.CartItem>>(json);
      if (Connection.OrderConnection.AddEntity(order))
      {
        Console.WriteLine("Saved");
        // Guardar Datos de Cart Items
        foreach (var item in cartItems)
        {

          // Obtener el ultimo registro de CartItem
          List<int> allCartItems = new List<int>();
          foreach (var i in Connection.CartItemConnection.GetEntities())
          {
            allCartItems.Add(i.Id);
          }
          int lastCartItemId = 0;
          if (allCartItems.Count > 0)
          {
            lastCartItemId = allCartItems.Max();
          }
          Console.WriteLine(lastCartItemId);
          Models.CartItem cartItem = new Models.CartItem() {
            Id = lastCartItemId + 1,
            OrderId = order.Id,
            ProductId = item.ProductId,
            ProductQuantity = item.ProductQuantity
          };
          
          // Actualizar stock de Producto
          if(Connection.CartItemConnection.AddEntity(cartItem)) {
            Models.Product product = ProductConnection.GetEntity(cartItem.ProductId);
            int newStock = product.Stock - cartItem.ProductQuantity;
            Connection.ProductConnection.UpdateProductStock(product.Id, newStock);
          };
        }

        // List<SessionLineItemOptions> lineItems = new List<SessionLineItemOptions>
        // {
        //     new SessionLineItemOptions
        //     {
        //         Price = "{{PRICE_ID_1}}",
        //         Quantity = 1,
        //     },
        //     new SessionLineItemOptions
        //     {
        //         Price = "{{PRICE_ID_2}}",
        //         Quantity = 1,
        //     },
        // },
        List<SessionLineItemOptions> lineItems = new List<SessionLineItemOptions>();
        foreach (var item in cartItems)
        {
          lineItems.Add(new SessionLineItemOptions
            {
              Name = "Dummy Product",
              Currency = "CLP",
              Amount = 101,
              Quantity = 101,
            });
        };

        int orderId = order.Id;
        var options = new SessionCreateOptions
          {
            PaymentMethodTypes = new List<String>
            {
              "card",
            },
            LineItems = lineItems,
            // LineItems = new List<SessionLineItemOptions>
            // {
            //   new SessionLineItemOptions
            //   {
            //     PriceData = new SessionLineItemPriceDataOptions
            //     {
            //       UnitAmount = order.TotalPurchase,
            //       Currency = "CLP",
            //       ProductData = new SessionLineItemPriceDataProductDataOptions
            //       {
            //         Name = "Product 1"
            //       },
            //     },
            //     Quantity = 1,
            //   },
            //   new SessionLineItemOptions
            //   {
            //     PriceData = new SessionLineItemPriceDataOptions
            //     {
            //       UnitAmount = order.TotalPurchase,
            //       Currency = "CLP",
            //       ProductData = new SessionLineItemPriceDataProductDataOptions
            //       {
            //         Name = "Producto 2"
            //       },
            //     },
            //     Quantity = 1,
            //   }
            // },
            Mode = "payment",
            SuccessUrl = $"http://localhost:3000/success-purchase/{orderId}",
            CancelUrl = "http://localhost:3000/rejected-purchase"
          };
        var service = new SessionService();
        Session session = service.Create(options);
        sessionToken = session.Id;
      }
      return new JsonResult(sessionToken);
    }
    
    [EnableCors("Policy")]
    [HttpGet("all")]
    public JsonResult GetAllOrders() {

      List<Models.Order> orders = Connection.OrderConnection.GetEntities();
      List<Models.Bill> bills = new List<Models.Bill>();
      foreach (var orderItem in orders)
      {
        Models.User userData = Connection.UserConnection
          .GetEntityByPersonId(orderItem.CustomerId);
        Models.UserRole userRoleData = Connection.UserRoleConnection
          .GetEntityByUserId(userData.Id);
        Models.Role roleData = Connection.RoleConnection
          .GetEntity(userRoleData.RoleId);
        Models.DeliveryType deliveryTypeData = Connection.DeliveryTypeConnection
          .GetEntity(orderItem.DeliveryTypeId);

        // Mapeo de objeto Bill
        Models.Bill bill = new Models.Bill() {
          Id = orderItem.Id,
          TotalPurchase = orderItem.TotalPurchase,
          IsInvoice = roleData.Name is "COMPANY" ? true : false,
          DeliveryTypeName = deliveryTypeData.Description.ToUpper(),
        };
        bills.Add(bill);
      }
      return new JsonResult(bills);
    }

  }
}

