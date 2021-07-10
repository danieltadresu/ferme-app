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
    [HttpPost("session/{id}")]
    public JsonResult GetCustomerPurchaseToken(int id, [FromBody]Object customerPurchase)
    {
      List<int> customerPurchasesIds = new List<int>();
      foreach (var item in Connection.CustomerPurchaseConnection.GetEntities())
      {
        customerPurchasesIds.Add(item.Id);
      }
      int productId = id;
      Models.Product product = ProductConnection.GetEntity(id);
      Console.WriteLine(product);

      int lastCustomerPurchaseRecordId = 0;
      if (customerPurchasesIds.Count > 0)
      {
        lastCustomerPurchaseRecordId = customerPurchasesIds.Max();
      }
      Models.CustomerPurchase newCustomerPurchase = new Models.CustomerPurchase() {
        Id = lastCustomerPurchaseRecordId + JsonConvert.DeserializeObject<Models.CustomerPurchase>(customerPurchase.ToString()).Id,
        ProductQuantity = JsonConvert.DeserializeObject<Models.CustomerPurchase>(customerPurchase.ToString()).ProductQuantity,
        TotalPurchase = JsonConvert.DeserializeObject<Models.CustomerPurchase>(customerPurchase.ToString()).TotalPurchase,
        PaymentMethodId = JsonConvert.DeserializeObject<Models.CustomerPurchase>(customerPurchase.ToString()).PaymentMethodId,
        DeliveryTypeId = JsonConvert.DeserializeObject<Models.CustomerPurchase>(customerPurchase.ToString()).DeliveryTypeId,
        CustomerId = JsonConvert.DeserializeObject<Models.CustomerPurchase>(customerPurchase.ToString()).CustomerId,
        ProductId = JsonConvert.DeserializeObject<Models.CustomerPurchase>(customerPurchase.ToString()).ProductId,
        Createdat = JsonConvert.DeserializeObject<Models.CustomerPurchase>(customerPurchase.ToString()).Createdat,
        Updatedat = JsonConvert.DeserializeObject<Models.CustomerPurchase>(customerPurchase.ToString()).Updatedat,
      };
      Boolean addCustomerPurchase = Connection
        .CustomerPurchaseConnection.AddEntity(newCustomerPurchase);

      
      if (addCustomerPurchase)
      {
        int newStock = product.Stock - newCustomerPurchase.ProductQuantity;
        Connection.ProductConnection.UpdateProductStock(productId, newStock);

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
                UnitAmount = product.Price,
                Currency = "CLP",
                ProductData = new SessionLineItemPriceDataProductDataOptions
                {
                  Name = product.Name
                },
              },
              Quantity = newCustomerPurchase.ProductQuantity,
            }
          },
          Mode = "payment",
          SuccessUrl = "http://localhost:3000/success-purchase",
          CancelUrl = "http://localhost:3000/rejected-purchase"
        };
        var service = new SessionService();
        Session session = service.Create(options);
        return new JsonResult(session.Id);
      } else {
        Error404 response = new Error404() {
          Message = "Problemas al insertar registro de CustomerPurchase"
        };
        return new JsonResult(response);
      }
    }

    // GET: https://localhost:5001/api/customerpurchase/all
    [EnableCors("Policy")]
    [HttpGet("all")]
    public JsonResult GetCustomerPurchases()
    {
      List<Models.CustomerPurchase> customerPurchases = Connection
        .CustomerPurchaseConnection
        .GetEntities();
      return new JsonResult(customerPurchases);
    }


    // GET: https://localhost:5001/api/customerpurchase/bills
    [EnableCors("Policy")]
    [HttpGet("bills")]
    public JsonResult GetCustomerPurchasesBills()
    {
      List<Models.CustomerPurchase> customerPurchases = Connection
        .CustomerPurchaseConnection
        .GetEntities();
      foreach (var customerPurchase in customerPurchases)
      {
        Models.User userData = Connection.UserConnection
          .GetEntityByPersonId(customerPurchase.CustomerId);
        Models.UserRole userRoleData = Connection.UserRoleConnection
          .GetEntityByUserId(userData.Id);
        Models.Role roleData = Connection.RoleConnection
          .GetEntity(userRoleData.RoleId);
        Models.Person customerData = Connection.PersonConnection
          .GetEntity(customerPurchase.CustomerId);
        Models.DeliveryType deliveryTypeData = Connection.DeliveryTypeConnection
          .GetEntity(customerPurchase.DeliveryTypeId);
        Models.Product productData = Connection.ProductConnection
          .GetEntity(customerPurchase.ProductId);

        customerPurchase.CustomerEmail = userData.Email.ToUpper();
        customerPurchase.CustomerName = $"{customerData.FirstName} {customerData.LastName}";
        customerPurchase.DeliveryTypeName = deliveryTypeData.Description.ToUpper();
        customerPurchase.ProductName = productData.Name.ToUpper();
        customerPurchase.IsInvoice = roleData.Name is "COMPANY" ? true : false;
      }
      Console.WriteLine("All customer Purchases");
      return new JsonResult(customerPurchases);
    }



    // //POST: api/customerpurchase
    // [EnableCors("Policy")]
    // [HttpPost("session")]
    // public JsonResult AddPurchase([FromBody]Object customerPurchase)
    // {
    //   return new JsonResult(1);
    // }
  }
}

