import React from 'react';
import TasksList from '../components/TaskList';
import Layout from '../components/Layout';

const HomeScreen = () => {  
    console.log("Rendering HomeScreen");
    return (
        <Layout>
            <TasksList />
        </Layout>
    );
};

export default HomeScreen;