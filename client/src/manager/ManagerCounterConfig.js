import React from "react";
import api from "../api";

class ManagerCounterConfig extends React.Component {

    constructor(props){
        super(props);
        this.state = {list: undefined}
    }
    test=()=>{
        api.updateServiceTime('shipping', '00:10:00')
        .then((list) => {
            console.log(list)
            this.setState({list: list})
        }).catch((err) => {
            console.log('Database error', err);
        });
        
    }
    render(){
        return <> 
            <b onClick={()=>this.test()}>Counter configuration</b>
        </>;
    }
}

export default ManagerCounterConfig;