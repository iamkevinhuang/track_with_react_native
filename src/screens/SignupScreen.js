import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import AuthForm from '../componentes/AuthForm';
import NavLink from '../componentes/NavLink';

const SignupScreen = () => {
    const {state, signup, clearErrorMessage} = useContext(AuthContext);
    
    return (
        <View style={styles.container}>
            <AuthForm 
                headerText = "Sign Up for Tracker"
                errorMessage = {state.errorMessage}
                submitButtonText = "Sign Up"
                onSubmit = {signup}
            />
            <NavLink routeName="Signin" text="Already have an account? Sign In Instead !" action={() => {clearErrorMessage()}} />
        </View>
    );
};

SignupScreen.navigationOptions = {
    headerShown: false
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        marginBottom: 100
    },
});

export default SignupScreen;