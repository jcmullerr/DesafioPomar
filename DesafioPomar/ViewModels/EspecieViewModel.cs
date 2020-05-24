using System.ComponentModel.DataAnnotations.Schema;

namespace DesafioPomar.ViewModels
{
    public class EspecieViewModel
    {
        public long ? Id { get; set; }
        public string Descricao {get;set;}
    }
}