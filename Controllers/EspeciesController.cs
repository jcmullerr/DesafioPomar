using System.Linq;
using System;
using System.Threading.Tasks;
using DesafioPomar.Models;
using DesafioPomar.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using DesafioPomar.ViewModels;
using System.Collections.Generic;

namespace DesafioPomar.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EspeciesController : ControllerBase
    {
        private readonly IService<Especie> _EspecieService;
        private readonly IMapper _mapper;
        public EspeciesController(IService<Especie> especieService,IMapper mapper)
        {
            _EspecieService = especieService;
            _mapper = mapper;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var especie = await _EspecieService.GetSingle(x => x.Id == id);
            if(especie == null)
                return NotFound();
            return Ok(_mapper.Map<EspecieViewModel>(especie));
        }
        public async Task<IActionResult> Get()
        {
            return Ok(_mapper.Map<List<EspecieViewModel>>(_EspecieService.GetQuery().ToList()));
        }
        [HttpPost]
        public async Task<IActionResult> Save([FromBody] EspecieViewModel model)
        {
            try
            {
                return Ok(await _EspecieService.Insert(_mapper.Map<Especie>(model)));
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] EspecieViewModel model)
        {
            try
            {
                var especie = await _EspecieService.GetSingle(x => x.Id == model.Id,true);
                if(especie == null)
                    return NotFound();

                return Ok(await _EspecieService.Update(_mapper.Map<Especie>(model)));
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] EspecieViewModel model)
        {
            try
            {
                var especie = await _EspecieService.GetSingle(x => x.Id == model.Id,true);
                if(especie == null)
                    return NotFound();

                return Ok(await _EspecieService.Delete((long)model.Id));
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
    }
}