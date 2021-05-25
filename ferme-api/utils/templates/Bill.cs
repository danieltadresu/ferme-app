using System.Text;
using Models;
namespace utils.templates
{
  public static class Bill
  {
    public static string GetHTMLString(
      CustomerPurchase customerPurchase
    ) {
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
      sb.Append(customerPurchase.CustomerId);

      sb.Append(@"
            </table>
          </body>
        </html>");

      return sb.ToString();
    }
  }
}