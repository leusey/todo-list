import styled from "styled-components";

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const StyledInput = styled.input`
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

function TextInputWithLabel({ elementId, label, onChange, ref, value }) {
  return (
    <>
      <StyledLabel htmlFor={elementId}>{label}</StyledLabel>
      <StyledInput
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default TextInputWithLabel;
