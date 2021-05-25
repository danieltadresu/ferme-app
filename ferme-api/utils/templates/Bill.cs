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
              <h1 class='header-title'>Ferme Store</h1>
              <h5 class='header-subtitle'>RUT: 77.261.280-K</h5>
              <hr/>");
      sb.Append(@"
              <h5 class='header-bill-nro'>Boleta Electrónica Nro.");
      sb.Append(customerPurchase.Id);
      sb.Append(@"</h5> </div>");
      sb.Append(@"<div class='total-purchase'>
        <h1>Total Purchase:");
      sb.Append(customerPurchase.TotalPurchase);
      sb.Append(@"</div>");
      // sb.Append(customerPurchase.CustomerId);
      // sb.Append(customerPurchase.ProductQuantity);
      // sb.Append(customerPurchase.ProductId);
      // sb.Append(customerPurchase.TotalPurchase);

      sb.Append(@"
          </body>
        </html>");

      return sb.ToString();
    }
  }
}