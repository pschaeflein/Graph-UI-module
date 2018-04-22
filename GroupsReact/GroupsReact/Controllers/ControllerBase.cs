using GroupsReact.Helpers;
using GroupsReact.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroupsReact.Controllers
{
  public class ControllerBase : Controller
  {
    private readonly IMemoryCache _memoryCache;

    public ControllerBase() { }

    public ControllerBase(IMemoryCache memoryCache) => _memoryCache = memoryCache;

    public void CopyUserModelToViewData(string userId)
    {
      var userModel = GetUserModelFromCache(userId);
      ViewData["userId"] = userId;
      ViewData["userName"] = userModel?.Name;
      ViewData["userEmail"] = userModel?.Email;
      ViewData["Picture"] = userModel?.PictureBase64;
    }

    public UserModel GetUserModelFromCache(string userId)
    {
      return new SessionUserCache(userId, _memoryCache).ReadUserStateValue();
    }

    public void SaveUserModelInCache(UserModel userModel)
    {
      new SessionUserCache(userModel.Id, _memoryCache).SaveUserStateValue(userModel);
    }
  }
}
