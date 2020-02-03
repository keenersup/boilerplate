import React, {useContext} from 'react';
import {ErrorContext} from "../context/errorContext";

const TestPage: React.FC = (props) => {
    const context = useContext(ErrorContext)
    React.useEffect(()=>{
      throw new Error('test')
    },[])
    return (
        <div>
            <button onClick={() => {
                context.showNotFound()
            }}>error
            </button>
            <p>
                test page
            </p>
        </div>
    );
}
export default TestPage;