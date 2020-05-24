using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
namespace DesafioPomar.Models
{
    [Table("Arvore")]
    public class Arvore : Base
    {
        [MaxLength(200)]
        public string Descricao {get;set;}
        public int Idade {get;set;}
        [ForeignKey(nameof(Especie))]
        public long EspecieId{get;set;}
        public virtual Especie Especie{get;set;}
        [ForeignKey(nameof(Grupo))]
        public long GrupoId{get;set;}
        public virtual Grupo Grupo{get;set;}
    }
}