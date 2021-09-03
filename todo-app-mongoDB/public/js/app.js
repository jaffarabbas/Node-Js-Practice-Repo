const formData = document.querySelector('form');
const inputFeild = document.querySelector('input');

formData.addEventListener('submit',(event) => {
    event.preventDefault();
    value = inputFeild.value;
    console.log('Test',value);
})
