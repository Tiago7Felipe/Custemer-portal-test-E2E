import fs from "fs";
import Integrador from "../integracaoCenarios/Integrador";

export default class Utils{
    constructor(){
        this.senha =  "Senha";
        this.emBase64 ='';
        this.mailingTemporario = "";
    }

    geraLinhasChaveValorMassa(arrayMassa){
        let split = arrayMassa.split("\n");
    
        const cabecalho = split[0].split(",");
    
        split.splice(0,1);
    
        let dados = split.map(arr => arr.split(","))
    
        let map = dados.map((dados) => {
            let mapInterno = new Map()
            cabecalho.forEach((cab,index)=>{
               mapInterno.set(cab.trim(),dados[index]);
            })
    
            return mapInterno;
        })
    
        return map;
    }

    encriptar(){
        this.emBase64 = Buffer.from(this.senha).toString('base64')
        return this.emBase64;
    }

    decriptar(){
        return Buffer.from("PzFkRjJScG42bg==", 'base64').toString()
    }   
    
    limparCaracteresEspeciaisCnpj(cnpj){
        return cnpj.replaceAll('.','').replace('/','').replace('-','');
    }

    typeCharByChar(cyObj,values){
        values.split('').forEach(l => {
            let timer = setTimeout(()=>{
                cy.log(l)
            },2000)
            timer
            clearTimeout(timer)
            cyObj.type(l)
        })
    }

    async criarArquivoMailiginTemporario(nomeArquivoMailing, layout, dados){
        const path = `cypress/fixtures/mailings_temporarios/${nomeArquivoMailing}_${Date.now()}.csv`
        for(let index in dados) {
            const entradasDoArquivo = dados[index];
            let linha = layout;

            for(let entrada of entradasDoArquivo){
                linha = linha.replace("#",entrada);
            }
            try{
                await cy.writeFile(path,linha,{encoding:"utf8"});
                return path;
               // fs.writeFileSync(path,linha,{encoding:"utf-8"})
            }catch(err){
                Integrador.erro.concat(err);
            }
        }
    }

    obterDataHoraAcrescidosDeMinutos(minutosAdicionais){
        const mili = Date.now() + minutosAdicionais * 60000; 

        let dateTime = new Date(mili).toLocaleString();

        dateTime = dateTime.split(" ");
        return {
            DataAtualAcrescidaEmMinutos: dateTime[0],
            HoraAtualAcrescidaEmMinutos: dateTime[1]
        }
    }
}