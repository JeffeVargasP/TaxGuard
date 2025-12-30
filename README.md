# 🛡️ TaxGuard UI - Inteligência Tributária 2026

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

O **TaxGuard** é uma solução de front-end desenvolvida para enfrentar o maior desafio financeiro das empresas brasileiras em 2026: a transição para o novo regime tributário (IBS e CBS). 

Esta interface foca na **Não-Cumulatividade Plena**, permitindo que empresas monitorem em tempo real se os impostos pagos aos fornecedores estão de fato gerando créditos tributários ou se estão se tornando prejuízo financeiro ("Crédito Podre").

---

## 🚀 Principais Funcionalidades

- **Dashboard de Liquidez Fiscal**: Visualização clara de créditos homologados, em auditoria e valores em risco.
- **Rating de Fornecedores (Tax Score)**: Sistema estilo "Serasa PJ" que classifica fornecedores de A a D com base na adimplência fiscal no novo regime.
- **Auditoria de NF-e**: Interface para upload e processamento de XMLs com feedback instantâneo de conformidade.
- **Projeção Financeira**: Gráficos comparativos de recuperação de impostos vs. perdas operacionais.
- **Dark Mode Native**: Interface otimizada para produtividade em qualquer ambiente.

## 🛠️ Stack Tecnológica

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Gráficos**: [Recharts](https://recharts.org/)
- **Tipagem**: [TypeScript](https://www.typescriptlang.org/)

## 📈 Por que 2026?

A partir de 1º de janeiro de 2026, o Brasil inicia o período de teste do IVA Dual (IBS + CBS). A grande "dor" do mercado será o **Split Payment**: o crédito só é garantido se o imposto for pago na transação. O TaxGuard resolve a visibilidade desse fluxo para o financeiro.

---

## 🏗️ Como Executar o Projeto

1. Clone o repositório:
```bash
git clone [https://github.com/JeffeVargasP/tax-guard-ui.git](https://github.com/JeffeVargasP/tax-guard-ui.git)
Instale as dependências:

Bash

npm install
Inicie o servidor de desenvolvimento:

Bash

npm run dev
Acesse em: http://localhost:3000

⚠️ Disclaimer
Esta é a versão Front-end / UI-only do projeto, desenvolvida para fins de demonstração de interface e experiência de usuário. A lógica de auditoria pesada e integração com APIs governamentais reside em um backend privado.

Desenvolvido com foco na eficiência logística e financeira por Jefferson Vargas.
