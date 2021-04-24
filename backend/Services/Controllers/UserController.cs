using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc; 
using Connection;
using Models;
using Newtonsoft.Json;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Services.Controllers
{
  //localhost:5001/api/user
  [Route("api/[controller]")]
  [ApiController]
  public class UserController : ControllerBase
  {
    // GET: api/user/all
    [HttpGet("all")]
    public JsonResult GetUsers()
    {
      List<User> users = Connection.UserConnection.GetEntities();
      var json = JsonConvert.SerializeObject(users);
      Console.WriteLine(json);
      return new JsonResult(users);
    }

    //POST: api/user
    [HttpPost]
    public void AddUser([FromBody]User user)
    {
      Connection.UserConnection.AddEntity(user);
    }
  }
}

