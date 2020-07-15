import styled from "styled-components/native";
import Button from '../../ui/Button';

export const Divider = styled.View`
  height: 1px;
  width: 100%;
  background-color: #b2b2b2;
`

export const Wrapper = styled.View`
  flex: 1;
  margin: 0px auto;
  width: 100%;
  padding: 0 10px;
  max-width: 500px;
`

export const StyledView = styled.View`
  margin: 15px 5px;
  background-color: #F7F7F7;
  padding : 20px 20px 15px;
  border-radius: 10px;
`

export const StyledTitles = styled.Text`
  color : #000144;
  text-transform: uppercase;
  padding-left : 12px;
  font-weight: 700;
  font-size: 12px;
`

export const StyledText = styled.Text`
  color : #262626;
  padding-left : 3%;
`

export const SmallText = styled.Text`
  color : #262626;
  font-size : 12px;
  text-transform: lowercase;
`

export const StyledInput = styled.TextInput`
  color : ${props => props.error == "true" ? "red" : "#262626"};
  padding-left : 12px;
  height: 35px;
  line-height: 25px;
  border-radius : 5px;
  padding: 5px 12px;
  flex:1;
  margin-top: 5px;
  margin-bottom: 12px;
  background-color: white;
  border: solid 1px ${props => props.error == "true" ? "red" : "#bfbfbf"};
`

export const DoubleWraper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const View = styled.View`
  margin : 6px 0;

`

export const DisabledButton = styled(Button)`
  background-color: transparent;
  color: #b2b2b2;
  flex:1;
  border: solid 1px #b2b2b2;
`

export const ErrorText = styled.Text`
  color: red;  
`

export const ViewLeft = styled.View`
  margin-right: 3px;
  flex: 1;
`

export const ViewRight = styled.View`
  margin-left: 3px;
  flex: 1;
`

export const ViewCenter = styled.View`
  margin-left: 3px;
  margin-right: 3px;
  flex: 1;
`