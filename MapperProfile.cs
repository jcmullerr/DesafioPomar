using AutoMapper;
using DesafioPomar.Models;
using DesafioPomar.ViewModels;

namespace DesafioPomar
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Arvore,ArvoreViewModel>()
                .ForMember(dest => dest.Especie,opt => opt.MapFrom(d => d.Especie.Descricao))
                .ForMember(dest => dest.Grupo,opt => opt.MapFrom(d => d.Grupo.Descricao));
            CreateMap<ArvoreViewModel,Arvore>()
                .ForMember(dest => dest.Especie,opt => opt.Ignore())
                .ForMember(dest => dest.Grupo,opt => opt.Ignore());
            CreateMap<Especie,EspecieViewModel>()
                .ForMember(dest => dest.Descricao,opt => opt.MapFrom(d => d.Descricao))
                .ReverseMap();
            CreateMap<GrupoViewModel,Grupo>()
                .ReverseMap();
        }
    }
}