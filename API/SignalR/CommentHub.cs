using System;
using Application.Activities.Commands;
using Application.Activities.Queries;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR;

public class CommentHub(IMediator mediator) : Hub
{
    public async Task SendComment(AddComment.Command command)
    {
        var comment = await mediator.Send(command);

        await Clients.Group(command.ActivityId).SendAsync("ReceivedComment", comment.Value);
    }
    public override async Task OnConnectedAsync()
    {
        var httpContext = Context.GetHttpContext();     //this lets you access query params from api request/URL
        var activityId = httpContext.Request.Query["activityId"];

        if(string.IsNullOrEmpty(activityId)) throw new HubException("No activity with this id");

        await Groups.AddToGroupAsync(Context.ConnectionId, activityId!);

        var result = await mediator.Send(new GetComments.Query{ActivityId = activityId!});

        await Clients.Caller.SendAsync("LoadComments", result.Value);   //sending the client(from where api requested) the comments
    }
}
