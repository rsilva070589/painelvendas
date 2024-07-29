<template >    



    <div @mouseover="store.mostrarFiltros = true"  style="padding: 10px; display: flex;   justify-content: space-between; text-align: left;">
        <div style=" width: 35%; height: 95vh; padding: 25px; ">
           
            <div>
                <div style="text-align: center;  margin-top: -70px; color: black; font-size: 200px; font-weight: bold;">
                       {{store.dadosSyonet.filter(f=> f.tipo == 'EVENTOS-AGUARDANDO' && f.id_empresa == storeLogin.empresaSelecionada).length}}
                </div>
                <div style=" margin-top: -100px;">
                    <span style=" color: green; font-size: 80px; ">
                      Aguardando
                    </span>
                </div>
            </div>
<br>
<br><br><br>
            <div style="text-align: center;">
                <span style=" color:black; font-size: 30px; ">
                      Cliente esperando à:
                    </span>
                <div style="  margin-top: -70px; color: black; font-size: 200px; font-weight: bold;">
                       {{store.dadosSyonet.filter(f=> f.tipo == 'EVENTOS-AGUARDANDO' && f.id_empresa == storeLogin.empresaSelecionada)[0]?.qtde}}
                </div>
                <div style="margin-top: -100px;" v-if="store.dadosSyonet.filter(f=> f.tipo == 'EVENTOS-AGUARDANDO' && f.id_empresa == storeLogin.empresaSelecionada)[0]?.qtde > 0.5">
                    <span style=" color: red; font-size: 80px; ">
                      dias
                    </span>
                </div>
                <div style="margin-top: -100px;" v-if="store.dadosSyonet.filter(f=> f.tipo == 'EVENTOS-AGUARDANDO' && f.id_empresa == storeLogin.empresaSelecionada)[0]?.qtde < 0.5">
                    <span style=" color: red; font-size: 80px; ">
                      minutos
                    </span>
                </div>
            </div>
            
        </div>

        
        <div class="conteudo" style=" width: 60%; height: 90vh; text-align: center">
            <div style="font-size: 70px; font-weight: bold; color: black;">
                Eventos Aguardando
            </div>

            <div  style=" height: 80%; display: flex;  padding: 0px; color: black; font-size: 20px; margin-left: 0px;
          
             
            ">  
            <table style="margin: 0px 0px 0px 40px; width: 700px;
            ">
              <tr>
                    <th>Evento</th>
                    <th>Vendedor</th>
                    <th>Tipo</th>
                    <th>Tempo</th>
               
                </tr>
                <tr v-for="l in store.dadosSyonet.filter(f=> f.tipo == 'EVENTOS-AGUARDANDO' && f.id_empresa == storeLogin.empresaSelecionada)">
                  <td style="text-align: left;">{{ l.id_evento }} </td>  
                  <td>{{ l.vendedor }}</td>
                  <td>{{ l.id_tipoevento }}</td>
                    <td>{{ l.qtde }}</td>
                    
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
      setInterval(() => { 
        chartOptions.value.xaxis.categories = store.dadosVendasModelos; 
        chartSeries.value[0].data = store.dadosVendasModelosQtde 
      }, 2000);  
    });

     
  
 

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
