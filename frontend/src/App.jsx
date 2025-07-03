//npx shadcn@latest add button 

import FounderooAdmin from "./Components/AdminDash"
import NestedCommnets from "./Components/NestedComments/NestedCommnets"
import commentsData from './data/comments.json'


function App() {
  

  return (
    <div className="bg-black text-white h-1000">
     {/* <h1 className="text-red-500">NestedComments </h1>
     <NestedCommnets 
          comments={commentsData}
          onSubmit={()=>{}}
          onEdit={()=>{}}
          onDelete={()=>{}}
          onUpvote={()=>{}}
          onDownvote={()=>{}}
      /> */}

      <FounderooAdmin/>
     
    </div>

  )
}

export default App
