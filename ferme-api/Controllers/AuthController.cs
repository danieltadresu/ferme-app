using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc; 
using Connection;
using Models;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Cors;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Services.Controllers
{
  //localhost:5001/api/auth
  [Route("api/[controller]")]
  [ApiController]
  public class Auth : ControllerBase
  {
    //POST: api/user
    [EnableCors("Policy")]
    [HttpPost("signin")]
    public void SignIn([FromBody]User user)
    {
      Console.WriteLine(user.UserId);
      Console.WriteLine("Hello world");
    }

  }
}

