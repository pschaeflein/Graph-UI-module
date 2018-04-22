﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroupsReact.Models
{
  public class GroupViewModel
  {
    public string Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string GroupType { get; set; }
    public string MailNickname { get; set; }
    public string Thumbnail { get; set; }
    public string Visibility { get; set; }
  }
}
