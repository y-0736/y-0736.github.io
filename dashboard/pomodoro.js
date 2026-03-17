let pMin = 25, pSec = 0, pInt = null;

export function togglePomo() {
    const btn = document.getElementById('pomo-btn');
    const display = document.getElementById('pomo-display');

    if(pInt) { 
        clearInterval(pInt); pInt = null; 
        btn.innerText = "BAŞLAT"; 
    } else {
        pInt = setInterval(() => {
            if(pSec == 0) { 
                if(pMin == 0) { clearInterval(pInt); alert("Süre bitti!"); return; } 
                pMin--; pSec = 59; 
            } else pSec--;
            display.innerText = `${pMin.toString().padStart(2,'0')}:${pSec.toString().padStart(2,'0')}`;
        }, 1000);
        btn.innerText = "DURDUR";
    }
}