using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]     //accessible at api/BaseApi
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        private IMediator? _mediator;
        // ??= means if something is null then perform the action after =
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>()
            ?? throw new InvalidOperationException("IMediator service is unavailable");
    }
}
