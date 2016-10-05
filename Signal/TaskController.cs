using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Results;
using Microsoft.AspNet.SignalR;
using Serilog;

namespace Signal
{
    [RoutePrefix("tasks")]
    public class TaskController : ApiController
    {
        private IHubContext _context;
        private string _channel = Constants.TaskChannel;

        public TaskController()
        {
            _context = GlobalHost.ConnectionManager.GetHubContext<EventHub>();
        }

        [Route("long")]
        [HttpGet]
        public IHttpActionResult GetLongTask()
        {
            Log.Information("Starting long task");

            double steps = 10;
            var eventName = "longTask.status";

            ExecuteTask(eventName, steps);

            return Ok("Long task complete");
        }

        [Route("short")]
        [HttpGet]
        public IHttpActionResult GetShortTask()
        {
            Log.Information("Starting short task");

            double steps = 5;
            var eventName = "shortTask.status";

            ExecuteTask(eventName, steps);

            return Ok("Short task complete");
        }

        private void ExecuteTask(string eventName, double steps)
        {
            var status = new Status
            {
                State = "starting",
                PercentComplete = 0.0
            };

            PublishEvent(eventName, status);

            for (double i = 0; i < steps; i++)
            {
                status.State = "working";
                status.PercentComplete = (i/steps)*100;
                PublishEvent(eventName, status);
                Thread.Sleep(500);
            }

            status.State = "complete";
            status.PercentComplete = 100;
            PublishEvent(eventName, status);
        }

        private void PublishEvent(string eventName, Status status)
        {
            _context.Clients.Group(_channel).OnEvent(Constants.TaskChannel, new ChannelEvent
            {
                ChannelName = Constants.TaskChannel,
                Name = eventName,
                Data = status
            });
        }
    }

    public class Status
    {
        public string State { get; set; }
        public double PercentComplete { get; set; }
    }
}
