module.exports = class Massa {
    constructor(linhasChaveValor){
        this._linhas = linhasChaveValor;
    }

    geraCabecalho(arrayMassa){
        let split = arrayMassa.split("\n");
        return split[0].split(",")
    }

    geraLinhasChaveValor(arrayMassa){
        const cabecalho = this.geraCabecalho(arrayMassa);

        let split = arrayMassa.split("\n");
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

    getLinhas(){
        return this._linhas;
    }

    filtrarPorData(data){
        return this._linhas.filter(map => 
            map.get("DATA_HORA").includes(data))
    }

    maisRecente(){
        return this._linhas[this._linhas.length - 1];
    }

    filtrarPorIntervalo(de, ate){
        const {dataDe, dataAte} = this.getInvervaloEmMilli(de, ate)

        return  this._linhas.filter(linha => {
            let dataHora = linha.get("DATA_HORA");

            let data = dataHora.split(" ")[0];
            const hora = dataHora.split(" ")[1];

            data = data.split("/").reverse().join("/")+" "+hora;

            let dataMili = new Date(data).getTime()

            return  dataMili <= dataDe && dataMili >= dataAte;
        })
    }



    getInvervaloEmMilli(de,ate){
        var offsetDe = (24*60*60*1000) * de; 
        var offsetAte = (24*60*60*1000) * (ate - 1); 
        
        var date  = new Date();

        let dataDe = date.setTime(date.getTime() - offsetDe);
        let dataAte = date.setTime(date.getTime() - offsetAte);

        return {
            dataDe: dataDe,
            dataAte: dataAte
        }
    }

    calcularIntervalo(intervalo){
        const now = new Date(); 
        const past = new Date('2014-07-07'); // Outra data no passado
        const diff = Math.abs(now.getTime() - past.getTime()); // Subtrai uma data pela outra
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24)); // Divide o total pelo total de milisegundos correspondentes a 1 dia. (1000 milisegundos = 1 segundo).

        // Mostra a diferença em dias
        console.log('Entre 07/07/2014 até agora já se passaram ' + days + ' dias');
    }


}