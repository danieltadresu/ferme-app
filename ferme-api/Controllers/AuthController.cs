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
    public IActionResult SignIn([FromBody]Object user)
    {
      String email = JsonConvert.DeserializeObject<User>(user.ToString()).Email;
      String password = JsonConvert.DeserializeObject<User>(user.ToString()).Password;
      Console.WriteLine(email);
      Console.WriteLine(password);

      Boolean foundUser = false;
      foreach (var item in Connection.UserConnection.GetEntities())
      {
        if (item.Email == email)
        {
            if (item.Password == password)
            {
              foundUser = true;
              break;
            }
        }
      }

      if (foundUser)
      {
        return Ok();
      } else {
        return Problem();
      }
    }
  }
}

