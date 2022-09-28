import React, { ChangeEvent, createContext, FormEvent, useCallback, useContext, useMemo, useState } from 'react'

interface FormFields {
  name: string
  firstname: string
}

interface Context {
  fields: FormFields
  handleChange: (fieldName: keyof FormFields, newValue: string) => void
}

const FORM: Context = {
  fields: {
    name: "",
    firstname: "",
  },
  handleChange: (fieldName, newValue) => {}
}

const FormContext = createContext(FORM)

interface FormProps {
  defaultValue: FormFields
  onSubmit: (data: Context) => void
  children: React.ReactNode
}

function FormWithContext ({defaultValue, onSubmit, children}: FormProps) {
  const [data, setData] = useState(defaultValue)

  const change = useCallback((name: keyof FormFields, value: string) => {
    setData((previousData) => ({...previousData, [name]: value}))
  }, [])

  const contextValue = useMemo(() => {
    return {fields: data, handleChange: change}
  }, [data, change])

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault()
    onSubmit(contextValue)
  }, [onSubmit, contextValue])

  return (
  <FormContext.Provider value={ contextValue }>  
    <form onSubmit={(e) => handleSubmit(e)}>
      { children }
    </form>
  </FormContext.Provider>
  )
}

interface FormFieldsProps {
  thisFieldName: keyof FormFields
  children: React.ReactNode
}

function FormField({ thisFieldName, children }: FormFieldsProps) {
  const data = useContext<Context>(FormContext)
  const changeInputValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    data.handleChange(thisFieldName, e.target.value)
}, [data.handleChange])

  return (
    <>
      <label htmlFor={`${thisFieldName}`}>{children}</label>
      <input
        className='input' type='text'
        placeholder={`${thisFieldName}`} name={`${thisFieldName}`}
        value={data.fields[thisFieldName]}
        onChange={ (e) => changeInputValue(e) } />
    </>
  )
}

interface PrimaryButtonNode {
  children: React.ReactNode
}

function PrimaryButton({ children }: PrimaryButtonNode) {
  return (
    <button className='bannerButton bg-[#e50914]'>{children}</button>
  )
}

function App() {
  const initialValues = {
    firstname: "John",
    name: "Doe"
  }

  const handleSubmit = useCallback((data: Context) => {
    console.log(data)
  }, [])

  return (
    <FormWithContext defaultValue={initialValues} onSubmit={handleSubmit}>
      <FormField thisFieldName="firstname">Prénom</FormField>
      <FormField thisFieldName="name">Name</FormField>
      <PrimaryButton>Envoyer</PrimaryButton>
    </FormWithContext>
  )
}

export default App