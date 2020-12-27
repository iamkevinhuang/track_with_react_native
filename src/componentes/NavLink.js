import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import Spacer from './Spacer';
import {withNavigation} from 'react-navigation';

const NavLink = ({navigation, routeName, text, action}) => {
    return (
    <TouchableOpacity onPress={() => {action(); navigation.navigate(routeName)}}>   
        <Spacer>
            <Text style={styles.link}>{text}</Text>
        </Spacer>
    </TouchableOpacity> 
    )
};

const styles = StyleSheet.create({
    link:{
        color: 'blue'
    }
});

export default withNavigation(NavLink);