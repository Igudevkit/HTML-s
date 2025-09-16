    // Utilidades numéricas com BigInt nao sei direito o que ele faz mas ta funcionando bem
    const TWO = 2n;
    const clampBits = (n) => Math.min(66, Math.max(1, Number(n||0)));

    function maskFor(bits){ return (TWO ** BigInt(bits)) - 1n; }
    function signBit(bits){ return TWO ** BigInt(bits - 1); }

    function parseHexToBigInt(str){
      if(!str) return null;
      let s = String(str).trim();
      if(s.startsWith("0x") || s.startsWith("0X")) s = s.slice(2);
      if(s === "") return null;
      if(!/^([0-9a-fA-F]_?)+$/.test(s.replaceAll('_',''))) return NaN; // retorna o invalido para isso
      s = s.replaceAll('_','');
      try { return BigInt("0x" + s); } catch { return NaN; }
    }

    function toFixedWidthHex(x, bits){
      const m = maskFor(bits);
      const val = x & m;
      let hex = val.toString(16).toUpperCase();
      const hexWidth = Math.ceil(bits/4);
      if(hex.length < hexWidth) hex = '0'.repeat(hexWidth - hex.length) + hex;
      return hex;
    }

    function hexToDecimalDisplay(hexVal, bits, signed){
      if(hexVal === null) return { text:"", warn:"" };
      if(Number.isNaN(hexVal)) return { text:"", warn:"Valor HEX inválido.", error:true };
      const m = maskFor(bits);
      const val = hexVal & m;
      if(!signed){
        return { text: val.toString(10), warn:"" };
      } else {
        const sb = signBit(bits);
        const dec = (val >= sb) ? (val - (m + 1n)) : val; // interpretação assinada
        return { text: dec.toString(10), warn:"" };
      }
    }

    function decimalToHexDisplay(decStr, bits, signed){
      if(!decStr) return { text:"", warn:"" };
      let s = decStr.trim();
      if(!/^[-+]?\d+$/.test(s)) return { text:"", warn:"Valor decimal inválido.", error:true };
      let x;
      try { x = BigInt(s); } catch { return { text:"", warn:"Valor decimal inválido.", error:true }; }

      const m = maskFor(bits);
      const min = signed ? (-(TWO ** BigInt(bits-1))) : 0n;
      const max = signed ? ((TWO ** BigInt(bits-1)) - 1n) : m;
      let warn = "";
      if(x < min || x > max){ warn = `Fora do alcance para ${bits} bits ${signed?"(assinado)":"(não assinado)"}. Será convertido módulo 2^${bits}.`; }

      // Para assinado: negativos viram complemento de dois no width positivos idem módulo mas acho que nao funciona assim
      // Para não assinado: modulo direto
      let asWidth;
      if(signed){
        const M = m + 1n;
        asWidth = ((x % M) + M) % M; // módulo positivo nao toque nisso
      } else {
        asWidth = x & m;
      }
      const hex = toFixedWidthHex(asWidth, bits); // nao toque nisso
      return { text: hex, warn };
    }

    function updateRangeHint(){
      const bits = clampBits(document.getElementById('bits').value);
      const signed = document.getElementById('signed').checked;
      const m = maskFor(bits);
      const min = signed ? (-(TWO ** BigInt(bits-1))) : 0n;
      const max = signed ? ((TWO ** BigInt(bits-1)) - 1n) : m;
      const hint = signed ? `Alcance: ${min.toString()} a ${max.toString()} (assinado)`
                          : `Alcance: 0 a ${max.toString()} (não assinado)`;
      document.getElementById('rangeHint').textContent = hint;
    }

    function syncFromHex(){
      const bits = clampBits(document.getElementById('bits').value);
      const signed = document.getElementById('signed').checked;
      const hexStr = document.getElementById('hexIn').value;
      const parsed = parseHexToBigInt(hexStr);
      const res = hexToDecimalDisplay(parsed, bits, signed);
      document.getElementById('decOutFromHex').value = res.text;
      const warn = document.getElementById('hexWarn');
      warn.textContent = res.warn || '';
      warn.className = res.error ? 'hint warn' : 'hint';
    }

    function syncFromDec(){
      const bits = clampBits(document.getElementById('bits').value);
      const signed = document.getElementById('signed').checked;
      const decStr = document.getElementById('decIn').value;
      const res = decimalToHexDisplay(decStr, bits, signed);
      document.getElementById('hexOutFromDec').value = res.text;
      const warn = document.getElementById('decWarn');
      warn.textContent = res.warn || '';
      warn.className = res.warn ? 'hint warn' : 'hint';
    }

    function syncAll(){ updateRangeHint(); syncFromHex(); syncFromDec(); }

    // Eventos gerados, a principio podesm ser usados como log futuramente
    document.getElementById('bits').addEventListener('input', ()=>{ syncAll(); });
    document.getElementById('signed').addEventListener('change', ()=>{ syncAll(); });

    document.getElementById('hexIn').addEventListener('input', ()=>{ syncFromHex(); });
    document.getElementById('decIn').addEventListener('input', ()=>{ syncFromDec(); });

    document.getElementById('copyDecFromHex').addEventListener('click', async ()=>{
      const v = document.getElementById('decOutFromHex').value;
      if(v) await navigator.clipboard.writeText(v);
    });
    document.getElementById('copyHexFromDec').addEventListener('click', async ()=>{
      const v = document.getElementById('hexOutFromDec').value;
      if(v) await navigator.clipboard.writeText('0x'+v);
    });
    document.getElementById('pasteHex').addEventListener('click', async ()=>{
      try{
        const t = await navigator.clipboard.readText();
        document.getElementById('hexIn').value = t.trim();
        syncFromHex();
      }catch{}
    });

    document.getElementById('clearBtn').addEventListener('click', ()=>{
      document.getElementById('hexIn').value = '';
      document.getElementById('decOutFromHex').value = '';
      document.getElementById('decIn').value = '';
      document.getElementById('hexOutFromDec').value = '';
      document.getElementById('hexWarn').textContent = '';
      document.getElementById('decWarn').textContent = '';
      document.getElementById('signed').checked = false;
      document.getElementById('bits').value = 32;
      syncAll();
    });

    // Atalhos devem ser melhorados ainda 
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape'){
        e.preventDefault();
        document.getElementById('clearBtn').click();
      } else if((e.key === 'Enter') && (e.ctrlKey || e.metaKey)){
        const a = document.getElementById('hexIn');
        const b = document.getElementById('decIn');
        if(document.activeElement === a) b.focus(); else a.focus();
      }
    });

    // Inicialização do codigo
    syncAll(); // nao toque