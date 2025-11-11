using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]     //accessible at api/BaseApi
    [ApiController]
    public class BaseApiController : ControllerBase
    {
    }
}
