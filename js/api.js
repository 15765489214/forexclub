/* PLEASE DO NOT COPY AND PASTE THIS CODE. */
(function() {
    var w = window,
        C = '___grecaptcha_cfg',
        cfg = w[C] = w[C] || {},
        N = 'grecaptcha';
    var gr = w[N] = w[N] || {};
    gr.ready = gr.ready || function(f) {
        (cfg['fns'] = cfg['fns'] || []).push(f);
    };
    w['__recaptcha_api'] = 'https://www.google.com/recaptcha/api2/';
    (cfg['render'] = cfg['render'] || []).push('6Lfj7sQgAAAAAAUk4tJYJf9Lpl2B6OEzeRbp2K4L');
    w['__google_recaptcha_client'] = true;
    var d = document,
        po = d.createElement('script');
    po.type = 'text/javascript';
    po.async = true;
    po.src = 'https://www.gstatic.com/recaptcha/releases/Nh10qRQB5k2ucc5SCBLAQ4nA/recaptcha__zh_cn.js';
    po.crossOrigin = 'anonymous';
    po.integrity = 'sha384-hJ70sNcd5k9pyJFnphYnYW3zv8Nr0H3owqwBk0mmRPMPE5lliNwIWhVSJCeeJnOt';
    var e = d.querySelector('script[nonce]'),
        n = e && (e['nonce'] || e.getAttribute('nonce'));
    if (n) {
        po.setAttribute('nonce', n);
    }
    var s = d.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(po, s);
})();