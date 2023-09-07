// import styled from 'styled-components'

export const GridForm = styled.form`
  width: 70%;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: auto 1fr;
`

export const ColOne = styled.label`
  grid-column: 1;
`

export const ColTwoText = styled.input`
  grid-column: 2;
`

export const ColTwoField = styled.fieldset`
  grid-column: 2;
  border: none;
  display: flex;
  flex-wrap: wrap;
`

export const Button = styled.button`
  grid-column: 2;
  width: 50%;
`
