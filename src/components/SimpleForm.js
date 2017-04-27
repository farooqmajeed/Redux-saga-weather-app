import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { Button, Input, Message } from 'semantic-ui-react'


class SimpleForm extends Component {

    locationInput({input, meta: { touched, error }, ...custom}) {
        const hasError = touched && error !== undefined;
        return (
            <div>
                {hasError &&
                    <Message
                        error
                        header='Error'
                        content={error} />}

                <Input
                    error={hasError}
                    fluid
                    placeholder='Location...'
                    {...input}
                    {...custom} />

            </div>
        )
    }


   submit({ location }, resolve) {
       return new Promise((resolve, reject) => {
           resolve({
               type: 'FETCH_WEATHER',
               location,
               resolve,
               reject
               
           });  
           console.log("button click", reject);    
       }).catch((error) => {
           throw new SubmissionError(error);
          
       }); 
      
    }
    

    render() {
      
        const { handleSubmit } = this.props;
          console.log("propa", this.props);
        return (
            <form onSubmit={ handleSubmit(this.submit.bind(this)) } >
               

                <Field name='location' component={this.locationInput} />
                <br />
                <Button fluid  type='submit'>Find weather</Button>
                

            </form>
           
        );
    }
}
const validate = values => {
    // console.log("validate", validate)
    const { location } = values;
    const errors = {};
    if (!location || location.trim() === '') {
        errors.location = 'Location required';
        // console.log("error", errors);
    }
    return errors;
}

console.log("form", validate); 
export default reduxForm({
    form: 'simple',
    validate 
})(SimpleForm);



/*class SimpleForm extends Component {
constructor(props){
    super(props);
  
      this.handleSubmit = this.submit.bind(this);
      this.InputHandle  = this.InputHandle.bind(this);
  
}

submit({ location }, resolve) {
       return new Promise((resolve, reject) => {
           resolve({
               type: 'FETCH_WEATHER',
               location,
               resolve,
               reject
           });      
       }).catch((error) => {
          console.log("error In Submit", error);
       });  
    }
InputHandle(){

}

render(){
    return(
        <div>
            <form onSubmit={this.handleSubmit}>
                <Input fluid  onChange = {this.InputHandle} /><br />
                <Button fluid  type ='submit' > Find Weather</Button>
            </form>
        </div>
    )
}
}

export default SimpleForm;
*/
