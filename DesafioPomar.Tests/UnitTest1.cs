using System.Linq;
using System;
using DesafioPomar.Models;
using DesafioPomar.Services.Interface;
using Xunit;

namespace DesafioPomar.Tests
{
    public class UnitTest1
    {
        private readonly IService<Especie> _service;
        public UnitTest1(IService<Especie> service)
        {
            _service = service;
        }
        [Fact]
        public void Test1()
        {
            var l = _service.GetQuery().ToList();
        }
    }
}
