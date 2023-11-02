// import React from 'react'
// import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from "react-router-dom";
// import App from './App';
// import Errorpage from './components/pageComponents/Errorpage';
// const Parent = () => {
//     return (
//         <div className='caregiver-container'>
//             <Router>
//                 <Routes>
//                     <Route
//                         path={`/`}
//                         element={
//                             <Navigate replace to={`/user/staff-tracking/summary/503?expires=1670904433&token=CW4AL67S1RH6UBvqguUgKZovvgAaxZuy&signature=c70e3531e95c31f8fccf1627370ef431c0ec79d98696a404f3864ea586021c32`} />
//                         }
//                     />
//                     <Route
//                         path={`/user/staff-tracking/*`}
//                         element={
//                             <App />
//                         }
//                     />
//                     <Route path="*" element={<Errorpage code={404} />} />
//                 </Routes>
//             </Router>
//         </div>
//     )
// }

// export default Parent