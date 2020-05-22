using System.Collections.Generic;
using System.Linq;
using System;
using System.Threading.Tasks;
using DesafioPomar.Models;
using DesafioPomar.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using DesafioPomar.ViewModels;

namespace DesafioPomar.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GruposController : ControllerBase
    {
        private readonly IService<Grupo> _GrupoService;
        private readonly IMapper _mapper;
        public GruposController(IService<Grupo> GrupoService, IMapper mapper)
        {
            _GrupoService = GrupoService;
            _mapper = mapper;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var Grupo = await _GrupoService.GetSingle(x => x.Id == id);
            if(Grupo == null)
                return NotFound();
            return Ok(_mapper.Map<GrupoViewModel>(Grupo));
        }
        public async Task<IActionResult> Get()
        {
            return Ok(_mapper.Map<List<GrupoViewModel>>(_GrupoService.GetQuery().ToList()));
        }
        [HttpPost]
        public async Task<IActionResult> Save([FromBody] GrupoViewModel model)
        {
            try
            {
                return Ok(await _GrupoService.Insert(_mapper.Map<Grupo>(model)));
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] GrupoViewModel model)
        {
            try
            {
                var Grupo = await _GrupoService.GetSingle(x => x.Id == model.Id);
                if(Grupo == null)
                    return NotFound();

                return Ok(await _GrupoService.Update(_mapper.Map<Grupo>(model)));
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] GrupoViewModel model)
        {
            try
            {
                var Grupo = await _GrupoService.GetSingle(x => x.Id == model.Id);
                if(Grupo == null)
                    return NotFound();

                return Ok(await _GrupoService.Delete((long)model.Id));
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
    }
}