import React from "react";
import {Card, CardContent, Divider, Stack, Typography} from "@mui/material";


const Display = ({currentDisplay, nextDisplay}) => {

    return (
        <Card
            variant="elevation"
            elevation={1}
            sx={{
                borderBottomRightRadius: 0,
                borderTopRightRadius: 32,
                borderBottomLeftRadius: 32,
                borderTopLeftRadius: 0
            }}>
            <CardContent>
                {currentDisplay ? (
                    <React.Fragment>
                        <Stack direction="column" spacing={2} divider={<Divider variant="middle" light={true}/>}>
                            <Typography sx={{color: 'text.primary'}} variant="h6" align="center">
                                Container Number
                            </Typography>

                            <Typography sx={{color: 'text.primary'}} variant="h3" align="center">
                                {currentDisplay.container}
                            </Typography>

                            <Typography sx={{color: 'text.primary'}} variant="h6" align="center">
                                Booking Date
                            </Typography>

                            <Typography sx={{color: 'text.primary'}} variant="h6" align="center">
                                {new Date(currentDisplay.date).toDateString()}
                            </Typography>
                        </Stack>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{color: 'text.primary'}} variant="h6" align="center">
                            No Booking Available
                        </Typography>
                    </React.Fragment>
                )}

                <Stack direction="column" spacing={2} divider={<Divider light={true} variant="fullWidth"/>}>
                    <Typography sx={{color: 'text.primary'}} variant="h6" align="center">
                        Next
                    </Typography>

                    {nextDisplay ?
                        <Typography sx={{color: 'text.primary'}} variant="h3" align="center">
                            {nextDisplay.container}
                        </Typography> :
                        <Typography sx={{color: 'text.primary'}} variant="h6" align="center">
                            No Container Available Next
                        </Typography>
                    }
                </Stack>
            </CardContent>
        </Card>
    )
}

export default Display;
