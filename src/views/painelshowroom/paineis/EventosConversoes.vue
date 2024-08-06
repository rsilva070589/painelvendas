<template >  
    
    <div 
    @mouseover="store.mostrarFiltros = true"  style="padding: 10px; display: flex;   justify-content: space-between; text-align: left;">
        <div style=" width: 35%; height: 95vh; padding: 25px; ">
           
            <div>
                <div style=" margin-top: 0px;">
                    <span style=" color: black; font-size: 45px;font-weight: bold; color: black;">
                      Conversão Geral 
                    </span>
                </div>
                <div  style="text-align: left;  margin-top: 0px; color: blue; font-size: 120px; font-weight: bold;">                  
                      {{ arredondar(conversaoEquipe(),2)}}%
                      
                </div>                 
            </div> 

            <div style="font-size: 20px;">
              Meta Consorcio: 3
            </div>

            <div style="margin-top: 300px; width: 25px;" 
                @click="exportToExcel(store.dadosPainel.filter(f => f.TIPO == 'VENDAS-SHOWROOM' && f.COD_EMPRESA == storeLogin.empresaSelecionada && f.NOVO_USADO == 'CONSORCIO'))"
              >
              <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="25px" height="25px"><path d="M 28.875 0 C 28.855469 0.0078125 28.832031 0.0195313 28.8125 0.03125 L 0.8125 5.34375 C 0.335938 5.433594 -0.0078125 5.855469 0 6.34375 L 0 43.65625 C -0.0078125 44.144531 0.335938 44.566406 0.8125 44.65625 L 28.8125 49.96875 C 29.101563 50.023438 29.402344 49.949219 29.632813 49.761719 C 29.859375 49.574219 29.996094 49.296875 30 49 L 30 44 L 47 44 C 48.09375 44 49 43.09375 49 42 L 49 8 C 49 6.90625 48.09375 6 47 6 L 30 6 L 30 1 C 30.003906 0.710938 29.878906 0.4375 29.664063 0.246094 C 29.449219 0.0546875 29.160156 -0.0351563 28.875 0 Z M 28 2.1875 L 28 6.53125 C 27.867188 6.808594 27.867188 7.128906 28 7.40625 L 28 42.8125 C 27.972656 42.945313 27.972656 43.085938 28 43.21875 L 28 47.8125 L 2 42.84375 L 2 7.15625 Z M 30 8 L 47 8 L 47 42 L 30 42 L 30 37 L 34 37 L 34 35 L 30 35 L 30 29 L 34 29 L 34 27 L 30 27 L 30 22 L 34 22 L 34 20 L 30 20 L 30 15 L 34 15 L 34 13 L 30 13 Z M 36 13 L 36 15 L 44 15 L 44 13 Z M 6.6875 15.6875 L 12.15625 25.03125 L 6.1875 34.375 L 11.1875 34.375 L 14.4375 28.34375 C 14.664063 27.761719 14.8125 27.316406 14.875 27.03125 L 14.90625 27.03125 C 15.035156 27.640625 15.160156 28.054688 15.28125 28.28125 L 18.53125 34.375 L 23.5 34.375 L 17.75 24.9375 L 23.34375 15.6875 L 18.65625 15.6875 L 15.6875 21.21875 C 15.402344 21.941406 15.199219 22.511719 15.09375 22.875 L 15.0625 22.875 C 14.898438 22.265625 14.710938 21.722656 14.5 21.28125 L 11.8125 15.6875 Z M 36 20 L 36 22 L 44 22 L 44 20 Z M 36 27 L 36 29 L 44 29 L 44 27 Z M 36 35 L 36 37 L 44 37 L 44 35 Z"/></svg>
            </div>
            
    
            
        </div>

      


        <div style="font-size: 27px; width: 60%; height: 95vh; padding: 15px;text-align: center;  color: black">            

                <table style="width:100%">
                <tr>
                    <th>Vendedor</th>
                    <th>Leads Mês</th>
                    <th>Sucesso</th>
                    <th>Projeção</th>
                    <th>Conversão</th>                   
                    <th>Consorcio</th>
                </tr>
                <tr v-for="v in conversoes().sort((a, b) => b.taxaConversao - a.taxaConversao)">
                    <td><span style="font-weight: bold;">{{ v.vendedor }}</span> </td>
                    <td>{{ v.qtdeEventos }}</td>
                    <td>{{ v.qtdeVendas }}</td>
                    <td>
                      <span style="">
                      {{ arredondar(((v.qtdeVendas / diaAtual) * quantidadeDias),0)}}
                    </span>
                    </td>
                    <td>{{ arredondar(v.taxaConversao,2) }} %</td>
                    
                    <td>
                      <span 
                            :class="{ metaConsorcio: store.dadosPainel.filter(f => f.TIPO == 'VENDAS-SHOWROOM' && f.COD_EMPRESA == storeLogin.empresaSelecionada && f.NOVO_USADO == 'CONSORCIO' && f.VENDEDOR == v.vendedor).length < 3,
                               metaConsorcioSucesso: store.dadosPainel.filter(f => f.TIPO == 'VENDAS-SHOWROOM' && f.COD_EMPRESA == storeLogin.empresaSelecionada && f.NOVO_USADO == 'CONSORCIO' && f.VENDEDOR == v.vendedor).length >= 3 }"
                      >                      
                      {{store.dadosPainel.filter(f => f.TIPO == 'VENDAS-SHOWROOM' && f.COD_EMPRESA == storeLogin.empresaSelecionada && f.NOVO_USADO == 'CONSORCIO' && f.VENDEDOR == v.vendedor).length}}
                      </span>
                    </td>   
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
 import * as XLSX from 'xlsx';
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

  distinctArray(store.dadosPainel.filter(f=> f.TIPO=='VENDAS-POR-VENDEDOR' && f.COD_EMPRESA==storeLogin.empresaSelecionada && f.VENDEDOR != 'RITA' && f.VENDEDOR != 'RITA13').map(x=> x.VENDEDOR)).map(v => {  
    var data = {
      vendedor: v,
      consorcio: somarArray (store.dadosPainel.filter(f=> f.TIPO=='VENDAS-POR-VENDEDOR' && f.COD_EMPRESA==storeLogin.empresaSelecionada && f.VENDEDOR == v).map(x=> parseInt(x.QTDE))),
      qtdeVendas: somarArray (store.dadosPainel.filter(f=> f.TIPO=='VENDAS-POR-VENDEDOR' && f.COD_EMPRESA==storeLogin.empresaSelecionada && f.VENDEDOR == v).map(x=> parseInt(x.QTDE))),      
      qtdeEventos: somarArray(store.dadosSyonet.filter(f => f.tipo=='EVENTOS-ATENDIDOS' && f.vendedor == v  ).map(x => parseInt(x.qtde))) ||0,
      taxaConversao: ((somarArray (store.dadosPainel.filter(f=> f.TIPO=='VENDAS-POR-VENDEDOR' && f.COD_EMPRESA==storeLogin.empresaSelecionada && f.VENDEDOR == v).map(x=> parseInt(x.QTDE)))) * 100) / somarArray(store.dadosSyonet.filter(f => f.tipo=='EVENTOS-ATENDIDOS' && f.vendedor == v  ).map(x => parseInt(x.qtde)))
      }
      conversoes.push(data)
  })
  return conversoes
 }  

 function conversaoEquipe () {  
      return   (
        ( somarArray(conversoes().map(x => x.qtdeVendas)) * 100) / somarArray(conversoes().map(x => x.qtdeEventos))
      )
 } 
 
 

 function somarArray(array) {
    return array.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0);
}

function distinctArray(arr) {
    return arr.filter((value, index, self) => {
        return self.indexOf(value) === index;
    });
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


 

function diasNoMes(ano, mes) {
    return new Date(ano, mes, 0).getDate();
}
 
const ano = 2024;
const mes = 6;  
const quantidadeDias = diasNoMes(ano, mes);
 
 
const dataAtual = new Date(); 
const diaAtual = dataAtual.getDate(); 


 

const exportToExcel = (data) => {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Corrigido: Usar XLSX.write para retornar um array buffer
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  // Converter array buffer para blob
  const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  saveAs(blob, "dados.xlsx");
};

const saveAs = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
};




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


.metaConsorcio { 
  color: rgb(248, 31, 31); 
}

.metaConsorcioSucesso { 
  color: rgb(83, 231, 38); 
}

</style>
