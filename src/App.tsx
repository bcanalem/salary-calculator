import React, { useState } from 'react';
import './App.css';
import './salary';
import { calculateSalaryFrom } from './salary';

function App() {
  const [salarioBruto, setSalarioBruto] = useState('');
  const [valorBaseINSS, setValorBaseINSS] = useState('');
  const [valorBaseIRPF, setValorBaseIRPF] = useState('');
  const [descontoINSS, setDescontoINSS] = useState('');
  const [descontoIRPF, setDescontoIRPF] = useState('');
  const [salarioLiquido, setSalarioLiquido] = useState('');
  const [porcentagemINSS, setPorcentagemINSS] = useState('0%');
  const [porcentagemIRPF, setPorcentagemIRPF] = useState('0%');

  // interface SalaryResult {
  //   baseINSS: number;
  //   baseIRPF: number;
  //   discountINSS: number;
  //   discountIRPF: number;
  //   netSalary: number;
  // }

  function formatCurrency(num: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(num);
  }

  function formatPercentage(num: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  }

  function settingFields(salary: number) {
    setSalarioBruto(String(salary));

    let salaryResult = calculateSalaryFrom(salary);
    let {
      baseINSS,
      baseIRPF,
      discountINSS,
      discountIRPF,
      netSalary,
      INSSpercent,
      IRPFpercent,
      netPercent,
    } = salaryResult;

    setValorBaseINSS(formatCurrency(baseINSS));
    setValorBaseIRPF(formatCurrency(baseIRPF));
    setDescontoINSS(
      `${formatCurrency(discountINSS)} (${formatPercentage(INSSpercent)})`
    );
    setDescontoIRPF(
      `${formatCurrency(discountIRPF)} (${formatPercentage(IRPFpercent)})`
    );
    setSalarioLiquido(
      `${formatCurrency(netSalary)} (${formatPercentage(netPercent)})`
    );
    setPorcentagemINSS(formatPercentage(INSSpercent));
    setPorcentagemIRPF(formatPercentage(IRPFpercent));
  }

  return (
    <main>
      <h1>Salário React</h1>
      <label htmlFor="salario_bruto">Salário Bruto</label>
      <input
        type="number"
        id="salario_bruto"
        value={salarioBruto}
        onChange={(event) => {
          settingFields(Number(event.target.value));
        }}
      />
      <div className="campos_calculos">
        <div>
          <label htmlFor="base_inss">Base INSS</label>
          <input disabled type="text" id="base_inss" value={valorBaseINSS} />
        </div>
        <div>
          <label htmlFor="desconto_inss">Desconto INSS</label>
          <input disabled type="text" id="desconto_inss" value={descontoINSS} />
        </div>
        <div>
          <label htmlFor="base_irpf">Base IRPF</label>
          <input disabled type="text" id="base_irpf" value={valorBaseIRPF} />
        </div>
        <div>
          <label htmlFor="desconto_irpf">Desconto IRPF</label>
          <input disabled type="text" id="desconto_irpf" value={descontoIRPF} />
        </div>
        <div>
          <label htmlFor="salario_liquido">Salário Líquido</label>
          <input
            disabled
            type="text"
            id="salario_liquido"
            value={salarioLiquido}
          />
        </div>
      </div>
      <div className="barra">
        <div
          className="barra_inss"
          style={{
            width: porcentagemINSS,
          }}
        ></div>
        <div
          className="barra_irpf"
          style={{
            width: porcentagemIRPF,
          }}
        ></div>
        <div className="barra_liquido"></div>
      </div>
    </main>
  );
}

export default App;
