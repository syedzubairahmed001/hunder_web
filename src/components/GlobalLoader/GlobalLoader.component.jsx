import React, { Component } from 'react';

import {LinearProgress} from '@mui/material';

import styles from './GlobalLoader.module.css';

const GlobalLoader = props => {
    return <div className={styles.container}>
        <LinearProgress />
    </div>
}

export default GlobalLoader;