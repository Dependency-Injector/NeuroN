using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR.Client;
using Microsoft.Owin.Hosting;
using Serilog;

namespace Signal
{
    class Program
    {
        static void Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration().WriteTo.ColoredConsole().CreateLogger();

            string baseAddress = "http://localhost:9123/";

            using (WebApp.Start<Startup>(url: baseAddress))
            {
                var hubConnection = new HubConnection(baseAddress);
                IHubProxy eventHubProxy = hubConnection.CreateHubProxy("EventHub");
                eventHubProxy.On<string, ChannelEvent>("OnEvent",
                    (channel, ev) => Log.Information("Event received on {channel} - {@ev}", channel, ev));

                hubConnection.Start().Wait();

                eventHubProxy.Invoke("Subscribe", Constants.AdminChannel);
                eventHubProxy.Invoke("Subscribe", Constants.TaskChannel);

                Console.WriteLine($"Server is running on {baseAddress}");
                Console.WriteLine("Press <enter> to stop server");
                Console.ReadLine();
            }
        }
    }
}
