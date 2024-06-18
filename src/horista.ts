import Funcionario from "./funcionario";

export default class Horista extends Funcionario {
    horas: number;
    funcao: string;

    constructor(matricula: number, nome: string, idade: number, email: string, salario: number, horas: number, funcao: string) {
        super(matricula, nome, idade, email, salario);
        this.horas = horas;
        this.funcao = funcao;
    }

    validaEmail(): boolean{
        const validar = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return validar.test(this.email) && (this.email.includes('@adm.xpto.tec.br') || this.email.includes('@dev.xpto.tec.br') || this.email.includes('@vendas.xpto.tec.br'));
    }

    calcSalario(): number {
        const sb = this.calcSalarioBruto();
        const dsr = this.calcDsr();
        const inss = this.calcINSS();
        return (sb + dsr) - inss;
    }

    calcINSS(): number{
        const salarioContribuicao = this.calcSalarioBruto()
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

    calcDsr(): number {
        const sb = this.calcSalarioBruto();
        return sb / 25 * 4;
    }

    calcSalarioBruto(): number {
        return this.salario * this.horas;
    }

}