export const createFormDate = (form, id, action) => {
    
    let formData = new FormData();
    for(let key in form) {
        if(form[key] === '') return;
        if(key === 'file') continue;
        formData.set(`contact[${key}]`, form[key])
    }

    formData.set('image', form.file);
    formData.set('id', id);
    formData.set('action', action);
    
    return formData;

}