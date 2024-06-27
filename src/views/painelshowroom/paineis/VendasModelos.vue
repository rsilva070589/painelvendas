<template>  
    <div @mouseover="store.mostrarFiltros = true" style="padding: 10px; display: flex; justify-content: space-between; text-align: left;">
        <div style="width: 35%; height: 95vh; padding: 25px;">
            <div>
                <div style="text-align: left; margin-top: -70px; color: black; font-size: 200px; font-weight: bold;">
                    {{ store.dadosPainel.filter(f => f.TIPO == 'VENDAS-SHOWROOM' && f.COD_EMPRESA == storeLogin.empresaSelecionada).length }}
                </div>
                <div style="margin-top: -100px;">
                    <span style="color: green; font-size: 80px;">Negócios</span>
                </div>
            </div>

            <div style="margin-left: 0px;">
                <div>
                    <div style="display: inline-flex; max-width: auto; height: 30vh;">
                        <div style="margin-top: 0px; color: black; font-size: 120px; font-weight: bold;">
                            <div>
                                {{ somarArray( store.dadosPainel.filter(f => f.TIPO == 'VENDAS-SHOWROOM' && f.COD_EMPRESA == storeLogin.empresaSelecionada && f.NOVO_USADO != 'CONSORCIO').map(x => x.QTDE)) }}
                            </div>
                            <div style="font-size: 50px; margin-top: -50px;">Veículos</div>
                        </div>
                        <div style="text-align: left; margin-top: 60px; color: black; font-size: 30px;">
                            <div>
                                {{ store.dadosPainel.filter(f => f.TIPO == 'VENDAS-SHOWROOM' && f.NOVO_USADO == 'N' && f.COD_EMPRESA == storeLogin.empresaSelecionada && f.NOVO_USADO != 'CONSORCIO').length }}
                                <span>Novos</span>
                            </div>
                            <div>
                                {{ store.dadosPainel.filter(f => f.TIPO == 'VENDAS-SHOWROOM' && f.NOVO_USADO == 'U' && f.COD_EMPRESA == storeLogin.empresaSelecionada && f.NOVO_USADO != 'CONSORCIO').length }}
                                <span style="text-align: left;">Seminovos</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div style="text-align: left; margin-top: 10px; color: black; font-size: 120px; font-weight: bold;">
                    {{ store.dadosPainel.filter(f => f.TIPO == 'VENDAS-SHOWROOM' && f.COD_EMPRESA == storeLogin.empresaSelecionada && f.NOVO_USADO == 'CONSORCIO').length }}
                </div>
                <div style="margin-top: -50px; margin-left: 0px">
                    <span style="color: black; font-size: 50px; font-weight: bold;">Consórcios</span>
                </div>
            </div>
        </div>

        <div style="width: 60%; height: 95vh; text-align: center">
            <div style="font-size: 50px; font-weight: bold; color: black;">
                Vendas por modelo
            </div>

            <div style="display: flex; margin-top: 0px; padding: 0px;">
                <div style="margin-left: 5px; padding: 10px; width: 90%; margin-top: 0px;"  >

                  <ApexChart height="500"  type="bar" :options="{
                                                        chart:  { toolbar: { show: false }, zoom: { enabled: true }, }, 
                                                        dataLabels: { enabled: true }, stroke: { curve: 'straight' },style: {     fontSize: '100px',   fontFamily: 'Arial, sans-serif' },
                                                        
                                                        grid:         { row: { colors: ['#f1f2f3', 'transparent'], opacity: 0.5 } },
                                                        xaxis:        { categories:   store.dadosPainel.filter(f => f.TIPO == 'VENDAS-AGRUPADAS-MODELO' && f.COD_EMPRESA == storeLogin.empresaSelecionada && f.DESCRICAO_MODELO != 'CONSORCIO').map(x => x.DESCRICAO_MODELO)},
                                                        plotOptions:  { bar: { horizontal: true }, },
                                                        colors: ['#000000'],
                                                        yaxis: {
                                                            labels: {
                                                              style: {
                                                                fontSize: '14px',
                                                                fontFamily: 'Helvetica, Arial, sans-serif',
                                                                fontWeight: 'bold',
                                                              },
                                                            },
                                                          },
                                                      }" 
                       
                       :series="[{
                                        name: 'Eventos Atrasados',
                                        data: store.dadosPainel.filter(f => f.TIPO == 'VENDAS-AGRUPADAS-MODELO' && f.COD_EMPRESA == storeLogin.empresaSelecionada && f.DESCRICAO_MODELO != 'CONSORCIO').map(x => x.QTDE)
                                    }]"></ApexChart>


                   
                </div>
            </div>
        </div>
    </div>

     
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { indexStore, useUserStore } from '../../../store/indexStore';
import ApexChart from 'vue3-apexcharts';

const store = indexStore();
const storeLogin = useUserStore();

function somarArray(array) {
      console.log(array)
    return array.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0);
}
  
 
 
</script>

    
<style>
.conteudo {
  flex-direction: row;
  align-items: center;
  width: 100%;
  overflow-x: auto;
}
</style>