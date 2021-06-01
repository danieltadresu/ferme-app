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
  //localhost:5001/api/user
  [Route("api/[controller]")]
  [ApiController]
  public class UserController : ControllerBase
  {
    // GET: api/user/all
    [EnableCors("Policy")]
    [HttpGet("all")]
    public JsonResult GetUsers()
    {
      List<User> users = Connection.UserConnection.GetEntities();
      var json = JsonConvert.SerializeObject(users);
      Console.WriteLine(json);
      return new JsonResult(users);
    }

    // GET: api/user/roles/all
    [EnableCors("Policy")]
    [HttpGet("roles/all")]
    public JsonResult GetUsersRoles()
    {
      List<User> users = Connection.UserConnection.GetEntities();
      foreach (var item in Connection.UserConnection.GetEntities())
      {
        
      }

      var json = JsonConvert.SerializeObject(users);
      Console.WriteLine(json);
      return new JsonResult(users);
    }

    // GET: api/user/
    [EnableCors("Policy")]
    [HttpGet("{id}")]
    public JsonResult GetUser(int id)
    {
      User user = Connection.UserConnection.GetEntity(id);
      Console.WriteLine(user.Email);
      return new JsonResult(user);
    }

    //POST: api/user
    [HttpPost]
    public JsonResult AddUser([FromBody]User user)
    {
      Connection.UserConnection.AddEntity(user);
      return new JsonResult(user);
    }
  }
}

