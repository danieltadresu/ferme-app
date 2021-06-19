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
  public class Order : ControllerBase
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
    // [HttpPost("testarreglo")]
    public void AddOrder ([FromBody]Object data)
    {
      string json = data.ToString();
      Console.WriteLine(json);
      List<Models.OrderItem> items = JsonConvert.DeserializeObject<List<Models.OrderItem>>(json);
      Console.WriteLine(items.Count);
      Models.OrderItem order = items[0];
      Console.WriteLine(order.Id);
      Console.WriteLine(order.ProductQuantity);

    }
  }
}

