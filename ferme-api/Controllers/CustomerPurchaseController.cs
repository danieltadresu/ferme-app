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
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Services.Controllers
{
  //localhost:5001/api/auth
  [Route("api/[controller]")]
  [ApiController]
  public class CustomerPurchase : ControllerBase
  {
    //POST: api/customerpurchase/session
    [EnableCors("Policy")]
    [HttpPost("session")]
    public JsonResult GetCustomerPurchaseToken([FromBody]Object customerPurchase)
    {
      Models.CustomerPurchase newCustomerPurchase = new Models.CustomerPurchase() {
        Id = JsonConvert.DeserializeObject<Models.CustomerPurchase>(customerPurchase.ToString()).Id,
        ProductQuantity = JsonConvert.DeserializeObject<Models.CustomerPurchase>(customerPurchase.ToString()).ProductQuantity,
        TotalPurchase = JsonConvert.DeserializeObject<Models.CustomerPurchase>(customerPurchase.ToString()).TotalPurchase,
        PaymentMethodId = JsonConvert.DeserializeObject<Models.CustomerPurchase>(customerPurchase.ToString()).PaymentMethodId,
        DeliveryTypeId = JsonConvert.DeserializeObject<Models.CustomerPurchase>(customerPurchase.ToString()).DeliveryTypeId,
        CustomerId = JsonConvert.DeserializeObject<Models.CustomerPurchase>(customerPurchase.ToString()).CustomerId,
        ProductId = JsonConvert.DeserializeObject<Models.CustomerPurchase>(customerPurchase.ToString()).ProductId,
        Createdat = JsonConvert.DeserializeObject<Models.CustomerPurchase>(customerPurchase.ToString()).Createdat,
        Updatedat = JsonConvert.DeserializeObject<Models.CustomerPurchase>(customerPurchase.ToString()).Updatedat
      };
      // Console.WriteLine(newCustomerPurchase.Id);
      // Console.WriteLine(newCustomerPurchase.ProductQuantity);
      // Console.WriteLine(newCustomerPurchase.TotalPurchase);
      // Console.WriteLine(newCustomerPurchase.PaymentMethodId);
      // Console.WriteLine(newCustomerPurchase.DeliveryTypeId);
      // Console.WriteLine(newCustomerPurchase.CustomerId);
      // Console.WriteLine(newCustomerPurchase.ProductId);
      // Console.WriteLine(newCustomerPurchase.Createdat);
      // Console.WriteLine(newCustomerPurchase.Updatedat);

      var domain = "http://localhost:3000";
      var options = new SessionCreateOptions
      {
        PaymentMethodTypes = new List<String>
        {
          "card",
        },
        LineItems = new List<SessionLineItemOptions>
        {
          new SessionLineItemOptions
          {
            PriceData = new SessionLineItemPriceDataOptions
            {
              UnitAmount = newCustomerPurchase.TotalPurchase,
              Currency = "usd",
              ProductData = new SessionLineItemPriceDataProductDataOptions
              {
                Name = "Product title"
              },
            },
            Quantity = 1,
          }
        },
        Mode = "payment",
        SuccessUrl = "http://localhost:3000/success-purchase",
        CancelUrl = "http://localhost:3000/rejected-purchase"
      };
      var service = new SessionService();
      Session session = service.Create(options);
      return new JsonResult(session.Id);
      //Console.WriteLine(Connection.CustomerPurchaseConnection.AddEntity(newCustomerPurchase));
    }
  }
}

