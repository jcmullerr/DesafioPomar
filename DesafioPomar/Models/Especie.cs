using System.ComponentModel.DataAnnotations.Schema;

namespace DesafioPomar.Models
{
    [Table("Especie")]
    public class Especie : Base
    {
        public string Descricao {get;set;}
    }
}