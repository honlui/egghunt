using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SignalRSimple.Startup))]
namespace SignalRSimple
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            app.MapSignalR();
        }
    }
}
