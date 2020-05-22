using System.Linq;
using System;
using System.Threading.Tasks;
using DesafioPomar.Models;
using DesafioPomar.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using DesafioPomar.ViewModels;
using AutoMapper;
using System.Collections.Generic;

namespace DesafioPomar.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColheitasController : ControllerBase
    {
        private readonly IService<Colheita> _ColheitaService;
        private readonly IMapper _mapper;
        public ColheitasController(IService<Colheita> ColheitaService, IMapper mapper)
        {
            _ColheitaService = ColheitaService;
            _mapper = mapper;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var Colheita = await _ColheitaService.GetSingle(x => x.Id == id);
            if(Colheita == null)
                return NotFound();
            return Ok(_mapper.Map<ColheitaViewModel>(Colheita));
        }
        public async Task<IActionResult> Get()
        {
            return Ok(_mapper.Map<List<ColheitaViewModel>>(_ColheitaService.GetQuery().ToList()));
        }
        [HttpPost]
        public async Task<IActionResult> Save([FromBody] ColheitaViewModel model)
        {
            try
            {
                return Ok(await _ColheitaService.Insert(_mapper.Map<Colheita>(model)));
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] ColheitaViewModel model)
        {
            try
            {
                var Colheita = await _ColheitaService.GetSingle(x => x.Id == model.Id);
                if(Colheita == null)
                    return NotFound();

                return Ok(await _ColheitaService.Update(_mapper.Map<Colheita>(model)));
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] ColheitaViewModel model)
        {
            try
            {
                var Colheita = await _ColheitaService.GetSingle(x => x.Id == model.Id);
                if(Colheita == null)
                    return NotFound();

                return Ok(await _ColheitaService.Delete((long)model.Id));
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
    }
}