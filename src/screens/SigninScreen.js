import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import AuthForm from '../componentes/AuthForm';
import NavLink from '../componentes/NavLink';



const SigninScreen = () => {
    const {state, signin, clearErrorMessage} = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <AuthForm 
                headerText = "Sign In to Your Acount"
                errorMessage = {state.errorMessage}
                submitButtonText = "Sign In"
                onSubmit = {signin}
            />
            <NavLink routeName="Signup" text="Don't have an account? Sign Up Instead !" action={() => {clearErrorMessage()}} />
        </View>
    )
};

SigninScreen.navigationOptions = {
    headerShown: false
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        marginBottom: 100
    },
});

export default SigninScreen;