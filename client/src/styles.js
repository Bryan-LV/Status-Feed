import styled from 'styled-components';

export const Button = styled.button`
  max-width:400px;
  width:100%;
  background-color: #0EBFE9;
  outline: none;
  border-radius:4px;
  border:none;
  padding:12px 0;
  color: white;
  font-size:18px;
  cursor: pointer;
`

export const Nav = styled.nav`
  display: flex;
  flex-flow: column nowrap;
  justify-content:space-between;
  align-items:center;
  width:100%;
  margin:0;
  padding: 10px 30px;
  background-color: #0EBFE9;

  @media(min-width:800px){
    flex-flow: row nowrap;
  }
`

export const Textarea = styled.textarea`
  margin:15px 0;
  max-width: 550px;
  width:100%;
  height: 100px;
  -moz-border-bottom-colors: none;
  -moz-border-left-colors: none;
  -moz-border-right-colors: none;
  -moz-border-top-colors: none;
  background: none repeat scroll 0 0 rgba(215, 215, 215, 0.07);
  border-color: -moz-use-text-color #FFFFFF #FFFFFF -moz-use-text-color;
  border-image: none;
  border-radius: 6px 6px 6px 6px;
  border-style: none solid solid none;
  border-width: medium 1px 1px medium;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12) inset;
  color: #555555;
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 1em;
  line-height: 1.4em;
  padding: 5px 8px;
  transition: background-color 0.2s ease 0s;


  &&:focus {
    background: none repeat scroll 0 0 #FFFFFF;
    outline-width: 0;
  }
`

export const Input = styled.input`
  width:100%;
  margin:8px 0px;
  padding:8px;
  border: 1px solid #ced4da;
  border-radius:2px;
`

export const Label = styled.label`
  font-size:1.5rem;
`
