<template >   
         <div @mouseover="store.mostrarFiltros = true"  style="padding: 10px; display: flex;   justify-content: space-between; text-align: left;">
            <div style=" width: 35%; height: 95vh; padding: 25px; ">               
                <div>
                    <div style="text-align: left;  margin-top: -70px; color: black; font-size: 200px; font-weight: bold;">
                           
                           {{somarArray(store.dadosSyonet.filter(f => f.tipo=='EVENTOS-PERDIDOS' && f.id_empresa == storeLogin.empresaSelecionada).map(x=> parseInt(x.qtde)))}}
                    </div>
                    <div style=" margin-top: -100px;">
                        <span style=" color: red; font-size: 60px; ">
                            Insucessos
                        </span>
                    </div>
                </div>

                <div>       
                  <PizzaPerdidos />
                </div>    
                <div style="margin-left: -60px; text-align: center">
                    <span style=" color: red; font-size: 40px; ">
                        Motivo de Perda
                    </span>
                </div>
                   
                
            </div>
            <div class="conteudo" style=" width: 60%; height: 90vh; text-align: center">
         
              <span style=" color: red; font-size: 40px; ">
                        Negócios Perdidos Hoje
                    </span>

                  
                    <div style="font-size: 20px;  height: 95vh; padding: 15px;text-align: center; font-weight: bold; color: black">
            

            <table >
              <tr>
                  <th>Vendedor</th>
                  <th>Evento</th>     
                  <th>Cliente</th>               
                  <th>Motivo</th>
              </tr>
              <tr  v-for="e in store.dadosSyonet.filter(f => f.tipo=='EVENTOS-PERDIDOS' && f.id_empresa == storeLogin.empresaSelecionada)">
                <td>{{ e.vendedor }}</td>
                  <td>{{ e.id_evento }}</td>     
                  <td>{{ e.nm_cliente }}</td>                
                  <td>{{e.midia}}</td>                  
              </tr>           
               
            </table>

       
    </div>
                
         
            </div>
        </div> 
      
      <!-- Simple Bar --> 
     
</template>
    
    <script setup>    
      import { defineComponent, ref, onMounted } from 'vue';
     import { indexStore, useUserStore } from '../../../store/indexStore' 
 
     import PizzaPerdidos from '../paineis/PizzaPerdidos.vue'

     import { Pie } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


    const store = indexStore(); 
    const storeLogin = useUserStore();
    
   
    function somarArray(array) {
      console.log(array)
    return array.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0);
}
    
    function contarDecrescente() {
        for (let i = 10; i >= 1; i--) {
            console.log(i);
            store.contagem = i
        }
    }
      
      

            
        const chartOptionsEventosAtrasos = ref({
          chart:  { toolbar: { show: false }, zoom: { enabled: true }, }, 
          dataLabels: { enabled: true }, stroke: { curve: 'straight' },style: {     fontSize: '100px',   fontFamily: 'Arial, sans-serif' },
           
          grid:         { row: { colors: ['#f1f2f3', 'transparent'], opacity: 0.5 } },
          xaxis:        { categories:   store.dadosSyonetAtrasosVendedor },
          plotOptions:  { bar: { horizontal: true }, },
          colors: ['#FF0000'],
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

        const chartSeriesEventosAtrasos = ref([{
          name: 'Eventos Atrasados',
          data: store.dadosSyonetAtrasosVendedorQtde
        }]); 
        

       
        
        
        
    </script>
    
    <style>
      .conteudo { 
        flex-direction: row;
        /* justify-content: center; */
        align-items: center;
        width: 100%;
        overflow-x: auto;
    }
     
    
    </style>
    