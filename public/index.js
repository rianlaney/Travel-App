const submit = document.getElementById('submit')
const stateBtn = document.querySelector('#states-btn')
const dropdown = document.querySelector('#dropdown')
const listContainer = document.getElementById('list-container')



const getStateDropdown = () => {
    axios.get('/dropdown')
         .then(res => {
            // console.log(res.data)
            createDropdown(res.data)
            
         })
         .catch(err=>console.log(err))
}
const createDropdown = (arr) => {

    arr.forEach(state => {
        let { name } = state
        let option = document.createElement('option')
        option.textContent = name
        option.value = name
        dropdown.appendChild(option)

    })
}


submit.addEventListener('submit', event => {  
    event.preventDefault() 
    // console.log(dropdown.value)
    axios.get(`/states/${dropdown.value}`)
    .then(res => {
        displayStates(res.data)
        
    })
    .catch(err=>console.log(err))
})




const displayStates = statesArr => {
    listContainer.innerHTML= `
        <section id="unvisited-list"></section>
        <section id="visited-list"></section>
        `
    statesArr.forEach(state => {
        let stateCard = document.createElement('div')
        stateCard.classList.add('state-card')


        stateCard.innerHTML = `
        <h1>State: ${state.name}</h1> 
        <h2>Visited: ${state.visited ? 'Yes' : 'No' }</h2> 
        <button onclick="updateVisited(event, ${state.state_id}, ${state.visited})">Visit</button>
        
        `
        if(state.visited){
           document.getElementById('visited-list').appendChild(stateCard)
           

        } else {
            document.getElementById('unvisited-list').appendChild(stateCard)

        }
    })
}

const updateVisited = (event, id, visited) => {
    event.preventDefault()
    let body = {id, visited}
    axios.put(`/states`, body)
         .then(res => {displayStates(res.data)})
         .catch(err => console.log(err))
}




    stateBtn.addEventListener('click', event =>{        
        event.preventDefault() 
       
            axios.get(`/states`)
            .then(res => {
                console.log(res.data)
                displayStates(res.data)
            })
            .catch(err=>console.log(err))



        })





//create
// const activityFunc = (activity) => {
//     console.log(activity)
//     const activityCard = document.createElement('div')
//     activityCard.classList.add('activity-card')

//     activityCard.innerHTML = `
//     <input type="text" placeholder="Add a fun activity!">
//     <p class="activity-title">${activities.activity}</p>
    
//     <button onclick="deleteActivity(${activities.id})">delete</button>
//     `
//     container1.appendChild(activityCard)
// }


// const addActivities = (event) =>{
//     event.preventDefault() 
//     let body = {
//         activity: input.value
//     }
//     axios.post(`/activities`,body)
//         .then(res=> {
//             // console.log(res.data)
//             activityCard.innerHTML=''
//             for(let i=0; i<res.data.length; i++){
//                 activityFunc(res.data[i])}
//             })
//         .catch(err => console.log(err))
// }
 



// delete activities
// const deleteActivity = (id) => {
//     axios.delete(`/activity/${id}`)
//     .then(res=> {
//         container1.innerHTML=''
//         console.log(res.data)
//         for(let i=0; i<res.data.length; i++){
//             activityFunc(res.data[i])}
//         })
//     .catch(err => console.err(err))}

    
getStateDropdown()
// addActivities()
// deleteActivity()