using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DesafioPomar.Models
{
    [Table("Grupo")]
    public class Grupo : Base
    {
        [MaxLength(200)]
        public string Nome { get; set; }
        public string Descricao { get; set; }

        public virtual IList<Arvore> Arvores {get;set;}
    }
}