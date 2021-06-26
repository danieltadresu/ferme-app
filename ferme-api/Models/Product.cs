using System;

namespace Models
{
  public class Product
  {
    private int id;
    public int Id
    {
      get { return id; }
      set { id = value; }
    }

    private String name;
    public String Name
    {
      get { return name; }
      set { name = value; }
    }

    private String description;
    
    public String Description
    {
      get { return description; }
      set { description = value; }
    }

    private int createdat;
    
    public int Createdat
    {
      get { return createdat; }
      set { createdat = value; }
    }

    private DateTime createdAtFromUnixTime;
    public DateTime CreatedAtFromUnixTime
    {
      get { return createdAtFromUnixTime; }
      set { createdAtFromUnixTime = value; }
    }

    private int updatedat;
    
    public int Updatedat
    {
      get { return updatedat; }
      set { updatedat = value; }
    }

    private int price;
    
    public int Price
    {
      get { return price; }
      set { price = value; }
    }

    private int stock;
    
    public int Stock
    {
      get { return stock; }
      set { stock = value; }
    }

    private String imageUrl;
    
    public String ImageUrl
    {
      get { return imageUrl; }
      set { imageUrl = value; }
    }

    private int categoryId;
    
    public int CategoryId
    {
      get { return categoryId; }
      set { categoryId = value; }
    }

    private int providerId;
    
    public int ProviderId
    {
      get { return providerId; }
      set { providerId = value; }
    }

    private String providerName;
    
    public String ProviderName
    {
      get { return providerName; }
      set { providerName = value; }
    }

    private Boolean filterType;
    public Boolean FilterType
    {
      get { return filterType; }
      set{ filterType = value; }
    }

    public Product () {
      Init();
    }

    public void Init() {
      Id = 0;
      Name = null;
      Description = null;
      Createdat = 0;
      CreatedAtFromUnixTime = DateTime.Now;
      Updatedat = 0;
      Price = 0;
      Stock = 0;
      ImageUrl = null;
      CategoryId = 0;
      ProviderId = 0;
      ProviderName = null;
      FilterType = false;
    }

    public String GetData() {
      return Name;
    }
  }
};