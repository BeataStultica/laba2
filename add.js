globalThis.dos = new Map();
const pushToURL = (name, key, value) => window.history.replaceState(null, null, `${name}?${key}=${value}`)


f = function(){
    head = document.getElementById('head_i');
    text = document.getElementById('text_i');
    d = document.getElementsByClassName('active_button');
    if (d.length > 0){
        d[0].className = 'button'
    }
    active = document.activeElement;
    pushToURL('', 'id', this.id)
    if (active.className == 'button')
        active.className =  'active_button'
    note = JSON.parse(localStorage.getItem(this.id))
    if (note){
        head.value = note[0]
        text.value = note[1]
    }
    else{
        head.value = ''
        text.value = ''
    }
}

ff = function(id_r){
    head = document.getElementById('head_i');
    text = document.getElementById('text_i');
    d = document.getElementsByClassName('active_button');
    if (d.length > 0){
        d[0].className = 'button'
    }
    active = document.getElementById(id_r);
    pushToURL('', 'id', id_r)
    if (active.className == 'button')
        active.className =  'active_button'
    note = JSON.parse(localStorage.getItem(id_r))
    if (note){
        head.value = note[0]
        text.value = note[1]
    }
    else{
        head.value = ''
        text.value = ''
    }
}

function add(iner = "Новий запис", id = String(Math.random()).slice(2,8),dat){
    var elem = document.createElement('button');
    elem.className = 'button';
    elem.id = id;
    elem.onclick = 'reboot(elem.id)';
    elem.innerHTML = iner + ' ' + ' ' +dat;
    elem.addEventListener("click", f);
    parent = document.getElementById('headers');
    delet = document.createElement('button');
    delet.className = 'delete_but';
    delet.innerHTML = 'X';
    delet.id = id + ' ' +'d'
    delet.addEventListener("click", function(){
        window.location.href = window.location.origin + window.location.pathname +'?id=undefined'
        var el = document.getElementById(this.id.split(' ')[0]);
        el.parentNode.removeChild(el);
        localStorage.removeItem(this.id.split(' ')[0]);
    })
    elem.appendChild(delet);
    parent.insertBefore(elem, parent[0]);
    if (iner == "Новий запис"){
        ff(id)
    }

}

function input_text(){
    var now = new Date()
    var sec = Date.now()
    var formatter = new Intl.DateTimeFormat('ru', {hour: 'numeric',minute: 'numeric', second: 'numeric'})
    var formatter_d = new Intl.DateTimeFormat('ru')
    head = document.getElementById('head_i').value;
    text = document.getElementById('text_i').value;
    active_e = document.getElementsByClassName('active_button')[0];
    e = formatter.format(now) + ' ' + String(formatter_d.format(now));
    active_e.innerHTML = head +' ' + ' '+ e;
    delet = document.createElement('button');
    delet.className = 'delete_but';
    delet.innerHTML = 'X';
    delet.id = active_e.id + ' d'
    delet.addEventListener("click", function(){
        window.location.href = window.location.origin + window.location.pathname +'?id=undefined'
        var el = document.getElementById(this.id.split(' ')[0]);
        el.parentNode.removeChild(el);
        localStorage.removeItem(this.id.split(' ')[0]);
    })
    active_e.appendChild(delet);
    localStorage.setItem(active_e.id,JSON.stringify([head,text,e,sec]));
}

var temp_arr = []
for (var i = 0; i < localStorage.length; i++){
    key = localStorage.key(i);
    val = JSON.parse(localStorage.getItem(key));
    temp_arr.push([val[0], key, val[2], val[3]])
    /*add(iner = val[0], id = key, dat = val[2]);*/
}
temp_arr.sort(function(a,b){
    return Number(b[3]) - Number(a[3]);

})
for (var i = 0; i < localStorage.length; i++){
    add(iner = temp_arr[i][0],id = temp_arr[i][1],dat = temp_arr[i][2])
}
a = window.location.search
id_t = a.split('=')[1];

if (id_t != 'notes' && id_t !='undefined'){
    ff(id_t)
    console.log(id_t);

}

document.addEventListener('keydown', function (e) {
    input_text();
})
