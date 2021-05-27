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
using DinkToPdf;
using DinkToPdf.Contracts;
using System.IO;
using utils;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Services.Controllers
{
  //localhost:5001/api/file
  [Route("api/[controller]")]
  [ApiController]
  public class FileController : ControllerBase
  {
    private IConverter _converter;

    public FileController(IConverter converter)
    {
      _converter = converter;
    }


    // // INVOICE -> Factura
    // // GET: api/file/bill
    // [EnableCors("Policy")]
    // [HttpGet("bill")]
    // // Boleta
    // public IActionResult GetBill()
    // {
    //   var globalSettings = new GlobalSettings {
    //     ColorMode = ColorMode.Color,
    //     Orientation = Orientation.Portrait,
    //     PaperSize = PaperKind.A4,
    //     Margins = new MarginSettings { Top = 10 },
    //     DocumentTitle = "PDF Bill",
    //   };

    //   var objectSettings = new ObjectSettings {
    //     PagesCount = true,
    //     HtmlContent = utils.templates.Bill.GetHTMLString(),
    //     WebSettings = { DefaultEncoding = "utf-8", UserStyleSheet = Path.Combine(Directory.GetCurrentDirectory(), "assets", "styles.css") },
    //     HeaderSettings = { FontName = "Arial", FontSize = 9, Right = "Page [page] of [toPage]", Line = true },
    //     FooterSettings = { FontName = "Arial", FontSize = 9, Line = true, Center = "Report Footer" }
    //   };

    //   var document = new HtmlToPdfDocument() {
    //     GlobalSettings = globalSettings,
    //     Objects = { objectSettings }
    //   };

    //   var file = _converter.Convert(document);
    //   return File(file, "application/pdf");
    // }

    // INVOICE -> Factura
    // GET: api/file/bill
    [EnableCors("Policy")]
    [HttpGet("bill/{id}")]
    // Boleta
    public IActionResult GetBill(int id)
    {
      Console.WriteLine(id);
      Models.CustomerPurchase customerPurchase = CustomerPurchaseConnection.GetEntity(id);
      var globalSettings = new GlobalSettings {
        ColorMode = ColorMode.Color,
        Orientation = Orientation.Portrait,
        PaperSize = PaperKind.A4,
        Margins = new MarginSettings { Top = 10 },
        DocumentTitle = "PDF Bill",
      };

      var objectSettings = new ObjectSettings {
        PagesCount = true,
        HtmlContent = utils.templates.Bill.GetHTMLString(customerPurchase),
        WebSettings = { DefaultEncoding = "utf-8", UserStyleSheet = Path.Combine(Directory.GetCurrentDirectory(), "assets", "styles.css") },
        HeaderSettings = { FontName = "Arial", FontSize = 9, Right = "Page [page] of [toPage]", Line = true },
        FooterSettings = { FontName = "Arial", FontSize = 9, Line = true, Center = "Report Footer" }
      };

      var document = new HtmlToPdfDocument() {
        GlobalSettings = globalSettings,
        Objects = { objectSettings }
      };

      var file = _converter.Convert(document);
      return File(file, "application/pdf");
    }

  }
}
