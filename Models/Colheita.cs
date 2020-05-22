using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DesafioPomar.Models
{
    [Table("Colheita")]
    public class Colheita : Base
    {
        public string Informacoes { get; set; }
        [Required]
        public DateTime DataColheita { get; set; }
        [Required]
        public decimal PesoBruto {get;set;}
        [ForeignKey(nameof(Arvore))]
        public long ArvoreId {get;set;}
        public virtual Arvore Arvore {get;set;}
    }
}