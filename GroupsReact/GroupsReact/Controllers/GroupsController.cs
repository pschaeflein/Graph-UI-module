using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GroupsReact.Helpers;
using GroupsReact.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Graph;

namespace GroupsReact.Controllers
{
  public class GroupsController : ControllerBase
  {
    private readonly IGraphSdkHelper _graphSdkHelper;

    public GroupsController(IGraphSdkHelper graphSdkHelper, IMemoryCache memoryCache)
      : base(memoryCache)
    {
      _graphSdkHelper = graphSdkHelper;
    }

    [Authorize]
    // GET: Group
    public async Task<ActionResult> Index()
    {
      List<GroupViewModel> data = new List<GroupViewModel>();

      // Get user's id for token cache.
      var identifier = User.FindFirst(GraphAuthProvider.ObjectIdentifierType)?.Value;
      base.CopyUserModelToViewData(identifier);

      // Initialize the GraphServiceClient.
      var graphClient = _graphSdkHelper.GetAuthenticatedClient(identifier);

      try
      {
        var groupsData = await GraphService.GetGroups(graphClient, HttpContext);
        foreach (var group in groupsData)
        {
          data.Add(new GroupViewModel
          {
            Id = group.Id,
            Description = group.Description,
            GroupType = String.Join(" ", group.GroupTypes),
            Name = group.DisplayName,
            MailNickname = group.MailNickname,
            Thumbnail = "",
            Visibility = group.Visibility
          });
        }
      }
      catch (ServiceException e)
      {
        switch (e.Error.Code)
        {
          case "Authorization_RequestDenied":
            return new RedirectResult("/Account/PermissionsRequired");
          default:
            //return JsonConvert.SerializeObject(new { Message = "An unknown error has occurred." }, Formatting.Indented);
            var x = e.ToString();
            break;
        }
      }


      return View(data);
    }

    // GET Group/Photo
    public async Task<ActionResult> Photo(string id, string userId)
    {

      // Initialize the GraphServiceClient.
      var graphClient = _graphSdkHelper.GetAuthenticatedClient(userId);

      string pic = default(string);
      try
      {
        pic = await GraphService.GetGroupPictureBase64(graphClient, id, HttpContext);
      }
      catch (ServiceException e)
      {
        switch (e.Error.Code)
        {
          case "Authorization_RequestDenied":
            return new RedirectResult("/Account/PermissionsRequired");
          default:
            //return JsonConvert.SerializeObject(new { Message = "An unknown error has occurred." }, Formatting.Indented);
            var x = e.ToString();
            break;
        }
      }
      return Json(new { id = id, photoUrl = pic });

    }
  }
}