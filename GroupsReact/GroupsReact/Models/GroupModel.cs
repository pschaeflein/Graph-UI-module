using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroupsReact.Models
{
  public class GroupModel
  {
    public string Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string GroupType { get; set; }
    public string Mail { get; set; }
    public string Thumbnail { get; set; }
    public string Visibility { get; set; }
    public string Classification { get; set; }
    public DateTimeOffset CreatedDateTime { get; set; }

    public string DriveWebUrl { get; set; }
    public string MailboxWebUrl
    {
      get
      {
        return $"https://outlook.office.com/owa/?path=/group/{Mail}/mail";
      }
    }
  }
}
