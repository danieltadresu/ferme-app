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
  //localhost:5001/api/auth
  [Route("api/[controller]")]
  [ApiController]
  public class Auth : ControllerBase
  {
    //POST: api/auth/login
    [EnableCors("Policy")]
    [HttpPost("login")]
    public JsonResult SignIn([FromBody]Object user)
    {
      String email = JsonConvert.DeserializeObject<User>(user.ToString()).Email;
      String password = JsonConvert.DeserializeObject<User>(user.ToString()).Password;
      Boolean foundUser = false;
      User selectedUser = new User();
      foreach (var item in Connection.UserConnection.GetEntities())
      {
        if (item.Email == email)
        {
          if (item.Password == password)
          {
            selectedUser.Id = item.Id;
            selectedUser.PersonId = item.PersonId;
            selectedUser.Email = item.Email;
            selectedUser.Password = item.Password;
            foundUser = true;
            break;
          }
        }
      }
      if (foundUser)
      {
        UserRole userRole = Connection.UserRoleConnection.GetEntityByUserId(selectedUser.Id);
        Role role = Connection.RoleConnection.GetEntity(userRole.Id);
        Person person = Connection.PersonConnection.GetEntity(selectedUser.PersonId);
        Authenticate authenticate = new Authenticate() {
          Status = 202,
          Message = "Found",
          Token = "DummyToken",
          RoleName = role.Name,
          RoleId = role.Id,
          PersonId = person.Id,
          PersonName = $"{person.FirstName} {person.LastName}"
        };
        return new JsonResult(authenticate);
      } else {
        Error404 error = new Error404();
        error.Status = 404;
        error.Message = "Not Found";
        return new JsonResult(error);
      }
    }
  }
}

