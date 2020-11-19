console.log("javascript is loaded")


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messsageSecond = document.querySelector('#message-2')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    console.log(location)

    messageOne.textContent = 'Loading!!!!!!!!'

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
       
        if(data.error){
            messageOne.textContent = data.error
           
        }else{
            messageOne.textContent = data.location
            messsageSecond.textContent = data.forecast
            
        }
    })
})
})