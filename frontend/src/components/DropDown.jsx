
const DropDown = ({exercises, ids}) => {
    return (
        
        <>
        
        {exercises.map(function (exercise) {
            if(ids && ids.includes(exercise._id)){
                return <option disabled key= {exercise._id} value={exercise._id}>{exercise.title}</option> 
            } 
            else{
                return <option key= {exercise._id} value={exercise._id}>{exercise.title}</option>
            }
            
        

        })}
        </>
    )
}

export default DropDown;