using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Threading.Tasks;
using SignalRSimple.EF;

namespace SignalRSimple.SignalR
{
    public class CounterHub : Hub
    {
        private EggHuntEntities EHEntities = new EggHuntEntities();
        public enum Groups
        {
            GroupA, GroupB, GroupC
        }
        public void Hello()
        {
            string output = "";

            var a = EHEntities.Counts.ToList();
            foreach (var item in a)
            {
                output += item.GroupName + ": " + item.Value.ToString() + " | ";
            }
            if (!string.IsNullOrEmpty(output))
            {
                output = output.Substring(0, (output.Length - 3));
                Clients.All.hello(output);
            }
            else
            {
                Clients.All.hello("Exception occurred!!");
            }


        }

        public void Increment(Groups GroupName)
        {
            string _grp = "";
            if (GroupName == Groups.GroupA)
            {
                _grp = "GroupA";
            }
            else
            if (GroupName == Groups.GroupB)
            {
                _grp = "GroupB";
            }
            else
            if (GroupName == Groups.GroupC)
            {
                _grp = "GroupC";
            }
            else
            {
                return;
            }
            Count result = EHEntities.Counts.Where(x => _grp == x.GroupName).First();
            if (result != null)
            {
                result.Value = result.Value + 1;
                EHEntities.SaveChanges();
                Hello();
            }
        }

        public CounterHub()
        {
            // Create a Long running task to do an infinite loop which will keep sending the server time
            // to the clients every 3 seconds.
            //var taskTimer = Task.Factory.StartNew(async () =>
            //{
            //    while (true)
            //    {
            //        string timeNow = DateTime.Now.ToString();
            //        //Sending the server time to all the connected clients on the client method SendServerTime()
            //        Clients.All.SendServerTime(timeNow);
            //        //Delaying by 3 seconds.
            //        await Task.Delay(3000);
            //    }
            //}, TaskCreationOptions.LongRunning
            //    );
        }
    }
}