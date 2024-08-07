<template >  
 
 
    <div 
       @mouseover="store.mostrarFiltros = true"  style="padding: 10px; display: flex;   justify-content: space-between; text-align: left;">
        <div style=" width: 35%; height: 95vh; padding: 25px; ">
           
            <div>
                <div style=" margin-top: 0px;">
                    <span style=" color: black; font-size: 45px;font-weight: bold; color: black;">
                      Conversão Digital 
                    </span>
                </div>
                <div  style="text-align: left;  margin-top: 0px; color: blue; font-size: 120px; font-weight: bold;">                  
                       {{arredondar(conversaoEquipe(),2)}}%
                </div>                 
            </div> 
            
        </div>

        <div style="font-size: 27px; width: 60%; height: 95vh; padding: 15px;text-align: center; font-weight: bold; color: black">            

                <table style="width:100%">
                <tr>
                    <th>Vendedor</th>
                    <th>Leads Mês</th>
                    <th>Sucesso</th>
                    <th>Conversão</th>
                </tr>
                <tr v-for="v in conversoes().sort((a, b) => b.qtdeVendas - a.qtdeVendas)">
                    <td>{{ v.vendedor }}</td>
                    <td>{{ v.qtdeEventos }}</td>
                    <td>{{ v.qtdeVendas }}</td>
                    <td>{{ arredondar(v.taxaConversao,2) }} %</td>
                </tr>
               
                </table>

           
        </div>
    </div> 
  
  <!-- Simple Bar --> 
 
</template>

<script setup>
  import { defineComponent, ref, onMounted } from 'vue';
 import { indexStore, useUserStore } from '../../../store/indexStore' 
 import ApexChart from 'vue3-apexcharts';  
const store = indexStore(); 
const storeLogin = useUserStore();

 
  
    const chartOptions = ref({
      chart:  { toolbar: { show: false }, zoom: { enabled: true }, }, 
      dataLabels: { enabled: true }, stroke: { curve: 'straight' },style: {     fontSize: '100px',   fontFamily: 'Arial, sans-serif' },
       
      grid:         { row: { colors: ['#f1f2f3', 'transparent'], opacity: 0.5 } },
      xaxis:        { categories:    store.dadosVendasModelos },
      plotOptions:  { bar: { horizontal: true }, },
      colors: ['#000000'],
      yaxis: {
          labels: {
            style: {
              fontSize: '16px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 'bold',
            },
          },
        },
    });

    const chartSeries = ref([{
      name: 'Series 1',
      data: []
    }]); 
    onMounted(() => { 
      // Simulação de dados dinâmicos
      setInterval(() => {
        // Atualiza as categorias e os dados da série 
        chartOptions.value.xaxis.categories = store.dadosVendasModelos; // Altere conforme necessário
        chartSeries.value[0].data = store.dadosVendasModelosQtde
        
      }, 2000); // Atualização a cada 2 segundos
    });



     
 function conversoes () {
  const conversoes = []

  const arrayAjustado = () => {
  const ajustados = []
  store.dadosPainel.filter(f=> f.TIPO=='VENDAS-POR-VENDEDOR' && f.COD_EMPRESA==storeLogin.empresaSelecionada).map(x => {
  let data = {
    id_agendamentoerp: x.COD_PROPOSTA,
    id_empresa: x.COD_EMPRESA,
    vendedor: x.VENDEDOR,
    qtde: x.QTDE
  }
  ajustados.push(data)
})
  return ajustados
}

const SyonetNBS = unionArraysByProperty(arrayAjustado(), store.dadosSyonet.filter(f => f.tipo=='EVENTOS-ATENDIDOS' && f.ds_formacontato=='INTERNET' && f.id_empresa==storeLogin.empresaSelecionada && f.id_agendamentoerp != null),'id_agendamentoerp')
  

distinctArray(store.dadosPainel.filter(f=> f.TIPO=='VENDAS-POR-VENDEDOR' && f.COD_EMPRESA==storeLogin.empresaSelecionada && f.VENDEDOR != 'RITA' && f.VENDEDOR != 'RITA13').map(x=> x.VENDEDOR)).map(v => {  
    var data = {
      vendedor: v,
      qtdeVendas: somarArray(SyonetNBS.filter(f=> f.vendedor == v).map(x=> parseInt(x.qtde))),
      qtdeEventos: somarArray(store.dadosSyonet.filter(f => f.tipo=='EVENTOS-ATENDIDOS' && f.vendedor == v && f.ds_formacontato=='INTERNET').map(x => parseInt(x.qtde))) ||0,
      taxaConversao: ((somarArray(SyonetNBS.filter(f=> f.vendedor == v).map(x=> parseInt(x.qtde)))) * 100) / somarArray(store.dadosSyonet.filter(f => f.tipo=='EVENTOS-ATENDIDOS' && f.vendedor == v && f.ds_formacontato=='INTERNET').map(x => parseInt(x.qtde)))
      }
      conversoes.push(data)
  })
  

  //
  return conversoes
 }  

 function conversaoEquipe () {  
      return (somarArray(conversoes()?.map(x=> (x.qtdeVendas)))  * 100)
                                                /  somarArray(conversoes()?.map(x=> (x.qtdeEventos)))  
 } 
 
 

 function somarArray(array) {
    return array.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0);
}


function distinctArray(arr) {
    return arr.filter((value, index, self) => {
        return self.indexOf(value) === index;
    });
}

 

function unionArraysByProperty(array1, array2, property) {
    const array2Map = array2.reduce((map, item) => {
      map[item[property]] = item;
      return map;
    }, {});
    
    return array1
      .filter(item => array2Map[item[property]])
      .map(item => ({
        ...item,
        ...array2Map[item[property]]
      }));
  }


const anterior = ()=> {   
   if (store.indexVendas < store.relLoja?.length -1) {
     store.indexVendas = store.indexVendas +1
     selectEmpresa(store.indexVendas)
     console.log('index Empresa: '+store.indexVendas)
   }   
 }

 const proximo = ()=> {  
  if (store.indexVendas > 0) {
    store.indexVendas = store.indexVendas -1
    selectEmpresa(store.indexVendas)
    console.log('index Empresa: '+store.indexVendas)
  }  
}

function arredondar(numero, casasDecimais) {
    var fator = Math.pow(10, casasDecimais);
    return Math.round(numero * fator) / fator;
  }


</script>

<style>
  .conteudo { 
    flex-direction: row;
    /* justify-content: center; */
    align-items: center;
    width: 100%;
    overflow-x: auto;
}
 
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
