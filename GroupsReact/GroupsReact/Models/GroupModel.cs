using Microsoft.Graph;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace GroupsReact.Models
{
  public class GroupModel
  {
    [JsonProperty("key")]
    public string Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string GroupType { get; set; }
    public string Mail { get; set; }
    public string Thumbnail { get; set; }
    public string Visibility { get; set; }
    public string Classification { get; set; }
    public DateTimeOffset? CreatedDateTime { get; set; }
    public string Policy { get; set; }
    public DateTimeOffset? RenewedDateTime { get; set; }

    public string DriveWebUrl { get; set; }
    public string MailboxWebUrl
    {
      get
      {
        return $"https://outlook.office.com/owa/?path=/group/{Mail}/mail";
      }
    }

    public AdaptiveCards.AdaptiveCard InfoCard { get; set; }
    public List<DriveItem> DriveRecentItems { get; set; }
    public Conversation LatestConversation { get; set; }

    public GroupModel()
    {
      Mail = "";
      Thumbnail = "";
      Visibility = "";
      DriveWebUrl = "";
      DriveRecentItems = new List<DriveItem>();
    }
  }

  public class Conversation
  {
    public string Topic { get; set; }
    public DateTimeOffset? LastDeliveredDateTime { get; set; }
    public List<string> UniqueSenders { get; set; }

    public string LastDelivered
    {
      get
      {
        return LastDeliveredDateTime.Value.ToString("ddd d MMM");
      }
    }
    public Conversation()
    {
      UniqueSenders = new List<string>();
    }
  }
}

