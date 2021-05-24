using System.Text;
using Models;
namespace utils.templates
{
  public static class Bill
  {
    public static string GetHTMLString()
    {
      var user = new Models.User();
      user.Id = 1;
      var sb = new StringBuilder();
      sb.Append(@"
        <html>
          <head>
          </head>
          <body>
            <div class='header'>
              <h1>This is the generated PDF report!!!</h1>
            </div>
            <table align='center'>
              <tr>
                <th>Name</th>
                <th>LastName</th>
                <th>Age</th>
                <th>Gender</th>
              </tr>");
      sb.Append(1);
      sb.Append(user.PersonId);
      sb.Append(user.Id);
      sb.Append("Hello world!!");

      sb.Append(@"
            </table>
          </body>
        </html>");

      return sb.ToString();
    }
  }
}