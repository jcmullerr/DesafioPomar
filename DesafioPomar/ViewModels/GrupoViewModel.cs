using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DesafioPomar.ViewModels
{
    public class GrupoViewModel
    {
        public long ? Id { get; set; }
        public string ? Nome { get; set; }
        public string ? Descricao { get; set; }
    }
}