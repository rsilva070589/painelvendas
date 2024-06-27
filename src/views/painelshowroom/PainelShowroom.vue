<template> 
 
    <!-- Menu Section -->
    <div style="  display: inline-flex; color: black; position: relative" >

      <div @click="pausa()">
        <div v-if="store.pausarRelogio == 0">
          <svg width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"> 
          <polygon points="30,20 30,80 70,50" fill="black"/>
        </svg>
        </div>
        
        <div v-if="store.pausarRelogio == 1">
          <svg width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="20" width="15" height="60" fill="black"/>
            <rect x="55" y="20" width="15" height="60" fill="black"/>
          </svg>
        </div>
      </div>

      <div style="padding: 1px; margin: 1px; font-weight: bold;" v-for="menuItem in menuItems" :key="menuItem.id">
        <div :class="{ buttonSelect: storeLogin.painelAtual == menuItem.id, button: storeLogin.painelAtual != menuItem.id}"
             @click="selectMenuItem(menuItem.id)">
          {{ menuItem.title }}
        </div>
      </div>
  


    <!-- Company Selection Dropdown -->
    <div >
      <select class="select-estiloso"  style="font-size: 20px;"
        name="cars" id="cars" v-model="storeLogin.empresaSelecionada" @change="filtros()">
        <option value="2"> Orion Kia</option>
        <option value="11">Terra Centro</option>
        <option value="13">Terra JB</option>
        <option value="14">Terra Sobral</option>
        <option value="20">Extrema</option>       
        <option value="30">TruckFor</option>
        <option value="41">Triumph</option>        
      </select>
    </div>
 
    <div   >      
      <input
      style="padding: 1px; margin: 1px; font-size: 20px; width: 80px; height: 40px"
      v-model="store.mesSelecionado">
    </div>

    <div @click="atualizar()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50">
      <path d="M12 2c-1.1 0-2 .9-2 2s.9 2 2 2c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6h2l-4-4-4 4h2c0 5.52 4.48 10 10 10s10-4.48 10-10-4.48-10-10-10z" fill="#4CAF50"/>
    </svg>

    </div>
    
   

  </div>



  <div v-if="store.dadosPainel" >
    <!-- Dynamic Content Based on Selected Menu Item -->
    <div v-if="storeLogin.painelAtual == 1">
        <VendasModelos />
      </div>
      <div v-if="storeLogin.painelAtual == 2">
        <EventosAtrasos />
      </div>
      <div v-if="storeLogin.painelAtual == 3">
        <EventosAguardando />
      </div>
      <div v-if="storeLogin.painelAtual == 4">
        <EventosAcoes />
      </div>
      <div v-if="storeLogin.painelAtual == 5">
        <EventosConversoes />
      </div>
      <div v-if="storeLogin.painelAtual == 6">
        <EventosConversoesDigital />
      </div>
      <div v-if="storeLogin.painelAtual == 7">
        <EventosInsucesso />
      </div>
  </div>
  
</template>

<script setup>
import  { defineComponent, ref, onMounted } from 'vue';
 import { indexStore, useUserStore } from '../../store/indexStore'  
 import VendasModelos from '../painelshowroom/paineis/VendasModelos.vue'
 import EventosAtrasos from '../painelshowroom/paineis/EventosAtrasos.vue'
 import EventosAguardando from '../painelshowroom/paineis/EventosAguardando.vue'
 import EventosAcoes from '../painelshowroom/paineis/EventosAcoes.vue'
 import EventosConversoes from '../painelshowroom/paineis/EventosConversoes.vue'
 import EventosConversoesDigital from '../painelshowroom/paineis/EventosConversoesDigital.vue'
 import EventosInsucesso from '../painelshowroom/paineis/EventosInsucesso.vue'
 import axios from 'axios';

const store = indexStore(); 
const storeLogin = useUserStore();

store.pausarRelogio == 1
 


const menuItems = [
  { id: 1, title: 'Negocios' },
  { id: 2, title: 'Atraso' },
  { id: 3, title: 'Aguardando' },
  { id: 4, title: 'Ações Hora' },
  { id: 5, title: 'Conversão' },
  { id: 6, title: 'Digital' },
  { id: 7, title: 'Insucessos' }
];


function selectMenuItem (pagina) {
  storeLogin.painelAtual = pagina
}

async function getDadosSyonet() { 
  // Prepare data payload
  
  let data = JSON.stringify({
    "MES": store.mesSelecionado, // Example month/year parameter
    "COD_EMPRESA": storeLogin.empresaSelecionada // Using empresaSelecionada from Vuex store
  });

  // Configure Axios request
  let config = {
    method: 'post', // HTTP method
    maxBodyLength: Infinity, // Set max body length
    url: 'http://192.168.10.12:4141/syonet', // Endpoint URL
    headers: {
      'Content-Type': 'application/json' // Request headers
    },
    data: data // Data payload to send
  };

  try { 
    
    const response = await axios.request(config);  
 
    store.dadosSyonet = response.data;   

  } catch (error) { 
    console.error('Error fetching Syonet data:', error);
  }
} 



async function getDadosPainel() {
 
  // Prepare data payload
  let data = JSON.stringify({
    "MES": store.mesSelecionado, // Example month/year parameter
    // ,"COD_EMPRESA": 11 // Optional: Uncomment to include COD_EMPRESA if needed
  });

  // Configure Axios request
  let config = {
    method: 'post', // HTTP method
    maxBodyLength: Infinity, // Set max body length
    url: 'http://192.168.10.12:4141/painel', // Endpoint URL
    headers: {
      'Content-Type': 'application/json' // Request headers
    },
    data: data // Data payload to send
  };

  try {
    // Send HTTP request using Axios
    const response = await axios.request(config);  
    store.dadosPainel = response.data; 
 
  } catch (error) {
    // Handle errors if the HTTP request fails
    console.error('Error fetching Painel data:', error);
  }
}



function filtros(){        

    store.dadosVendasModelos=[]
    store.dadosVendasModelosQtde=[]
    store.dadosPainel.filter(f => f.TIPO=='VENDAS-AGRUPADAS-MODELO' && f.COD_EMPRESA == storeLogin.empresaSelecionada).map(x=> {      
        store.dadosVendasModelos.push(x.DESCRICAO_MODELO)
        store.dadosVendasModelosQtde.push(x.QTDE)        
        }) 


    store.dadosSyonetAtrasosVendedor = []
    store.dadosSyonetAtrasosVendedorQtde = []
    store.dadosSyonet.filter(f => f.tipo=='EVENTOS-ATRASOS-VENDEDOR' && f.id_empresa == storeLogin.empresaSelecionada).map(x=> {      
        store.dadosSyonetAtrasosVendedor.push(x.vendedor)
        store.dadosSyonetAtrasosVendedorQtde.push(x.qtde)        
        })   
}
 
 
 
function pausa () {
  if(store.pausarRelogio == 0) {
    store.pausarRelogio = 1
  }else{
    store.pausarRelogio = 0
  }  
}

  
function mesAtual(){
  let dataAtual = new Date(); 
let mes = dataAtual.getMonth() + 1;   
let ano = dataAtual.getFullYear();
 
let mesAno = `${mes.toString().padStart(2, '0')}/${ano}`;
return mesAno
}

async function atualizar (){
  store.dadosPainel = []
  store.dadosSyonet = []
  await getDadosSyonet()
  await getDadosPainel()   
}

    onMounted(() => { 
      store.mesSelecionado = mesAtual()     
      getDadosSyonet()
      getDadosPainel()      
    });
 
    setInterval( async () => {
      if  (store.pausarRelogio == 1){
        store.dadosPainel = []
        store.dadosSyonet = []
        await getDadosSyonet()
        await getDadosPainel()   
      }
      }, (420000 * 1000)); 
     
   

const anterior = ()=> {   
   if (storeLogin.painelAtual > 1) {
    storeLogin.painelAtual = storeLogin.painelAtual -1      
    window.location.reload()         
   }   
 }

 const proximo = ()=> {  
  if (storeLogin.painelAtual  < 6 ) {
    storeLogin.painelAtual = storeLogin.painelAtual +1 
    window.location.reload() 
  }  
}

const alternarPainel = () => { 
 

  if (store.pausarRelogio == 1){
    if (storeLogin.painelAtual  < 7 ) {
    storeLogin.painelAtual = storeLogin.painelAtual +1 
   // window.location.reload() 
    } else {
      storeLogin.painelAtual = 1
    //  window.location.reload() 
    }
  } 
  
}

setInterval(alternarPainel, ((storeLogin.tempoPainel || 60)*1000));

</script>

<style>
  .conteudo { 
    flex-direction: row;
    /* justify-content: center; */
    align-items: center;
    width: 100%;
    overflow-x: auto;
}

.container { 
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Ajuste a altura conforme necessário */
}


.active {
  margin-top: 60px;
}
.not-active {
  
    margin-top: 40px;
}

.button {
  background-color: #4a4d4c; /* Green */
  border: none;
  color: white;
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

.buttonSelect {
  background-color: #04AA6D; /* Green */
  border: none;
  color: white;
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

.select-estiloso { /* <div> */
       width: 140px;
       height: 45px;
       margin: 2px;
       overflow: hidden; 
       border: 1px solid #ccc;
    }   


</style>
