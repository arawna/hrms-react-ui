import React from 'react'
import Categories from './Categories'
import Navi from './Navi'
import { Container, Grid } from 'semantic-ui-react';
import './Dashboard.css';
import JobAds from '../pages/JobAds';
//import Candidates from '../pages/Candidates';
//import Cvs from '../pages/Cvs';
//import Employers from '../pages/Employers';

export default function Dashboard() {
    return (
        <div>
            <Navi />
            <Container className="main">                
                <Grid>
                    <Grid.Column width={4}>
                        <Categories />
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <JobAds/>
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    )
}
