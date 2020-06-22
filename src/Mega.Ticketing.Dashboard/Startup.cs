using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Mega.Ticketing.Dashboard.Startup))]
namespace Mega.Ticketing.Dashboard
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
