using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRSimple.EF
{
    public class EHContext
    {
        private EggHuntEntities EHEntities = new EggHuntEntities();
        public string getCounts()
        {
            string output = "";

            var a = EHEntities.Counts.ToList();
            foreach (var item in a)
            {
                output += item.GroupName + ": " + item.Value.ToString() + " ; ";
            }
            if (!string.IsNullOrEmpty(output))
            {
                output = output.Substring(0, (output.Length - 3));
                return output;
            }
            else
            {
                return output;
            }
        }
    }
}