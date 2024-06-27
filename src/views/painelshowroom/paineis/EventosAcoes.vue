<template>
 
  <div @mouseover="store.mostrarFiltros = true" style="padding: 10px;  text-align: center; ">
 
  </div>

  <div style="color: black; font-size: 25px; padding: 20px; text-align: center;">
    <table style="width:100%">
      <tr>
        <th>Vendedor</th>
        <th>8 Hrs</th>
        <th>9 Hrs</th>
        <th>10 Hrs</th>
        <th>11 Hrs</th>
        <th>12 Hrs</th>
        <th>13 Hrs</th>
        <th>14 Hrs</th>
        <th>15 Hrs</th>
        <th>16 Hrs</th>
        <th>17 Hrs</th>
        <th>18 Hrs</th>
      </tr>
      <tr v-for="v in Vendedores" :key="v">
        <td>{{ v }}</td>
        <td v-for="hour in [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]" :key="hour" :class="{ day: getAcoesPorHora(v, hour) ==0, night: getAcoesPorHora(v, hour) !=0 }">
          {{ getAcoesPorHora(v, hour) }}
        </td>
      </tr>
    </table>
  </div>
 
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { indexStore, useUserStore } from '../../../store/indexStore';
import ApexChart from 'vue3-apexcharts';

const store = indexStore();
const storeLogin = useUserStore();

const isDaytime = ref(true); // Defina sua lógica para determinar se é de dia ou de noite
 
 

const distinct = (array) => array.filter((value, index, self) => self.indexOf(value) === index);


const Vendedores = computed(() => {
  return distinct(store.dadosPainel.filter(f=> f.TIPO=='VENDAS-POR-VENDEDOR' 
                                && f.COD_EMPRESA==storeLogin.empresaSelecionada 
                                && f.VENDEDOR != 'RITA' && f.VENDEDOR != 'RITA13'  && f.VENDEDOR != 'SOBRALDIR'  ).map(x=> x.VENDEDOR))
  .sort();
});

const getAcoesPorHora = (vendedor, hour) => {
  return store.dadosSyonet.filter(f =>
    f.tipo == 'ACOES-POR-HORA' &&
    f.id_empresa == storeLogin.empresaSelecionada &&
    f.vendedor == vendedor &&
    f.hour == hour
  )[0]?.qtde || 0;
};
</script>

<style>
.conteudo {
  flex-direction: row;
  align-items: center;
  width: 100%;
  overflow-x: auto;
}

.day {
  background-color: rgb(240, 84, 84);
  color: black;
  padding: 10px;
}

.night {
  background-color: darkblue;
  color: white;
  padding: 10px;
}
</style>
