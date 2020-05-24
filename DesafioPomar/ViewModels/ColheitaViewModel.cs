using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DesafioPomar.ViewModels
{
    public class ColheitaViewModel
    {
        public long ? Id { get; set; }
        public string ? Informacoes { get; set; }
        public DateTime ? DataColheita { get; set; }
        public decimal ? PesoBruto {get;set;}
        public string ? Arvore {get;set;}

        public long ? ArvoreId {get;set;}

        public long ? GrupoId {get;set;}
    }
}