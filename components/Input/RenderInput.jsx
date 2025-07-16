import React from 'react'
import { globalStyles } from '../../theme/globals'
import { Text, TextInput, View } from 'react-native'

export default function RenderInput({ label, value, placeholder, onSubmitEditing, onChangeText, ref }) {

    return <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.inputContainerLabel}>{label}</Text>
        <TextInput
            value={value}
            ref={ref}
            onSubmitEditing={onSubmitEditing}
            placeholder={placeholder}
            onChangeText={onChangeText}
            style={globalStyles.input} />
    </View>
}


