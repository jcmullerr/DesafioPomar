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
    public class ArvoresController : ControllerBase
    {
        private readonly IService<Arvore> _ArvoreService;
        private readonly IMapper _mapper;
        public ArvoresController(IService<Arvore> ArvoreService,IMapper mapper)
        {
            _ArvoreService = ArvoreService;
            _mapper = mapper;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var arvore = await _ArvoreService.GetSingle(x => x.Id == id);
            if(arvore == null)
                return NotFound();
            return Ok(_mapper.Map<ArvoreViewModel>(arvore));
        }
        public async Task<IActionResult> Get()
        {
            var res = _ArvoreService.GetQuery().ToList();
            //res.ForEach(x => x.Grupo.Arvores = new List<Arvore>());
            return Ok(_mapper.Map<List<ArvoreViewModel>>(res));
        }
        [HttpPost]
        public async Task<IActionResult> Save([FromBody] ArvoreViewModel model)
        {
            try
            {
                return Ok(await _ArvoreService.Insert(_mapper.Map<Arvore>(model)));
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] ArvoreViewModel model)
        {
            try
            {
                var arvore = await _ArvoreService.GetSingle(x => x.Id == model.Id);
                if(arvore == null)
                    return NotFound();

                return Ok(await _ArvoreService.Update(_mapper.Map<Arvore>(model)));
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] ArvoreViewModel model)
        {
            try
            {
                var arvore = await _ArvoreService.GetSingle(x => x.Id == model.Id);
                if(arvore == null)
                    return NotFound();

                return Ok(await _ArvoreService.Delete((long)model.Id));
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
    }
}