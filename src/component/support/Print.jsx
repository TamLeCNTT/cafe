import React, { useRef,useEffect,useState } from 'react';
import ReactToPrint from 'react-to-print';

import { Content } from './Content';

const Print = (props) => {
    const componentRef = useRef();
    const [data,setdata]=useState([])
    console.log(componentRef)
  
    const setData = () => {
        console.log(props.content, props.id)
        setdata(props.content)
    }
    return (
        <div onClick={()=>setData()}>
            <ReactToPrint  
                trigger={() => <button>Print this out!</button>}
                content={() => componentRef.current}
            />
            <div hidden>

            <Content  ref={componentRef} content={props.content} />
            </div>
        </div>
    );
};
export default Print