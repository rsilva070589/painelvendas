import { ref } from 'vue'  
import { defineStore } from 'pinia'; 
 

export const indexStore = defineStore("rotas", () =>{
  
    const ulrprincipal = 'http://localhost:4141/'
    const versao = 'version: 1.0'
    const login = {
        email: null,
        senha: null
    }

    const empresas = []
    const filtro = {
        empresa: 'CENTRAL'
    }

    function detectar_mobile() {
      var check = false; //wrapper no check
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    }

    const rotas = ref({ 
    }); 

    const recursos = []

   //const baseApiHTTPS  = 'https://json-replace-oracle-production.up.railway.app'
   
   //const baseApiHTTPS  = 'http://192.168.1.114:4141'
   const baseApiHTTPS  = 'https://agiltecsistemas.com.br:4141'
   //const baseApiHTTPS  = 'http://localhost:4141'
   

   //const baseApiHTTPS  = 'http://35.226.231.200:4040'

    const dadosItens = []

    const dadosItensFiltro = []

    const ambiente = []

    const itensTipo = []     

    const itensSelecao = [ { AMBIENTE: null, 
                                TIPO: null, 
                                OPCIONAL: null, 
                                DESCRICAO: null,
                                PRECO_TOTAL: null ,
                                 ID_ITEM: null 
                        } ]

    const usuarioLogado = false                

    const BoxOpen = null

    const AmbienteOpen = null

    const ilhaBalcao = null
    

    const itemSelecionado = null

    const dadosEmpresa = {} 

    const imagens = []

    const itensCadastro = []

    const cadastroProduto = {
        ID: 0,
        CATEGORIA: 0,
        CODIGO_BARRAS: 0, 
        DESCRICAO: 0,
        FOTO: 0,
        NOME: 0, 
        SITUACAO: 0,
        VALOR: 0,  
        VALOR_CUSTO: 0, 
        QTDE_ESTOQUE: 0,
        COD_FORNECEDOR: 0
        } 
    
        const CaixaProdutos = ref ([])

        function formataDinheiro(item) {
            let venda = item;
            if (!!venda && venda.toString().includes(",")) {
              venda = venda.toString().replace(",", ".");
            }
            return parseFloat(venda)
              .toFixed(2)
              .replace(".", ",")
              .replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
          }
 
          const vendaCaixa = {
            sequenciaVenda: null,
            formaPgto: null, 
            valorTotalItens: 0,
            valorTroco: 0,
            descontos: 0,
            itensPedido: null,
            valorPago: null,
        }

       const  itensRelVendas = [ {
        ID: 0,
        DATA: null,
        COD_PRODUTO:null,
        NOME:null,
        QTDE:null,
        VALOR : null,
        CUSTO : null,
        LUCRO : null,
        PERC_LUCRO : null
       } ]
    
       const somaCaixa = 0

       const itensRelDemanda = []

       const compras = {
        NOTA: null,
        DATA_EMISSAO: null,
        FORNECEDOR: null,
        TOTAL_NOTA: null,
        ITENS: []
       }

       const compraItens = {
        CODIGO_BARRAS: null,
        QTDE: null,
        VALOR_CUSTO: null
       }

       const tipoVenda =  null
          
       const dadosSyonet = []

       const dadosPainel = []
       const pausarRelogio = 1

        const mesSelecionado = '06/2024'

    return {
        rotas ,
        login,
        ulrprincipal ,
        empresas,
        filtro,
        versao,
        detectar_mobile,
        rotas,        
        dadosEmpresa,
        dadosItens,
        ambiente,
        itensTipo,
        itensSelecao,
        itemSelecionado,
        BoxOpen,
        AmbienteOpen,
        imagens,
        ilhaBalcao,
        dadosItensFiltro,
        baseApiHTTPS,
        itensCadastro,
        cadastroProduto,
        usuarioLogado,
        CaixaProdutos,
        recursos,
        formataDinheiro,
        vendaCaixa,
        itensRelVendas,
        somaCaixa,
        itensRelDemanda,
        compras,
        compraItens,
        tipoVenda,
        dadosPainel,
        dadosSyonet,
        pausarRelogio,
        mesSelecionado 

    }
    
});

export const useUserStore = defineStore('storeUser', {
    state: () => {

      
      return {
        tempoPainel: 60,
        empresas: false,
        empresaSelecionada: 0,
        painelAtual: 1,
        email: null, 
        senha: null,
        accessToken: 'xxxxxxxxxxxxx'
      }
    },
    actions: {
      setToken (value) {
        this.accessToken = value
      }
    },
    persist: {
      enabled: true
    }
  })

 