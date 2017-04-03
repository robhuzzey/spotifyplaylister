import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
export default (props) => (
  <Grid>
    {React.Children.map(props.children, (child, i) => {
      return (
        <Row key={i}>
          <Col xs={12} md={12}>
            {child}
          </Col>
        </Row> 
      )
    })}
  </Grid>
)
