using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR.Hubs;
using System.Threading.Tasks;

namespace OnlineWhiteBoard_4.SignalR
{
    [HubName(nameof(HuntCounterHub))]
    public class HuntCounterHub : Hub
    {
        const string HuntGroup = "EggHuntCounters";

        public void JoinGroup()
        {
             Groups.Add(Context.ConnectionId, HuntGroup);    
        }
        public void JoinChat(string name)
        {  
            Clients.Group(HuntGroup).ChatJoined(name);
        }

        public void Add(string HuntPool, string name)
        {
            Clients.Group(HuntGroup).HandleDraw(HuntPool, name);
        }

        public void SendChat( string message, string groupName,string name)
        {
            Clients.Group(HuntGroup).Chat(name, message);
        }

        
    }
}