using System;
using System.Collections.Generic;
using System.Text;
using Models;
namespace utils.templates
{
  public static class StockReport
  {
    public static string GetHTMLString(
      // Product product
      List<Models.Product> products
    ) {
      var sb = new StringBuilder();
      sb.Append(@"
        <html>
          <head>
          </head>
              <body>
                <div class='header'>
                  <h1 class='header-title'>Ferme Store</h1>
                  <h2 class='header-giro'>RUT 20.158.799-9</h2>
                  <h2 class='header-giro'>GIRO(S): ACTIVIDADES DE VENTA DE PRODUCTOS DE FERRETERÍA</h2>
                  <hr />
                </div>
                <div class='sub-header'>
                  <h1 class='header-title-sub-header'>Informe de Stock de Productos</h1>
                </div>"
        );
      sb.Append(@"
        <div class='main'>
          <table class='styled-table'>
            <thead>
              <tr>
                <th>Código de Producto</th>
                <th>Nombre del Producto</th>
                <th>STOCK</th>
              </tr>
            </thead>
            <tbody>");
      sb.Append(@"<tr>");
      foreach (var item in products)
      {
        sb.Append(@"<tr>");
        sb.Append(@"<td>");
        sb.Append(item.Id);
        sb.Append(@"</td>");
        sb.Append(@"<td>");
        sb.Append(item.Name.ToUpper());
        sb.Append(@"</td>");
        sb.Append(@"<td>");
        sb.Append(item.Stock);
        sb.Append(@"</td>");
        sb.Append(@"</tr>");
      }
      sb.Append(@"
          </body>
        </html>");

      return sb.ToString();
    }
  }
}