# Conversor Hex ⇄ Decimal (1 a 66 Bits)

Este projeto é uma **calculadora conversora entre Hexadecimal e Decimal** com suporte de **1 a 66 bits**, utilizando `BigInt` para garantir precisão em números grandes. Ele permite interpretar números como **assinado** (2's complement) ou **não assinado**, ideal para engenheiros, programadores e estudantes que trabalham com sistemas digitais ou protocolos de comunicação.

## Funcionalidades

- Conversão **Hexadecimal → Decimal** e **Decimal → Hexadecimal**.  
- Suporte a números de **1 a 66 bits**.  
- Interpretação opcional como **assinado (2's complement)**.  
- Mensagens de aviso quando o valor está fora do alcance do número de bits selecionado.  
- Copiar e colar diretamente para a área de transferência.  
- **Atalhos de teclado**:
  - `Esc` → Limpa todos os campos.
  - `Ctrl/⌘ + Enter` → Alterna foco entre campos de Hex e Decimal.

## Como usar

1. Abra o arquivo `index.html` em um navegador moderno.  
2. Ajuste o número de **bits** desejado e selecione se será **assinado** ou não.  
3. Para converter:
   - Digite um valor hexadecimal no campo **Hex → Decimal** ou cole com o botão **Colar**.  
   - Digite um valor decimal no campo **Decimal → Hex**.  
4. Utilize os botões **Copiar** para transferir os resultados para a área de trabalho.  
5. O botão **Limpar** redefine todos os campos para os valores padrão.

## Tecnologias

- **HTML5** para estrutura da página.  
- **CSS3** para estilo moderno e responsivo.  
- **JavaScript** (ES2020) com `BigInt` para manipulação de números grandes e cálculos de precisão.  

## Observações

- O conversor funciona dentro do **alcance definido pelo número de bits selecionado**.  
- Para números fora do alcance, o valor é convertido **módulo 2^N** com aviso visual.  
- Ótimo para cálculos de sistemas digitais, engenharia de software embarcado, ou estudos de protocolos de comunicação.

---

💡 **Dica:** Este projeto é totalmente **offline**, sem dependências externas. Basta abrir o HTML no navegador.
