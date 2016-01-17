function getXHR(){
    if(typeof XMLHttpRequest != 'undefined'){
        return new XMLHttpRequest();
    }
    if(typeof ActiveXObject != 'undefined'){
        return new ActiveXObject('Microsoft.XMLHTTP');
    }
    else throw new Error('AJAX is not supported');
}

function makeRequest(method, url, params, isAsync, callback){
    var xhr = getXHR();

    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && (200 <= xhr.status && xhr.status < 300)){
            callback(xhr);
        }
    }
    isAsync = isAsync ? true : false;

    if(method === "GET"){
        if(url.indexOf('?') != -1){
            url += '&';
        }
        else{
            url += '?';
        }

        url += parseParams(params);
    }

    xhr.open(method, url, isAsync);
    if (method == 'POST') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    xhr.send(method === 'POST' ? parseParams(params) : null );
}

function parseParams(params){
    var paramsString = [];
    for(var p in params){
        var pair = encodeURIComponent(p) + encodeURIComponent(params[p]);
        paramsString.push(pair);
    }
    return paramsString.join('&');
}

