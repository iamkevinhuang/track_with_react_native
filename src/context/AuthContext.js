import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import {navigate} from '../navigationRef';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'sign_out':
            return {token: null, errorMessage: ''}
        case 'clear_error_message':
            return {...state, errorMessage: ''};
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'sign_in':
            return {errorMessage: '', token: action.payload};
        default:
            return state;
    }
};

const signup = (dispatch) => async ({email, password}) => {
    try{
        const response = await trackerApi.post('/signup', {email, password});
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({type: 'sign_in', payload: response.data.token});

        navigate('TrackList');
    } catch (err){
        dispatch({type: 'add_error', payload: 'Something went wrong with sign up'})
    }
};


const signin = (dispatch) => {
    return async ({email, password}) => {
        try{
            const response = await trackerApi.post('/signin', {email, password});
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({type: 'sign_in', payload: response.data.token});
    
            navigate('TrackList');
        } catch (err){
            dispatch({type: 'add_error', payload: 'Something went wrong with sign in'})
        }
    };
};

const signout = (dispatch) => {
    return async () => {
        await AsyncStorage.removeItem('token');
        dispatch({type: 'sign_out'});
        navigate('Signin');
    };
};

const clearErrorMessage = (dispatch) => {
    return () => {
        dispatch({type: 'clear_error_message'});
    }
}

const tryLocalSignin = (dispatch) => {
    return async () => {
        const token = await AsyncStorage.getItem('token');

        if (token) {
            dispatch({type: 'signin', payload: token});
            navigate('TrackList');
        } else{
            navigate('Signup');
        }
    }
}

export const {Provider, Context} = createDataContext(authReducer, {signup, signin, signout, clearErrorMessage, tryLocalSignin}, {token: null, errorMessage: ''})