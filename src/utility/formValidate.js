export const formValidate = (form) => {
    for(let key in form) {
        if(form[key].length < 3) return;
    }
    return true;
}