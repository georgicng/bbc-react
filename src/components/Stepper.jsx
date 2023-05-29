function Stepper({ steps, activeStep }) {

  function getStepClass(step) {
    let cls = 'step';
    if(activeStep === step) {
      cls += ' step-active';
    }
    else if(activeStep > step) {
      cls += ' step-done';
    }
    else {
      cls += ' step-inactive'
    }
    return cls;
  }

  return(
    <div className="steps-container">
    {
      steps.map((item, index) =>
        <div className={getStepClass(index)} key={item.key}>
          <div><div className="circle"><i className={item.icon}></i></div></div>
          <div className="label">{item.title}</div>
          { index < steps.length - 1 && <div className="line"></div> }
        </div>
      )
    }
    </div>
  );
}

export default Stepper;