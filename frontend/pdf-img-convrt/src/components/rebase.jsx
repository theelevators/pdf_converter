const [showModal, setShowModal] = useState(false);
const [isEditable, setIsEditable] = useState(false);
const [modalTitle, setModalTitle] = useState('');
const [leftButtonTitle, setLeftButtonTitle] = useState('');
const [rightButtonTitle, setRightButtonTitle] = useState('');
const [isLeftSelected, setIsLeftSelected] = useState(false)
const [isRightSelected, setIsRightSelected] = useState(false)

const [modalEntry, setModalEntry] = useState('');
const [modalTemp, setModalTemp] = useState('');








const saveComponents = async (loadedComponents) => {
  let formData = {

    "username" : user,
    "formName" : formName,
    "authCode" : authCode,
    "components" : loadedComponents
    
  }
  

  if (!isLoaded) {
    try {
      const response = await axios.post(
        `${BASE_URL}user/saveform`,
        formData
        ,
        {
          headers: {
            Authorization: "Bearer " + userToken
          }
          
        }
      );
      setModalTitle("Form has been saved!")
      setLeftButtonTitle("Ok")
      setRightButtonTitle('Cancel')
      setShowModal(true)
      handleReset()
    } catch (error) {
      console.error(error);
    }
    
  }

  if (isLoaded) {
    try {
      const response = await axios.patch(
        `${BASE_URL}user/updateform/?name=${formName}`,
        formData
        ,
        {
          headers: {
            Authorization: "Bearer " + userToken
          }
          
        }
        
      );

      setModalTitle("Form has been saved!")
      setLeftButtonTitle("Ok")
      setRightButtonTitle('Cancel')
      setShowModal(true)
      handleReset()
    } catch (error) {
      console.error(error);
    }
  }

  setModalTitle("Form has been saved!")
  setLeftButtonTitle("Ok")
  setRightButtonTitle('Cancel')
  setShowModal(true)
  handleReset()
  return

};

const getForm = async (formName) => {



  try {
    const response = await axios.get(
      `${BASE_URL}user/loadform/?name=${formName}`,
      myAuth
    );
    return response;
  } catch (error) {
    return error;
  }
};

const handleEditable = (prompt) => {
  setIsEditable(true)
  setModalTitle(prompt)
  setLeftButtonTitle('Open')
  setRightButtonTitle('Cancel')
  setShowModal(true)
  return

}





const handleOpen = async () => {
  
  if (isLoaded) {
    return
  }
  
  
  if (formName === null) {

      handleEditable("Enter the name of the form.");
      
        return
  }
  
  if (formName === '') {
    
      
      handleEditable("Enter the name of the form.");


    return
  }

  
    
    if (formName !== "") {
      const formMessage = await getForm(formName);
           
      if (formMessage.status !== 200) {
               
        setIsEditable(true)
        setModalTitle("Form Not Found. Try Again.")
        setLeftButtonTitle('Open')
        setRightButtonTitle('Cancel')
        setShowModal(true)
        return

      }

      if (formMessage.data.error) {
        setIsEditable(true)
        setModalTitle("Form Not Found. Try Again.")
        setLeftButtonTitle('Open')
        setRightButtonTitle('Cancel')
        setShowModal(true)
        return
      }

      const messageComponents = formMessage.data;
      const newComponents = JSON.parse(messageComponents);

      setComponents(newComponents);
      setIsLoaded(true)
      setFormName(formName)
      return


    }
    
    return

};


const handleShareForm = () => {
  if (formName !== '') {
    
    if (authCode === "") {
      setIsEditable(true)
      setModalTitle("Enter the share code for this form.")
      setLeftButtonTitle('Create code')
      setRightButtonTitle('Cancel')
      setShowModal(true)
      return
    }

    return
  }
  setIsEditable(false)
  setModalTitle('You cannot share an unsaved form.')
  setLeftButtonTitle('Ok')

  setRightButtonTitle('Dismiss')
  setShowModal(true)
  return
}


const handleNewEntry = () => {
  setIsEditable(false)
  setModalTitle('You are about to create a new form. Save all changes before starting.')
  setLeftButtonTitle('New Form')
  setRightButtonTitle('Cancel')
  setShowModal(true)
  return
}

const handleEmptyForm = () => {
  setIsEditable(true)
  setModalTitle("Enter the name for this form.")
  setLeftButtonTitle('Save')
  setRightButtonTitle('Cancel')
  setShowModal(true)
  return
  
}



const handleEmptyCode= () => {
  setIsEditable(true)
  setModalTitle("Enter the share code for this form.")
  setLeftButtonTitle('Create code')
  setRightButtonTitle('Cancel')
  setShowModal(true)
  return
}

const handleModalResponse = async (subtitle) => {

  if (subtitle === 'Save') {
    setIsLeftSelected(true)
    setFormName(modalEntry)
    setModalTemp("")
    setModalEntry("")
    if (authCode === "") {
      handleEmptyCode()
      return
    }
    await handleSave()
    setShowModal(false)
    return
  }


  if (subtitle === 'Open') {
    setIsLeftSelected(true)
    setFormName(modalEntry)
    handleOpen()
    setShowModal(false)
    return
  }

  if (subtitle === 'Ok') {
    setIsLeftSelected(true)
    setShowModal(false)
    return
  }

  if (subtitle === 'Rename') {
    setIsLeftSelected(true)
    setIsEditable(true)
    setModalTitle('Enter the new name for the form')
    setLeftButtonTitle('Save')
    setRightButtonTitle('Cancel')
    setShowModal(true)
    return
  }

  if (subtitle === 'New Form') {
    setIsLeftSelected(true)
    if (isLoaded) {
      handleReset()
      return

    }
    handleReset()
    return
  }
  if (subtitle === 'Create code') {
    setIsLeftSelected(true)
    handleAuthCode(modalEntry)
    await handleSave()
    setShowModal(false)
    return
  }


  
  if (subtitle === 'Continue Save') {
    setIsLeftSelected(true)
    setIsLoaded(true)
    setShowModal(false)
    await handleSave()
    return
    
  }

  

  if (subtitle === 'Create Component') {
    setIsLeftSelected(true)
    setShowModal(false)
    setComponents("")
    handleNewComponent(modalEntry, modalTemp)
    return
  }

  setIsLeftSelected(false)
  setIsRightSelected(false)
  return


}

const handleReset = () => {
  setAuthCode('')
  setComponents({})
  setFormName('')
  setIsEditable(false)
  setIsLeftSelected(false)
  setIsLoaded(false)
  setModalTemp('')
  setModalEntry('')
  setModalTitle('')
  setRightButtonTitle('')
  setShowModal(false)
  return
  
}


const handleNewComponentModal =  (options) =>  {
  setIsEditable(true)
  setModalTitle("Enter Component Title");
  setLeftButtonTitle("Create Component")
  setRightButtonTitle("Cancel")
  setShowModal(true)
  setModalTemp(options)
  return

}


const handleAuthCode = (code) => {
  const new_code = code
  setAuthCode(new_code)
  return
}
handleNewComponent(modalEntry, modalTemp)

const handleNewComponent = (entry, options) => {
  const newComponents = { ...components };
  newComponents[modalEntry] = modalTemp;

  setComponents(newComponents);
  return
};


const handleModalEntry = (entry) => {
  if (entry.target.value !== "") {
    setModalEntry(entry.target.value)
    return entry.target.value
    }
    setIsEditable(false)
    setModalTitle('The Entry Cannot Be Empty')
    setLeftButtonTitle('Ok')

    setRightButtonTitle('Cancel')
  setShowModal(true)
  return
}


const handleSave = async () => {
  const formComponents = { ...components };
  
   
  if (formName === "") {
    handleEmptyForm()
    return
  }
  
  if (authCode === "") {
    handleEmptyCode()
    setShowModal(true)
    return
  }

  const componentsToLoad = JSON.stringify(formComponents);

  await saveComponents(componentsToLoad);

  handleReset()
  return
  // window.alert("Form has been saved!");
};
