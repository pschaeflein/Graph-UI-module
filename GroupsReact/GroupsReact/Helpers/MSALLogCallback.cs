using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroupsReact.Helpers
{
  public class MSALLogCallback
  {
    private static StringBuilder log = new StringBuilder();
    public string GetLog()
    {
      var x = log.ToString();
      log.Clear();
      return x;
    }

    public void Log(Logger.LogLevel level, string message, bool containsPii)
    {
      string requestId = Activity.Current?.Id;//?? HttpContext.TraceIdentifier,

      log.AppendLine($"{requestId} - {level.ToString()} - {message}");
    }

  }
}
