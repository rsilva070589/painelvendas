<template >   
    <div @mouseover="store.mostrarFiltros = true"  style="padding: 10px; display: flex;   justify-content: space-between; text-align: left;">
       <div style=" width: 35%; height: 95vh; padding: 25px; ">
          
           <div>
               <div style="text-align: left;  margin-top: -70px; color: black; font-size: 200px; font-weight: bold;">
                      
                      {{somarArray(store.dadosSyonet.filter(f => f.tipo=='EVENTOS-ATRASOS-VENDEDOR' && f.id_empresa == storeLogin.empresaSelecionada).map(x=> parseInt(x.qtde)))}}
               </div>
               <div style=" margin-top: -100px;">
                   <span style=" color: red; font-size: 80px; ">
                       Atrasados
                   </span>
               </div>
           </div>

           <div>       
           
             <Pizza />
           </div>    
           <div style="margin-left: -60px; text-align: center">
               <span style=" color: red; font-size: 40px; ">
                   Por Mídia
               </span>
           </div>
              
           
       </div>

       <div style="font-size: 30px;width: 60%;  text-align: center">
           <div>
               <div style=" font-weight: bold; color: black;"> 
                   Eventos em Atraso 
               </div>    
               <div style="display: flex; margin-top: -30px; padding: 0px; ">                      
                   <div style="margin-left: 5px; padding: 10px; width: 90%; margin-top: 0px;"  >             
                       <ApexChart height="300"  type="bar" :options="{
                                                             chart:  { toolbar: { show: false }, zoom: { enabled: true }, }, 
                                                             dataLabels: { enabled: true }, stroke: { curve: 'straight' },style: {     fontSize: '100px',   fontFamily: 'Arial, sans-serif' },
                                                             
                                                             grid:         { row: { colors: ['#f1f2f3', 'transparent'], opacity: 0.5 } },
                                                             xaxis:        { categories:   store.dadosSyonet.filter(f => f.tipo=='EVENTOS-ATRASOS-VENDEDOR' && f.id_empresa == storeLogin.empresaSelecionada).map(x=> x.vendedor) },
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
                                                           }" 
                       
                       :series="[{
                                        name: 'Eventos Atrasados',
                                        data: store.dadosSyonet.filter(f => f.tipo=='EVENTOS-ATRASOS-VENDEDOR' && f.id_empresa == storeLogin.empresaSelecionada).map(x=> x.qtde)
                                    }]"></ApexChart>
                   </div>          
               </div> 
           </div>

           <div>
               <div style=" font-weight: bold; color: black;"> 
                   Atendimentos com Atraso 
               </div>    
               <div style="display: flex; margin-top: -30px; padding: 0px; ">                      
                   <div style="margin-left: 5px; padding: 10px; width: 90%; margin-top: 0px;"  >             
                       <ApexChart height="300"  type="bar" :options="{
                                                             chart:  { toolbar: { show: false }, zoom: { enabled: true }, }, 
                                                             dataLabels: { enabled: true }, stroke: { curve: 'straight' },style: {     fontSize: '100px',   fontFamily: 'Arial, sans-serif' },
                                                             
                                                             grid:         { row: { colors: ['#f1f2f3', 'transparent'], opacity: 0.5 } },
                                                             xaxis:        { categories:   store.dadosPainel.filter(f => f.TIPO=='EVENTOS-ATRASOS-VENDEDOR' && f.COD_EMPRESA == storeLogin.empresaSelecionada).map(x=> x.VENDEDOR) },
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
                                                           }" 
                       
                       :series="[{
                                                                                     name: 'Eventos Atrasados',
                                                                                     data: store.dadosPainel.filter(f => f.TIPO=='EVENTOS-ATRASOS-VENDEDOR' && f.COD_EMPRESA == storeLogin.empresaSelecionada).map(x=> x.QTDE)
                                                                                   }]"></ApexChart>
                   </div>          
               </div> 
           </div>
    
       </div>
   </div> 
 
 <!-- Simple Bar --> 

</template>

<script setup>    
import { ref, onMounted } from 'vue';
import { indexStore, useUserStore } from '../../../store/indexStore';
import ApexChart from 'vue3-apexcharts';
import Pizza from '../paineis/Pizza.vue'; // Importe o componente 'Pizza' corretamente

const store = indexStore();
const storeLogin = useUserStore();

function somarArray(array) {
    return array.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0);
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


</style>
