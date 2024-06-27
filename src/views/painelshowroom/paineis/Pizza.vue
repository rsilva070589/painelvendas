<template>

  <div>
    <Pie :data="{
            labels: store.dadosSyonet.filter(f => f.tipo=='EVENTOS-ATRASOS-MIDIA' && f.id_empresa == storeLogin.empresaSelecionada).map(x => x.midia)  ,
            datasets: [
              {
                backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#DD5B16', '#DD9B16'],
                data: store.dadosSyonet.filter(f => f.tipo=='EVENTOS-ATRASOS-MIDIA' && f.id_empresa == storeLogin.empresaSelecionada).map(x => x.qtde) 
              },
            ],
          }" :options="options" />
  </div>
</template>

<script setup>
 import { defineComponent, ref, onMounted } from 'vue';
  
import { Pie } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

import { indexStore, useUserStore } from '../../../store/indexStore' 
     
    const store = indexStore(); 
    const storeLogin = useUserStore();

// Register necessary Chart.js components
 
 
const options = ref({
  responsive: true,
  maintainAspectRatio: false,
});

</script>
