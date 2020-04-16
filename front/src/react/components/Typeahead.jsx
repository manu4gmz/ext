import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { View, TouchableOpacity, Text, Button, Keyboard, TouchableWithoutFeedback } from "react-native";

const DismissKeyboard = ({ children }) => (
	<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
		{children}
	</TouchableWithoutFeedback>
);

export default ({ onChange, title, getOptions, placeholder, options, handleSelect }) => {
	const [input, setInput] = useState("");
	const [error, setError] = useState(null);
	const [show, setShow] = useState(false);

	useEffect(() => {
		getOptions(input)
	}, [input])

	useEffect(() => {
		if (!show && input) {
			const labels = (options || []).map(a => a.label);

			if (labels.includes(input)) handleOptionSelect((options || [])[labels.indexOf(input)]);
			else {
				onChange(form => {
					return {
						...form,
						[title]: {
							value: input,
							error: "El valor no coincide con ninguna opción."
						}
					}
				})
				setError("El valor no coincide con ninguna opción.")
			}
		}
		else if (!show && !input) {
			onChange(form => ({
				...form,
				[title]: {
					value: input,
					error: null
				}
			}))

		}
	}, [show])

	function handleOptionSelect(elem) {
		setInput(elem.label);
		onChange(form => ({
			...form,
			[title]: {
				value: elem.label,
				error: null
			}
		}))
		handleSelect(elem);
		setError(null);
	}

	function handleChange(val) {
		setInput(val);
		onChange(form => ({
			...form,
			[title]: {
				value: val,
				error: null
			}
		}))
		handleSelect(null)
	}

	function handlePress(elem) {
		setInput(elem.label);
		setShow(false);
		handleOptionSelect(elem)
	}

	return <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
		<View style={{ zIndex: 1 }}>
			<StyledTitles>{title}</StyledTitles>
			<StyledInput
				onChangeText={handleChange}
				onFocus={() => setShow(true)}
				onBlur={() => setShow(false)}
				value={input}
				placeholder={placeholder}
				error={(!!error) + ""}
			/>
			{
				show && (options || []).length ?
					<OptionsWrapper>
						{
							options.slice(0, 4).map((elem, i) => (
								<Option key={i} onPress={() => handlePress(elem)}>
									<Label>{elem.label}</Label>
								</Option>
							))
						}
						{
							options.length > 4 ?
								<TextOption>Y otras opciones más</TextOption> : null
						}
					</OptionsWrapper>
					: false
			}
			{
				error ? <Error>{error}</Error> : null
			}
		</View>
	</TouchableWithoutFeedback>

}

const OptionsWrapper = styled.View`
	width: 100%;
    background-color: white;
    padding: 0 10px;
    border-radius: 5px;
    border: solid 1px #b2b2b2;
    overflow: hidden;
    max-height: 180px;
    margin-top: -5px;
`

const StyledTitles = styled.Text`
  color : #000144;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 5px;
  margin-left: 12px;
`

const StyledInput = styled.TextInput`
  padding-left : 3%;
  height: 35px;
  line-height: 20px;
  border-radius: 5px;
  margin : 5px 0;
  text-transform: capitalize;
  background-color: white;
  color : ${props => props.error == "true" ? "red" : "#262626"};
  border: solid 1px ${props => props.error == "true" ? "red" : "#bfbfbf"};

`

const Label = styled.Text`
	height: 36px;
	font-size: 16px;
	line-height: 36px;
	text-transform: capitalize;
`
const TextOption = styled(Label)`
	font-size: 12px;
	color: #b2b2b2;
	text-transform: none;
`


const Option = styled.TouchableOpacity`
`

const Error = styled.Text`
  color: red;  
`