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
  //localhost:5001/api/providerorderstatus
  [Route("api/[controller]")]
  [ApiController]
  public class ProviderOrderStatusController : ControllerBase
  {
    //GET: api/providerorderstatus
    [EnableCors("Policy")]
    [HttpGet("")]
    public JsonResult GetProviderOrderStatus()
    {
      List<ProviderOrderStatus> status = Connection.ProviderOrderStatusConnection.GetEntities();
      var json = JsonConvert.SerializeObject(status);
      return new JsonResult(status);
    }
  }
}

