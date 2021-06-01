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
  //localhost:5001/api/bill
  [Route("api/[controller]")]
  [ApiController]
  public class BillController : ControllerBase
  {
    // GET: https://localhost:5001/api/bill/all
    [EnableCors("Policy")]
    [HttpGet("all")]
    public JsonResult GetCustomerPurchasesBills()
    {
      // List<Models.CustomerPurchase> customerPurchases = Connection
      //   .CustomerPurchaseConnection
      //   .GetEntities();
      // foreach (var customerPurchase in customerPurchases)
      // {
      //   Models.User userData = Connection.UserConnection
      //     .GetEntityByPersonId(customerPurchase.CustomerId);
      //   Models.Person customerData = Connection.PersonConnection
      //     .GetEntity(customerPurchase.CustomerId);
      //   Models.DeliveryType deliveryTypeData = Connection.DeliveryTypeConnection
      //     .GetEntity(customerPurchase.DeliveryTypeId);
      //   Models.Product productData = Connection.ProductConnection
      //     .GetEntity(customerPurchase.ProductId);

      //   customerPurchase.CustomerEmail = userData.Email;
      //   customerPurchase.CustomerName = $"{customerData.FirstName} {customerData.LastName}";
      //   customerPurchase.CustomerPurchaseDeliveryTypeName = deliveryTypeData.Description;
      // }
      // return new JsonResult(customerPurchases);

      List<Models.CustomerPurchase> billsCustomerPurchases = Connection
        .CustomerPurchaseConnection
        .GetEntities();
      foreach (var customerPurchase in billsCustomerPurchases)
      {
        Models.User userData = Connection.UserConnection
          .GetEntityByPersonId(customerPurchase.CustomerId);
        
      }
      return new JsonResult(billsCustomerPurchases);
      
    }
  }
}

