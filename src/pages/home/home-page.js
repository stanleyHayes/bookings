import React from "react";
import Layout from "../../components/layout";
import {Container, Divider, makeStyles, Typography} from "@material-ui/core";
import Carousel from "react-multi-carousel";
import {useSelector} from "react-redux";
import Display from "../../components/shared/display";


const HomePage = () => {

    const useStyles = makeStyles(theme => {
        return {
            container: {
                paddingTop: 84,
                paddingBottom: 84
            },
            divider: {
                marginTop: 32,
                marginBottom: 32
            }
        }
    });

    const classes = useStyles();

    const responsive = {
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 1
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 1
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 1
        }
    };

    const bookings = useSelector(state => state.bookings.bookings);

    return (
        <Layout>
            <Container className={classes.container}>
                <Typography color="textPrimary" variant="h3" align="center">Bookings</Typography>

                <Divider variant="fullWidth" className={classes.divider}/>

                <Carousel
                    arrows={true}
                    autoPlay={false}
                    swipeable={true}
                    responsive={responsive}>
                    {
                        bookings.map((booking, index) => {
                            return (
                                <Display key={index} booking={booking}/>
                            )
                        })
                    }
                </Carousel>

            </Container>
        </Layout>
    )
}

export default HomePage;