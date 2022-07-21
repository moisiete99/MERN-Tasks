import React, { Component } from "react";

function App () {
   /* addTask(e) ;{
      console.log('adding');
      e.preventDefault();
   } */

   return(
      <div>
         {/* NAVIGATION */}
         <nav className="light-blue darken-4">
            <div className="container">
               <a className="brand-logo" href="/">MERN Stack</a>
            </div>
         </nav>

         <div className="container">
            <div className="row">
               <div className="col s5">
                  <div className="card">
                     <div className="card-content">
                        <form>
                           <div className="row">
                              <div className="input-fiel col s12">
                                 <input type="text" placeholder="Task Title" />
                              </div>
                           </div>
                           <div className="row">
                              <div className="input-fiel col s12">
                                 <textarea placeholder="Task Description" className="materialize-textarea"></textarea>
                              </div>
                           </div>
                           <button type="submit " className="btn light-green darken-4">Send</button>
                        </form>
                     </div>
                  </div>
               </div>
               <div className="col s7">

               </div>
            </div>
         </div>
      </div>
   )   
}

export default App