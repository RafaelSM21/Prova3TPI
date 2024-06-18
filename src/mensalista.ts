import Funcionario from "./funcionario";

export default class Mensalista extends Funcionario{
    faltas: number;
    cargo: string;

    constructor(matricula: number, nome: string, idade: number, email: string, salario: number, faltas: number, cargo: string){
        super(matricula, nome, idade, email, salario)
        this.faltas = faltas;
        this.cargo = cargo;
    }

    validaEmail(): boolean{
        const validar = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return validar.test(this.email) && (this.email.includes('@adm.xpto.tec.br') || this.email.includes('@dev.xpto.tec.br') || this.email.includes('@vendas.xpto.tec.br'));
    }

    calcSalario(): number {
        const fts = this.calcFaltas();
        const inss = this.calcINSS();
        return this.salario - fts - inss;
    }

    calcINSS(): number{
        const salarioContribuicao = this.salario 
        let inss = 0;

        if (salarioContribuicao <= 1412.00) {
            inss = salarioContribuicao * 0.075;
        } else if (salarioContribuicao <= 2666.68) {
            inss = salarioContribuicao * 0.09;
        } else if (salarioContribuicao <= 4000.03) {
            inss = salarioContribuicao * 0.12;
        } else if (salarioContribuicao <= 7786.02) {
            inss = salarioContribuicao * 0.14;
        }

        return Math.min(inss, 908.85);
    }

    calcFaltas(): number {
        return this.salario / 30 * this.faltas;
    }
}