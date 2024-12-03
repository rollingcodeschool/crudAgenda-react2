export function validarCaracteres(input, min, max){
    if(input.value.length >= min && input.value.length <= max ){
        input.className = 'form-control is-valid'
        return true
    }else{
        input.className = 'form-control is-invalid'
        return false
    }
}

export function validaremail(input){
    const regExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    if(regExp.test(input.value)){
        input.className = 'form-control is-valid'
        return true;
    }else{
        input.className = 'form-control is-invalid'
        return false;
    }

}