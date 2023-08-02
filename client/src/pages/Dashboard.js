// import React, {useEffect} from 'react'
// import jwt from 'jsonwebtoken'
// import { useNavigate } from 'react-router-dom';


// const Dashboard = () => {
//     const navigate = useNavigate();
//     //check
//     useEffect(() => {
//         const token = localStorage.getItem('token')

//         async function populateQuote(){
//             const data = await fetch('/api/quote', {
//                 headers: {
//                     'x-access-token': localStorage.getItem('token')
//                 }
//             })
//         }
//         if(token){
//             const user = jwt.decode(token)
//             if(! user){
//                 localStorage.removeItem('token')
//                 navigate('/login', {replace: true})
//             }
//         }
//     }, [])

//     return(
//         <div>
//             <h1> hi</h1>
//         </div>
//     )
// }

// export default Dashboard